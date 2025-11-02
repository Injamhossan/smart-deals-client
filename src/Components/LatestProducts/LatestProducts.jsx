import React, { use } from 'react';

const LatestProducts = ({latestProductsPromise}) => {
    const products = use(latestProductsPromise);
    console.log(products)
    return(
        <div>
            
        </div>
    )
}



export default LatestProducts;