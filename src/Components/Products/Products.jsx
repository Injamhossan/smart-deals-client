import React from 'react';
import { useLoaderData } from 'react-router';

const Products = () => {
const product = useLoaderData();
console.log(product);

    return (
        <div>
            
        </div>
    );
};

export default Products;