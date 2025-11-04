import React from 'react';

// Date format korar jonno ekta helper function
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return dateString; 
  }
};

const ProductModal = ({ product, onCloseModal }) => {
  return (

    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center p-4"
      onClick={onCloseModal} 
    >
      {/* Modal Content - screenshot onujayi width, padding, shadow adjust kora hoyeche */}
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] overflow-y-auto"
        onClick={e => e.stopPropagation()} 
      >
        <div className="p-8"> 
          
          {/* Back To Products button */}
          <button onClick={onCloseModal} className="flex items-center text-gray-600 hover:text-gray-900 mb-6 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back To Products
          </button>

          <div className="flex flex-col lg:flex-row gap-8"> {/* Flex container for left and right sections */}
            
            {/* Left Section: Image and Product Description */}
            <div className="lg:w-2/3"> {/* Approx 2/3 width for the left side */}
              {/* Product Image */}
              <div className="w-full h-96 bg-gray-200 rounded-lg mb-6 overflow-hidden">
                <img 
                  src={product.image || 'https://via.placeholder.com/600x400?text=No+Image'} 
                  alt={product.title} 
                  className="h-full w-full object-cover rounded-lg" 
                />
              </div>

              {/* Product Description */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6"> {/* Added background and border */}
                <h3 className="text-xl font-semibold mb-4 border-b pb-3">Product Description</h3>
                
                <div className="flex flex-wrap gap-x-6 gap-y-3 mb-4 text-sm"> {/* Flex for condition and usage */}
                  <span className="text-gray-700"><strong>Condition :</strong> <span className="font-medium text-gray-900">{product.condition}</span></span>
                  <span className="text-gray-700"><strong>Usage Time :</strong> <span className="font-medium text-gray-900">{product.usage}</span></span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>
              </div>
            </div>

            {/* Right Section: Details, Price, Seller Info */}
            <div className="lg:w-1/3"> {/* Approx 1/3 width for the right side */}
              <span className="bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full">{product.category || 'N/A'}</span>
              <h2 className="text-3xl font-bold my-3 leading-tight">{product.title}</h2>
              <p className="text-4xl font-normal text-green-700 mb-6">
                ${product.price_min} - ${product.price_max}
              </p>
              
              {/* Product Details Card */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
                <h4 className="text-lg font-semibold mb-3">Product Details</h4>
                <p className="text-sm text-gray-600 mb-1"><strong>Product ID:</strong> {product._id}</p>
                <p className="text-sm text-gray-600"><strong>Posted:</strong> {formatDate(product.created_at)}</p>
              </div>

              {/* Seller Information Card */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
                <h4 className="text-lg font-semibold mb-4">Seller Information</h4>
                <div className="flex items-center mb-3">
                  <img 
                    src={product.seller_image || 'https://via.placeholder.com/48x48?text=Seller'} 
                    alt={product.seller_name} 
                    className="w-12 h-12 rounded-full mr-3 object-cover" 
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{product.seller_name || 'N/A'}</p>
                    <p className="text-sm text-gray-500">{product.email || 'N/A'}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1"><strong>Location:</strong> {product.location || 'N/A'}</p>
                <p className="text-sm text-gray-600 mb-1"><strong>Contact:</strong> {product.seller_contact || 'N/A'}</p>
                <p className="text-sm text-gray-600 flex items-center mt-2">
                  <strong>Status:</strong> 
                  <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
                    product.status && product.status.toLowerCase() === 'on sale' 
                    ? 'bg-yellow-200 text-yellow-800' 
                    : 'bg-gray-200 text-gray-800'
                  }`}>
                    {product.status || 'N/A'}
                  </span>
                </p>
              </div>
              
              {/* Buy Button */}
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                I Want This Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;