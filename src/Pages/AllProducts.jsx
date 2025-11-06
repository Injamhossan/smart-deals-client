import React, { useState, useEffect } from 'react';
import Products from '../Components/Products/Products';


const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Shudhu ei section-ta change hobe
  // Shudhu ei section-ta change hobe
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => {
        // ✅ প্রথমে চেক করুন রেসপন্স ঠিক আছে কিনা
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        // ✅ সার্ভার থেকে যা এসেছে, সরাসরি সেট করে দিন
        setProducts(data); 
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);
  // --- Change ei porjonto ---
  // --- Change ei porjonto ---

  if (loading) {
    return <div className="text-center p-10">Loading products...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-600">All Products</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <Products
            key={product._id} 
            product={product} 
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;