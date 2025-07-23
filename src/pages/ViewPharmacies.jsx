import React, { useEffect, useState } from 'react';
import { supabase } from '../Components/supabaseClient'; // Update path as needed

const ViewPharmacies = () => {
    const [pharmacies, setPharmacies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedPharmacyId, setExpandedPharmacyId] = useState(null); // To manage collapsing/expanding

    useEffect(() => {
        const fetchPharmaciesWithProducts = async () => {
            setLoading(true);
            // Fetch pharmacies and implicitly join products where Pharmacy_name matches.
            // This works if 'Pharmacy_name' in 'Products' correctly links to 'Pharmacy_name' in 'Pharmacies'.
            // Note: Supabase's * syntax usually relies on a formal foreign key.
            // If it doesn't work, we'll need a manual join.
            const { data, error } = await supabase
                .from('Pharmacies')
                // Select all columns from Pharmacies, and all columns from related Products
                // The relationship is inferred by Supabase if a foreign key exists OR
                // if the column name matches in both tables (e.g., 'Pharmacy_name').
                // If your 'Products' table column is also called 'Pharmacy_name', this should work.
                .select('*, Products(name, price, quantity, category, image_url)') // Specify product fields you need
                .order('Pharmacy_name', { ascending: true });

            if (error) {
                console.error('Error fetching pharmacies and products:', error.message);
                setPharmacies([]);
                alert("Error fetching pharmacies and their products.");
            } else {
                setPharmacies(data);
                console.log("Fetched data:", data); // Log to see the structure
            }

            setLoading(false);
        };

        fetchPharmaciesWithProducts();
    }, []);

    const toggleProducts = (pharmacyId) => {
        setExpandedPharmacyId(expandedPharmacyId === pharmacyId ? null : pharmacyId);
    };

    return (
        <div className="bg-white px-4 py-6 sm:px-6 max-w-7xl mx-auto mt-4 sm:mt-6 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center sm:text-left">
                Registered Pharmacies
            </h2>

            {loading ? (
                <p className="text-gray-600 text-center">Loading pharmacies and products...</p>
            ) : pharmacies.length === 0 ? (
                <p className="text-gray-600 text-center">No pharmacies found.</p>
            ) : (
                <div className="space-y-6"> {/* Added space between pharmacy cards */}
                    {pharmacies.map((pharmacy) => (
                        <div key={pharmacy.Pharmacy_name} className="border border-gray-200 rounded-lg p-4 shadow-sm">
                            <div className="flex justify-between items-center cursor-pointer"
                                onClick={() => toggleProducts(pharmacy.Pharmacy_name)}>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {pharmacy.Pharmacy_name}
                                </h3>
                                <button className="text-teal-600 hover:text-teal-800 font-medium">
                                    {expandedPharmacyId === pharmacy.Pharmacy_name ? 'Hide Products' : 'View Products'}
                                </button>
                            </div>

                            <div className="mt-2 text-gray-700 text-sm">
                                <p><strong>Address:</strong> {pharmacy.Address}</p>
                                <p><strong>City:</strong> {pharmacy.City}</p>
                                <p><strong>State:</strong> {pharmacy.State}</p>
                                <p><strong>Phone:</strong> {pharmacy.PhoneNumber}</p>
                                <p><strong>Email:</strong> {pharmacy.Email || '-'}</p>
                                <p><strong>License:</strong> {pharmacy.LicenseNumber || '-'}</p>
                            </div>

                            {/* Products Section */}
                            {expandedPharmacyId === pharmacy.Pharmacy_name && (
                                <div className="mt-4 border-t border-gray-200 pt-4">
                                    <h4 className="text-md font-semibold mb-3">Products:</h4>
                                    {pharmacy.Products && pharmacy.Products.length > 0 ? (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full bg-white divide-y divide-gray-200 text-sm">
                                                <thead className="bg-gray-50 text-gray-600">
                                                    <tr>
                                                        <th className="px-3 py-2 text-left font-medium">Name</th>
                                                        <th className="px-3 py-2 text-left font-medium">Price</th>
                                                        <th className="px-3 py-2 text-left font-medium">Quantity</th>
                                                        <th className="px-3 py-2 text-left font-medium">Category</th>
                                                        <th className="px-3 py-2 text-left font-medium">Image</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {pharmacy.Products.map((product, pIndex) => (
                                                        <tr key={pIndex} className="hover:bg-gray-50">
                                                            <td className="px-3 py-2">{product.name}</td>
                                                            <td className="px-3 py-2">${product.price}</td>
                                                            <td className="px-3 py-2">{product.quantity}</td>
                                                            <td className="px-3 py-2">{product.category}</td>
                                                            <td className="px-3 py-2">
                                                                {product.image_url ? (
                                                                    <img src={product.image_url} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                                                ) : (
                                                                    <span className="text-gray-500">No Image</span>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 italic">No products registered for this pharmacy.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewPharmacies;