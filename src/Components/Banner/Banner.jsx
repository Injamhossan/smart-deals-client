import React from 'react';

const Banner = () => {
    return (
        <div>
                <div className="flex items-center justify-center bg-[linear-gradient(128.29deg,rgba(255,230,252,1),rgba(224,248,245,1)_100%)] px-4 py-[70px]">
      <div className="text-center max-w-3xl">
        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-bold text-[#001931] leading-tight mb-6">
          Deal Your{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#632EE3] to-[#9F62F2]">
            Products
          </span>{" "}
          <br />
          In A{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#632EE3] to-[#9F62F2]">
            Smart
          </span>{" "}
          Way !
        </h1>

        {/* Subtext */}
        <p className="text-[#627382] text-lg sm:text-xl mb-8">
          SmartDeals helps you sell, resell, and shop from trusted local sellers
          — all in one place!
        </p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <div className="relative w-full sm:w-[400px]">
            <input
              type="search"
              placeholder="Search for Products, Categories..."
              className="w-full py-3 px-5 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9F62F2] placeholder-gray-500"
            />

            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#632EE3] to-[#9F62F2] shadow-md hover:opacity-90 transition">
            Watch All Products
          </button>
          <button className="px-6 py-3 rounded-full font-semibold border border-[#9F62F2] text-transparent bg-clip-text bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:bg-[#9F62F2] hover:text-white hover:from-[#9F62F2] hover:to-[#632EE3] transition">
            Post a Product
          </button>
        </div>
      </div>
    </div>
        </div>
    );
};

export default Banner;
