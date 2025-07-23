// src/pages/ViewProducts.jsx

import React, { useEffect, useState } from 'react';
import { supabase } from '../Components/supabaseClient';

const ViewProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products and join with pharmacy
    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase
                .from('Products')
                .select(`*`); // Assuming 'Pharmacies' is the related table name

            if (error) {
                console.error('Error fetching products:', error.message);
            } else {
                setProducts(data);
            }
            setLoading(false);
        };

        fetchProducts();
    }, []);

    return (
        <div className="max-w-5xl mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center mb-6">Product List</h2>

            {loading ? (
                <p className="text-center">Loading products...</p>
            ) : products.length === 0 ? (
                <p className="text-center">No products found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white p-4 rounded shadow">
                            {product.image_url && (
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded mb-3"
                                />
                            )}
                            <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                            <p className="text-gray-600 mb-1">Category: {product.category}</p>
                            <p className="text-gray-600 mb-1">Price: ${product.price}</p>
                            <p className="text-gray-600 mb-1">Quantity: {product.quantity}</p>
                            <p className="text-gray-600 text-sm">
                                Pharmacy: {product.Pharmacies?.Name || 'Unknown'}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewProducts;
