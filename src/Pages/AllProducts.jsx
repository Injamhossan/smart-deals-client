import React, { useState, useEffect } from 'react';
import Products from '../Components/Products/Products';


const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Shudhu ei section-ta change hobe
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(rawData => {
        
        // Regex to extract the ID from "ObjectId('...')"
        const regex = /ObjectId\('([^']+)'\)/;

        // Data clean korar jonno map
        const cleanData = rawData.map(product => {
          const match = product._id.match(regex);
          // Jodi match pay, tahole clean ID (group 1) nibe
          // Noito, original _id (jodi already clean thake)
          const cleanId = match ? match[1] : product._id; 

          return {
            ...product, // product-ar baki shob data...
            _id: cleanId  // ...shudhu _id-take cleanId diye replace korbe
          };
        });

        setProducts(cleanData); // Clean data state-a set korun
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);
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