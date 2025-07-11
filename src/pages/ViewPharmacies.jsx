import React, { useEffect, useState } from 'react';
import { supabase } from '../Components/supabaseClient';

const ViewPharmacies = () => {
    const [pharmacies, setPharmacies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPharmacies = async () => {
            const { data, error } = await supabase
                .from('Pharmacies')
                .select('*')
                .order('Name', { ascending: true });

            if (error) {
                console.error('Error fetching pharmacies:', error.message);
                setPharmacies([]);
            } else {
                setPharmacies(data);
            }

            setLoading(false);
        };

        fetchPharmacies();
    }, []);

    return (
        <div className="bg-white px-4 py-6 sm:px-6 max-w-7xl mx-auto mt-4 sm:mt-6 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center sm:text-left">
                Registered Pharmacies
            </h2>

            {loading ? (
                <p className="text-gray-600 text-center">Loading pharmacies...</p>
            ) : pharmacies.length === 0 ? (
                <p className="text-gray-600 text-center">No pharmacies found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white divide-y divide-gray-200 text-sm sm:text-base">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-4 py-2 text-left font-medium">Name</th>
                                <th className="px-4 py-2 text-left font-medium">Address</th>
                                <th className="px-4 py-2 text-left font-medium">City</th>
                                <th className="px-4 py-2 text-left font-medium">State</th>
                                <th className="px-4 py-2 text-left font-medium">Phone</th>
                                <th className="px-4 py-2 text-left font-medium">Email</th>
                                <th className="px-4 py-2 text-left font-medium">License</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {pharmacies.map((pharmacy) => (
                                <tr key={pharmacy.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 text-gray-700">{pharmacy.Name}</td>
                                    <td className="px-4 py-2 text-gray-700">{pharmacy.Address}</td>
                                    <td className="px-4 py-2 text-gray-700">{pharmacy.City}</td>
                                    <td className="px-4 py-2 text-gray-700">{pharmacy.State}</td>
                                    <td className="px-4 py-2 text-gray-700">{pharmacy.PhoneNumber}</td>
                                    <td className="px-4 py-2 text-gray-700">{pharmacy.Email || '-'}</td>
                                    <td className="px-4 py-2 text-gray-700">{pharmacy.LicenseNumber || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ViewPharmacies;
