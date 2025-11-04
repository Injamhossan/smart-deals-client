import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AllProducts from './Pages/AllProducts';


function App() {
  return (
    <Routes>
      {/* Homepage-a shob product dekhabe */}
      <Route path="/" element={<AllProducts />} /> 
      
      {/* Product details page-ar jonno dynamic route */}
      <Route path="/product/:id" element={<ProductDetails />} /> 
    </Routes>
  );
}

export default App;