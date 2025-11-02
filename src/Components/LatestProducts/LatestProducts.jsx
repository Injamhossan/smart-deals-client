import React, { use } from 'react';
import Products from '../Products/Products';

const LatestProducts = ({latestProductsPromise}) => {
    const products = use(latestProductsPromise);
    console.log(products)
    return(
        <div>
            <h1 className='text-black font-bold text-[24px]'>Recent <span className='font-semibold border-[#9F62F2] text-transparent bg-clip-text bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:bg-[#9F62F2] hover:text-white hover:from-[#9F62F2] hover:to-[#632EE3] transition'>Products</span></h1>


        <div className='grid grid-cols-1 md: grid-cols-2 lg: grid-cols-3'>
            {
                products.map(product => <Products key={product._id}
                product={product}>
                </Products>)
            }
        </div>
            
        </div>
    )
}



export default LatestProducts;