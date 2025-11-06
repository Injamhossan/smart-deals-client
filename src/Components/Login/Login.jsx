/* eslint-disable no-constant-condition */
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';



const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
    <path fill="#4CAF50" d="m24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.962l-6.63 5.143A20.007 20.007 0 0 0 24 44z"></path>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.082 5.571l6.19 5.238C41.049 34.61 44 29.57 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
  </svg>
);

// ✅ আপনার ব্যাকএন্ড সার্ভারের URL
const API_URL = 'http://localhost:5000';

// ❌ appId-এর আর দরকার নেই, কারণ Firestore ব্যবহার হচ্ছে না
// const appId = typeof "__app_id" !== 'undefined' ? "__app_id" : 'default-app-id';

const Login = () => {

  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // ✅ Firebase Auth স্টেট লিসেনার
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

 
  // ✅✅✅ পরিবর্তন এখানে ✅✅✅
  // এই ফাংশনটি Firebase ইউজারকে আপনার MongoDB-তে সিঙ্ক করবে
  const saveUserToMongoBackend = async (firebaseUser) => {
    
    // ইউজার অবজেক্ট থেকে প্রয়োজনীয় তথ্য নিন
    const userData = {
      uid: firebaseUser.uid,
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      photoURL: firebaseUser.photoURL,
    };

    try {
      // আপনার কাস্টম ব্যাকএন্ডের /sync-user এন্ডপয়েন্টে কল করুন
      const response = await fetch(`${API_URL}/sync-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to sync user to custom DB");
      }

      const data = await response.json();
      console.log("User synced to MongoDB:", data.message);

    } catch (syncError) {
      console.error("Error syncing user data to MongoDB:", syncError);
      // এখানে এরর দেখালেও ইউজারকে লগইন করতে বাধা দেবেন না,
      // কারণ Firebase লগইন সফল হয়েছে। শুধু কনসোলে এরর দেখান।
      setError("Login successful, but failed to sync profile.");
    }
  };

 
  // ✅ ইমেইল/পাসওয়ার্ড লগইন
  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // ১. Firebase-এ লগইন করুন
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Firebase email login successful.");

      // ২. ✅ লগইন সফল হলে, MongoDB-তে সিঙ্ক করুন
      await saveUserToMongoBackend(userCredential.user);

    } catch (authError) {
      console.error("Firebase email login error:", authError);
      setError("Failed to login. Check your email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ গুগল লগইন
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // ১. Firebase দিয়ে গুগল পপআপ দেখান
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      console.log("Firebase Google login successful.");
      
      // ২. ✅ লগইন সফল হলে, MongoDB-তে সিঙ্ক করুন
      await saveUserToMongoBackend(result.user);
    
    } catch (authError) {
      console.error("Google login error:", authError);
      setError("Failed to login with Google.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

 
  if (!authReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg font-medium text-gray-700">Loading...</div>
      </div>
    );
  }

  // লগড-ইন UI (Firebase user অবজেক্ট থেকে)
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
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
          )}
          <p className="text-lg text-gray-700">{user.displayName || user.email}</p>
          <p className="text-sm text-gray-500">UID: {user.uid}</p>
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


  // --- লগইন ফর্ম (UI অপরিবর্তিত) ---
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-200">
        
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Login
        </h2>
        
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
            Register Now
          </a>
        </p>
        
                {/* Error Display */}

        {error && (
          <p className="text-sm text-center text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </p>
        )}

        {/* ফর্মটি এখন handleEmailPasswordLogin-কে কল করবে */}
        <form className="space-y-6" onSubmit={handleEmailPasswordLogin}>
          
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
          
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="**************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="text-right">
            <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-500">
              Forgot password?
            </a>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
        
        <div className="flex items-center justify-center space-x-3">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="text-sm font-medium text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        
        <div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:opacity-50"
          >
            <GoogleIcon />
            <span className="ml-3">Sign In With Google</span>
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Login;