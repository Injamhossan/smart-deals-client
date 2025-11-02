import React, { use } from 'react';
import Products from '../Products/Products';


const latestProductsPromise = fetch('http://localhost:5000/latest-products')
    .then(res => {
        if (!res.ok) {
         
            throw new Error(`Failed to fetch: ${res.statusText}`);
        }
        return res.json();
    })
    .catch(err => {
        console.error("API Fetch Error:", err);
        return []; 
    });



const LatestProducts = () => {
    
    const products = use(latestProductsPromise);

    return (
        <div className='py-12 px-4'> 
            
            <h1 className='text-black font-bold text-3xl text-center mb-10'> 
                Recent <span className='font-semibold border-[#9F62F2] text-transparent bg-clip-text bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:bg-[#9F62F2] hover:text-white hover:from-[#9F62F2] hover:to-[#632EE3] transition'>Products</span>
            </h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center'>
                {
                    (products && products.length > 0) ? (
                        products.map(product => <Products key={product._id}
                            product={product}>
                        </Products>)
                    ) : (
            
                        <p className='text-red-500'>Could not load products.</p>
                    )
                }
            </div>

            <div className='text-center mt-10'>
                <button className='btn border-0 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white px-8'>
                    Show All
                </button>
            </div>
        </div>
    )
}

export default LatestProducts;