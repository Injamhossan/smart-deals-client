import React, { useState, useEffect } from 'react';

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ডেটা fetch করার জন্য Async function
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 
  const handleEdit = (id) => {
    console.log('Edit product:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete product:', id);
   
  };

  const handleMakeSold = (id) => {
    console.log('Mark as sold:', id);
  };


  if (loading) {
    return <div className="text-center p-10">Loading your products...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      
      {/* --- টাইটেল --- */}
      <h1 className="text-4xl font-bold text-center mb-8 text-black">
        My Products: <span className="text-purple-600">{products.length}</span>
      </h1>

      {/* --- টেবিল --- */}
      <div className="shadow-lg rounded-lg overflow-x-auto">
        <table className="min-w-full bg-white">
          {/* টেবিলের হেডার */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          
          {/* টেবিলের বডি */}
          <tbody className="divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={product._id} className="hover:bg-gray-50">
                
                {/* SL No */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                
                {/* Image */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-12 h-12 rounded object-cover bg-gray-200" // ছবি না থাকলে placeholder দেখাবে
                  />
                </td>
                
                {/* Product Name */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {product.title}
                </td>
                
                {/* Category */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {product.category}
                </td>
                
                {/* Price */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${product.price_min} {/* JSON অনুযায়ী price_min ব্যবহার করেছি */}
                </td>
                
                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span 
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                      product.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800' 
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                
                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEdit(product._id)}
                      className="px-3 py-1 text-xs rounded-md bg-purple-100 text-purple-700 hover:bg-purple-200"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(product._id)}
                      className="px-3 py-1 text-xs rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                    >
                      Delete
                    </button>
                    <button 
                      onClick={() => handleMakeSold(product._id)}
                      className="px-3 py-1 text-xs rounded-md bg-green-100 text-green-700 hover:bg-green-200"
                    >
                      Make Sold
                    </button>
                  </div>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* কোনো প্রোডাক্ট না থাকলে */}
      {products.length === 0 && !loading && (
        <div className="text-center p-10 text-gray-500">
          You have not added any products yet.
        </div>
      )}
    </div>
  );
}

export default MyProducts;