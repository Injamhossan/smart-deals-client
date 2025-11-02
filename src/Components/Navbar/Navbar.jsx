import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
    const links = <>
      <Link to="/">Home</Link>
      <Link to="/allproducts">All Products</Link>
      <Link to="/myproducts" >My Products</Link>
      <Link to="/mybids">My Bids</Link>
      <Link to="/createproducts">Create Products</Link>
    </>
  
  return (
        <div className='bg-white shadow-sm'>
            <div className="navbar  mx-auto max-w-[1700px]">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black gap-3">
        
        {links}
      </ul>
    </div>
    <a className="text-xl text-black font-bold text-[28px]">Smart <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#632EE3] to-[#9F62F2]'>Deals</span> </a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-black gap-6 font-semibold text-[15px]">
     {links}
    </ul>
  </div>
  <div className="navbar-end gap-3">
    <Link to= "login" className="btn font-semibold border border-[#9F62F2] text-transparent bg-clip-text bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:bg-[#9F62F2] hover:text-white hover:from-[#9F62F2] hover:to-[#632EE3] transition">Log in</Link>
    <Link to="register" className="btn font-semibold text-white bg-gradient-to-r from-[#632EE3] to-[#9F62F2] shadow-md hover:opacity-90 transition border-0">Register</Link>
  </div>
</div>
        </div>
    );
};

export default Navbar;