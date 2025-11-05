/* eslint-disable no-constant-condition */
import React, { useState, useEffect } from "react";
// Firebase SDKs থেকে প্রয়োজনীয় ফাংশন import করুন
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// --- আপনার firebase.js থেকে auth এবং db import করুন ---
// (পাথটি আপনার প্রজেক্ট অনুযায়ী ঠিক করুন)
import { auth, db } from "../../firebase/firebase"; // <-- সবচেয়ে গুরুত্বপূর্ণ পরিবর্তন

// --- Google Icon Component (আগের মতোই) ---
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    ></path>
    <path
      fill="#FF3D00"
      d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
    ></path>
    <path
      fill="#4CAF50"
      d="m24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.962l-6.63 5.143A20.007 20.007 0 0 0 24 44z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.082 5.571l6.19 5.238C41.049 34.61 44 29.57 44 24c0-1.341-.138-2.65-.389-3.917z"
    ></path>
  </svg>
);

// এই ভেরিয়েবলটি আপনার কোডে ছিল, তাই রাখছি।
// এটি সম্ভবত একটি গ্লোবাল ভেরিয়েবল যা আপনার বিল্ড প্রসেস থেকে আসছে।
const appId = typeof "__app_id" !== "undefined" ? "__app_id" : "default-app-id";

const Registration = () => {
  // --- State ---
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ফর্মের state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // --- Effects ---
  useEffect(() => {
    // onAuthStateChanged এখন সরাসরি ইম্পোর্ট করা 'auth' ব্যবহার করছে
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true); // auth state এখন প্রস্তুত
    });

    // Cleanup function
    return () => unsubscribe();
  }, []); // [] মানে এই effect শুধু একবার চলবে

  // --- Firestore Function ---
  const saveUserDataToFirestore = async (firebaseUser) => {
    // db এখন সরাসরি ইম্পোর্ট করা
    if (!db) return;

    // আপনার আগের পাথটিই ব্যবহার করছি
    const userDocRef = doc(
      db,
      "artifacts",
      appId,
      "public/data",
      "users",
      firebaseUser.uid
    );

    const userData = {
      uid: firebaseUser.uid,
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      photoURL: firebaseUser.photoURL,
      createdAt: new Date().toISOString(),
    };

    try {
      await setDoc(userDocRef, userData, { merge: true });
      console.log("User data saved to Firestore.");
    } catch (firestoreError) {
      console.error("Error saving user data:", firestoreError);
      setError("Failed to save user profile.");
    }
  };

  // --- Handlers ---
  const handleEmailPasswordRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Name, Email, and Password are required.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // auth এখন সরাসরি ইম্পোর্ট করা
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // প্রোফাইল আপডেট
      await updateProfile(firebaseUser, {
        displayName: name,
        photoURL: imageUrl,
      });

      // Firestore-এ সেভ
      await saveUserDataToFirestore({
        ...firebaseUser,
        displayName: name, // আপডেট করা নাম পাস করা হচ্ছে
        photoURL: imageUrl, // আপডেট করা ছবি পাস করা হচ্ছে
      });

      console.log("Email/Password registration successful.");

      // ফর্ম রিসেট করতে পারেন
      setName("");
      setEmail("");
      setPassword("");
      setImageUrl("");
    } catch (authError) {
      console.error("Email/Password registration error:", authError);
      setError(authError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      // auth এখন সরাসরি ইম্পোর্ট করা
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // Firestore-এ সেভ
      await saveUserDataToFirestore(firebaseUser);
      console.log("Google sign-up successful.");
    } catch (authError) {
      console.error("Google sign-up error:", authError);
      setError(authError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    // auth এখন সরাসরি ইম্পোর্ট করা
    await signOut(auth);
  };

  // --- Renders ---

  if (!authReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg font-medium text-gray-700">
          Loading Authentication...
        </div>
      </div>
    );
  }

  // ইউজার লগড ইন থাকলে দেখাবে
  if (user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-200 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}
          <p className="text-lg text-gray-700">
            {user.displayName || user.email}
          </p>
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

  // ইউজার লগড ইন না থাকলে রেজিস্টার ফর্ম দেখাবে
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Register Now!
        </h2>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="#"
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Login Now
          </a>
        </p>

        {error && (
          <p className="text-sm text-center text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </p>
        )}

        <form className="space-y-6" onSubmit={handleEmailPasswordRegister}>
          {/* নাম ইনপুট */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700"
            >
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
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
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
            <label
              htmlFor="imageUrl"
              className="block text-sm font-semibold text-gray-700"
            >
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

          {/* পাসওয়ার্ড ইনপুট */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
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
              minLength={6}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        {/* 'OR' সেপারেটর */}
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

export default Registration;
