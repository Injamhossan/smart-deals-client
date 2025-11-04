// src/components/Products.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // <-- Import korun

// 'onOpenModal' prop remove kora hoyeche
const Products = ({ product }) => {

    const {
        _id, // <-- ID ta dorkar hobe link-ar jonno
        title,
        price_min,
        price_max,
        image,
        condition,
        usage
    } = product;

    return (
        
        <div className="card w-full max-w-sm bg-white shadow-md rounded-lg">
            
            <figure className='px-6 pt-6'>
                <img 
                 src={image} 
                 alt={title} 
                 className="rounded-lg h-48 w-full object-cover" 
                 onError={(e) => e.target.src = 'https://via.placeholder.com/300x200'} 
                />
            </figure>

            <div className="card-body px-6 py-5">
                
                <h2 className="card-title text-lg font-semibold text-gray-800 truncate" title={`${title} [${condition} - ${usage}]`}>
                    {title} [{condition}]
                </h2>
                
            
                <p className='text-base font-bold text-purple-700'>
                    ${price_min} - ${price_max}
                </p>

                <div className="card-actions justify-center pt-2">
                    {/* Button-take <Link> diye wrap kora hoyeche */}
                    <Link 
                      to={`/product/${_id}`} // <-- Dynamic URL create hocche
                      className="btn btn-outline border-purple-400 text-purple-600 hover:bg-purple-600 hover:border-purple-600 hover:text-white w-full"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Products;