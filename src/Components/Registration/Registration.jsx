import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signInWithCustomToken,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, setLogLevel } from 'firebase/firestore';

// --- Firebase Configuration ---
// These global variables are provided by the environment.
const firebaseConfig = JSON.parse(
  typeof __firebase_config !== 'undefined'
    ? __firebase_config
    : '{}'
);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// --- Google Icon Component ---
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
    <path fill="#4CAF50" d="m24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.962l-6.63 5.143A20.007 20.007 0 0 0 24 44z"></path>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.082 5.571l6.19 5.238C41.049 34.61 44 29.57 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
  </svg>
);

// --- Main App Component (Replaces Registration) ---
const App = () => {
  // Firebase service state
  const [auth, setAuth] = useState(null);
  const [db, setDb] = useState(null);
  
  // User and Auth State
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form input state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Initialize Firebase and set up auth listener on mount
  useEffect(() => {
    // Check if Firebase config is available
    if (firebaseConfig && Object.keys(firebaseConfig).length > 0) {
      try {
        const app = initializeApp(firebaseConfig);
        const authInstance = getAuth(app);
        const dbInstance = getFirestore(app);
        
        // Enable Firestore logging for debugging
        setLogLevel('Debug');

        setAuth(authInstance);
        setDb(dbInstance);

        // Auth state listener
        const unsubscribe = onAuthStateChanged(authInstance, async (currentUser) => {
          if (currentUser) {
            setUser(currentUser);
          } else {
            setUser(null);
            // If not logged in, try to sign in with token or anonymously
            try {
              if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                await signInWithCustomToken(authInstance, __initial_auth_token);
              } else {
                await signInAnonymously(authInstance);
              }
            } catch (authError) {
              console.error("Auth sign-in error:", authError);
              setError("Failed to authenticate. Please refresh.");
            }
          }
          setAuthReady(true);
        });

        return () => unsubscribe();
      } catch (e) {
        console.error("Firebase initialization error:", e);
        setError("Could not connect to services.");
        setAuthReady(true);
      }
    } else {
      setError("Firebase configuration is missing.");
      setAuthReady(true);
    }
  }, []);

  // --- User Data Handling ---
  /**
   * Saves user data to a public 'users' collection in Firestore.
   * This creates or updates the user's profile document.
   */
  const saveUserDataToFirestore = async (firebaseUser) => {
    if (!db) return;
    
    // Use the public data path for user profiles
    const userDocRef = doc(db, 'artifacts', appId, 'public/data', 'users', firebaseUser.uid);
    
    const userData = {
      uid: firebaseUser.uid,
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      photoURL: firebaseUser.photoURL,
      createdAt: new Date().toISOString(), // Add a timestamp
    };

    try {
      // setDoc with merge: true will create or update the document
      await setDoc(userDocRef, userData, { merge: true });
      console.log("User data saved to Firestore.");
    } catch (firestoreError) {
      console.error("Error saving user data:", firestoreError);
      setError("Failed to save user profile.");
      // Don't throw, as auth might have succeeded
    }
  };

  // --- Event Handlers ---

  /**
   * Handles registration using Email and Password.
   */
  const handleEmailPasswordRegister = async (e) => {
    e.preventDefault();
    if (!auth) return;

    if (!name || !email || !password) {
      setError("Name, Email, and Password are required.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // 2. Update the new user's profile (displayName, photoURL)
      await updateProfile(firebaseUser, {
        displayName: name,
        photoURL: imageUrl,
      });

      // 3. Save user data to Firestore
      // We need to pass the updated user object (or at least the data)
      // updateProfile doesn't update the local user object automatically,
      // so we use the data from state + the user object.
      await saveUserDataToFirestore({
        ...firebaseUser,
        displayName: name,
        photoURL: imageUrl, 
      });

      // setUser will be called by onAuthStateChanged listener
      console.log("Email/Password registration successful.");

    } catch (authError)
 {
      console.error("Email/Password registration error:", authError);
      setError(authError.message);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles registration/login using Google.
   */
  const handleGoogleSignUp = async () => {
    if (!auth) return;

    setIsLoading(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      // 1. Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // 2. Save user data to Firestore
      await saveUserDataToFirestore(firebaseUser);
      
      // setUser will be called by onAuthStateChanged listener
      console.log("Google sign-up successful.");

    } catch (authError) {
      console.error("Google sign-up error:", authError);
      setError(authError.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Handles user sign-out.
   */
  const handleSignOut = async () => {
    if (!auth) return;
    await signOut(auth);
  };

  // --- Render Logic ---

  if (!authReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg font-medium text-gray-700">Loading Authentication...</div>
      </div>
    );
  }

  // If user is logged in, show a welcome message
  if (user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-200 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back!
          </h2>
          {user.photoURL && (
            <img 
              src={user.photoURL} 
              alt="Profile" 
              className="w-24 h-24 rounded-full mx-auto"
              onError={(e) => { e.target.style.display = 'none'; }} // Hide if image fails
            />
          )}
          <p className="text-lg text-gray-700">{user.displayName || user.email}</p>
          <p className="text-sm text-gray-500">User ID: {user.uid}</p>
          <button
            onClick={handleSignOut}
            className="w-full py-3 font-semibold text-white bg-gradient-to-r from-red-600 to-pink-600 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  // If no user, show the registration form
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      
      {/* রেজিস্টার বক্স */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-200">
        
        {/* হেডিং */}
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Register Now!
        </h2>
        
        {/* লগইন লিঙ্ক */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
            Login Now
          </a>
        </p>

        {/* Error Display */}
        {error && (
          <p className="text-sm text-center text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </p>
        )}
        
        {/* ফর্ম */}
        <form className="space-y-6" onSubmit={handleEmailPasswordRegister}>
          
          {/* নাম ইনপুট */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Mariam Swarna"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          
          {/* ইমেইল ইনপুট */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="your-email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {/* Image-URL ইনপুট */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700">
              Image-URL (Optional)
            </label>
            <input
              type="url"
              id="imageUrl"
              placeholder="https://example.com/your-image.png"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-3 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          {/* পাসওয়ার্ড ইনপুট */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="**************"
              value={password}
              onChange={(e) => setPassword(e.targe.value)}
              className="w-full px-4 py-3 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
              minLength={6}
            />
          </div>
          
          {/* রেজিস্টার বাটন */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
        
        {/* "OR" সেপারেটর */}
        <div className="flex items-center justify-center space-x-3">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="text-sm font-medium text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        
        {/* গুগল সাইন আপ বাটন */}
        <div>
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="w-full flex items-center justify-center py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:opacity-50"
          >
            <GoogleIcon />
            <span className="ml-3">Sign Up With Google</span>
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default App;
