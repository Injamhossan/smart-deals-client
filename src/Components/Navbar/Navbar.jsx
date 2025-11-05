import React, { useState, useEffect } from 'react';
// 'react-router' নয়, আধুনিক React প্রজেক্টে 'react-router-dom' ব্যবহৃত হয়
import { Link } from 'react-router-dom'; 

// --- Firebase ---
// আপনার firebase.js ফাইল থেকে auth import করুন
import { auth } from '../../firebase/firebase'; // পাথটি ঠিক করে নিন
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
    // ইউজার এবং লোডিং স্টেট
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Auth state listener সেটআপ
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // ইউজার থাকলে currentUser অবজেক্ট, না থাকলে null
            setLoading(false); // লোডিং শেষ
        });

        // কম্পোনেন্ট unmount হলে listener টি ক্লিন-আপ করি
        return () => unsubscribe();
    }, []); // [] মানে এই effect শুধু একবার চলবে

    // লগআউট হ্যান্ডলার
    const handleLogout = async () => {
        try {
            await signOut(auth);
            // লগআউট সফল হলে onAuthStateChanged নিজে থেকেই user কে null করে দেবে
            console.log("User logged out");
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    // Navbar-এর লিঙ্কগুলো
    const links = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/allproducts">All Products</Link></li>
            {/* ইউজার লগইন করা থাকলেই এই লিঙ্কগুলো দেখাবে */}
            {user && (
                <>
                    <li><Link to="/myproducts">My Products</Link></li>
                    <li><Link to="/mybids">My Bids</Link></li>
                    <li><Link to="/createproducts">Create Products</Link></li>
                </>
            )}
        </>
    );

    // ইউজার লগইন/লগআউট বাটন সেকশন
    const authSection = (
        <>
            {user ? (
                // ইউজার লগড ইন থাকলে...
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {/* ইউজারের ছবি থাকলে দেখাবে, না থাকলে একটা placeholder আইকন */}
                            {user.photoURL ? (
                                <img alt="Profile" src={user.photoURL} />
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 p-2 text-gray-500 bg-gray-200 rounded-full">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A1.875 1.875 0 0 1 18 22.5h-12a1.875 1.875 0 0 1-1.499-2.382Z" />
                                </svg>
                            )}
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {/* ইউজারের নাম দেখাবে (যদি থাকে) */}
                        <li className="p-2 text-sm font-bold text-gray-600 truncate">
                            {user.displayName || user.email}
                        </li>
                        <li>
                            <Link to="/profile">View Profile</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            ) : (
                // ইউজার লগড আউট থাকলে...
                <div className="flex gap-3">
                    <Link to="/login" className="btn font-semibold border border-[#9F62F2] text-transparent bg-clip-text bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:bg-[#9F62F2] hover:text-white hover:from-[#9F62F2] hover:to-[#632EE3] transition">
                        Log in
                    </Link>
                    <Link to="/register" className="btn font-semibold text-white bg-gradient-to-r from-[#632EE3] to-[#9F62F2] shadow-md hover:opacity-90 transition border-0">
                        Register
                    </Link>
                </div>
            )}
        </>
    );

    return (
        <div className='bg-white shadow-sm'>
            <div className="navbar mx-auto max-w-[1700px]">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0} // `tabIndex` 0 হওয়া উচিত, -1 নয়
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black gap-3"
                        >
                            {/* `li` ট্যাগ ছাড়া লিঙ্কগুলো ঠিকমতো কাজ করবে না DaisyUI-তে */}
                            {links}
                        </ul>
                    </div>
                    <a className="text-xl text-black font-bold text-[28px]">
                        Smart <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#632EE3] to-[#9F62F2]'>Deals</span>
                    </a>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-black gap-6 font-semibold text-[15px]">
                        {/* `li` ট্যাগ যোগ করা হয়েছে */}
                        {links}
                    </ul>
                </div>

                <div className="navbar-end gap-3">
                    {/* লোডিং শেষ হলেই শুধু Auth সেকশন দেখাবে */}
                    {!loading && authSection}
                </div>
            </div>
        </div>
    );
};

export default Navbar;