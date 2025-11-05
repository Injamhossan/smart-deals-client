import React, { useState } from 'react';

function CreateProject() {
  // একটি state-এ সব ফর্ম ডেটা রাখা ভালো
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    condition: 'new', // 'Brand New' ডিফল্ট হিসেবে সিলেক্টেড
    usageTime: '',
    productImage: '',
    sellerName: '',
    sellerEmail: '',
    sellerContact: '',
    sellerImage: '',
    location: '',
    description: '',
  });

  // সব ইনপুটের জন্য একটি মাত্র হ্যান্ডলার
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // এখানে আপনি আপনার API তে ডেটা পাঠাতে পারেন
  };

  return (
    <div className="p-8 md:p-16" style={{ backgroundColor: '#f7f5ff' }}>
      <div className="max-w-4xl mx-auto">
        {/* Back to Products Link */}
        <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2} // 'stroke-width' -> 'strokeWidth'
          >
            <path
              strokeLinecap="round" // 'stroke-linecap' -> 'strokeLinecap'
              strokeLinejoin="round" // 'stroke-linejoin' -> 'strokeLinejoin'
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back To Products
        </a>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-8 text-black">
          Create <span className="text-purple-600">A Product</span>
        </h1>

        {/* Form Container */}
        <div className="bg-white p-8 md:p-12 rounded-lg border-2 border-purple-300 border-dashed shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Title */}
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="e.g. Yamaha Fz Guitar for Sale"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                >
                  <option value="">Select a Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="music">Musical Instruments</option>
                  <option value="furniture">Furniture</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Min Price */}
              <div>
                <label htmlFor="minPrice" className="block mb-2 text-sm font-medium text-gray-700">Min Price You want to Sale ($)</label>
                <input
                  type="text"
                  id="minPrice"
                  name="minPrice"
                  value={formData.minPrice}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="e.g. 18.5"
                  required
                />
              </div>

              {/* Max Price */}
              <div>
                <label htmlFor="maxPrice" className="block mb-2 text-sm font-medium text-gray-700">Max Price You want to Sale ($)</label>
                <input
                  type="text"
                  id="maxPrice"
                  name="maxPrice"
                  value={formData.maxPrice}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="Optional (default = Min Price)"
                />
              </div>

              {/* Product Condition */}
              <div>
                <label className="block mb-3 text-sm font-medium text-gray-700">Product Condition</label>
                <div className="flex items-center gap-6">
                  <div className="flex items-center">
                    <input
                      id="brand-new"
                      type="radio"
                      name="condition"
                      value="new"
                      checked={formData.condition === 'new'}
                      onChange={handleChange}
                      className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"
                    />
                    <label htmlFor="brand-new" className="ml-2 text-sm font-medium text-gray-900">Brand New</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="used"
                      type="radio"
                      name="condition"
                      value="used"
                      checked={formData.condition === 'used'}
                      onChange={handleChange}
                      className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"
                    />
                    <label htmlFor="used" className="ml-2 text-sm font-medium text-gray-900">Used</label>
                  </div>
                </div>
              </div>

              {/* Product Usage time */}
              <div>
                <label htmlFor="usageTime" className="block mb-2 text-sm font-medium text-gray-700">Product Usage time</label>
                <input
                  type="text"
                  id="usageTime"
                  name="usageTime"
                  value={formData.usageTime}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="e.g. 1 year 3 month"
                />
              </div>

              {/* Product Image URL */}
              <div className="md:col-span-2">
                <label htmlFor="productImage" className="block mb-2 text-sm font-medium text-gray-700">Your Product Image URL</label>
                <input
                  type="text"
                  id="productImage"
                  name="productImage"
                  value={formData.productImage}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="https://..."
                />
              </div>
              
              {/* Seller Name */}
              <div>
                <label htmlFor="sellerName" className="block mb-2 text-sm font-medium text-gray-700">Seller Name</label>
                <input
                  type="text"
                  id="sellerName"
                  name="sellerName"
                  value={formData.sellerName}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="e.g. Artisan Roasters"
                />
              </div>

              {/* Seller Email */}
              <div>
                <label htmlFor="sellerEmail" className="block mb-2 text-sm font-medium text-gray-700">Seller Email</label>
                <input
                  type="email"
                  id="sellerEmail"
                  name="sellerEmail"
                  value={formData.sellerEmail}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="e.g. email@example.com"
                />
              </div>

              {/* Seller Contact */}
              <div>
                <label htmlFor="sellerContact" className="block mb-2 text-sm font-medium text-gray-700">Seller Contact</label>
                <input
                  type="text"
                  id="sellerContact"
                  name="sellerContact"
                  value={formData.sellerContact}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="e.g. +1-555-1234"
                />
              </div>

              {/* Seller Image URL */}
              <div>
                <label htmlFor="sellerImage" className="block mb-2 text-sm font-medium text-gray-700">Seller Image URL</label>
                <input
                  type="text"
                  id="sellerImage"
                  name="sellerImage"
                  value={formData.sellerImage}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="https://..."
                />
              </div>
              
              {/* Location */}
              <div className="md:col-span-2">
                <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="City, Country"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">Simple Description about your Product</label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="e.g. I bought this product 3 month ago, did not used more than 1/2 time..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full px-5 py-3 text-center"
                >
                  Create A Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;