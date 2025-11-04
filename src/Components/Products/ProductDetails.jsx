import React from "react";
// useParams baad din, useLoaderData import korun
import { Link, useLoaderData } from "react-router-dom";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return dateString;
  }
};

const ProductDetails = () => {

  const product = useLoaderData();


  if (!product) {

    return (
      <div className="text-center p-20 text-lg font-medium">
        Product not found.
      </div>
    );
  }
 
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
      <Link
        to="/"
        className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-4"
      >
        {/* Apnar original SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back To Products
      </Link>
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column (Image & Description) */}
        <div className="md:col-span-2 space-y-8">
          {/* Product Image */}
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center overflow-hidden">
            <img
              src={
                product.image ||
                "https://via.placeholder.com/600x400?text=No+Image"
              }
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Product Description */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Product Description
            </h2>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-700">
                <strong>Condition :</strong> {product.condition || "N/A"}
              </span>
              <span className="text-gray-700">
                <strong>Usage Time :</strong> {product.usage || "N/A"}
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {product.description || "No description available."}
            </p>
          </div>
        </div>
        {/* Right Column (Details, Seller, Buy Button) */}
        <div className="md:col-span-1 space-y-6">
          {/* ... baki shob JSX code oporibortito thakbe ... */}
          {/* Product Title & Category */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>
            <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-medium px-2.5 py-0.5 rounded-full mt-2">
              {product.category || "Uncategorized"}
            </span>
          </div>
          {/* Price */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-4xl font-bold text-gray-900">
              ${product.price_min} - ${product.price_max}
            </h2>
            <p className="text-gray-500 text-sm mt-1">Price starts from</p>
          </div>
          {/* Product Details */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Product Details
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                <strong>Product ID:</strong> {product._id}
              </p>
              <p className="text-gray-600">
                <strong>Posted:</strong> {formatDate(product.created_at)}
              </p>
            </div>
          </div>
          {/* Seller Information */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Seller Information
            </h3>
            <div className="flex items-center space-x-3 mb-4">
              <img
                className="h-12 w-12 rounded-full bg-gray-200 object-cover"
                src={
                  product.seller_image ||
                  "https://via.placeholder.com/48x48?text=Seller"
                }
                alt={product.seller_name || "Seller"}
              />
              <div>
                <p className="text-md font-medium text-gray-900">
                  {product.seller_name || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  {product.email || "N/A"}
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                <strong>Location:</strong> {product.location || "N/A"}
              </p>
              <p className="text-gray-600">
                <strong>Contact:</strong> {product.seller_contact || "N/A"}
              </p>
              <p className="flex items-center text-gray-600">
                <strong>Status:</strong>
                <span
                  className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
                    product.status && product.status.toLowerCase() === "on sale"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {product.status || "N/A"}
                </span>
              </p>
            </div>
          </div>
          {/* Buy Button */}
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300">
            I Want To Buy This Product
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
