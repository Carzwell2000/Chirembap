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
        <div className="bg-white p-6 max-w-5xl mx-auto rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Registered Pharmacies</h2>

            {loading ? (
                <p className="text-gray-600">Loading pharmacies...</p>
            ) : pharmacies.length === 0 ? (
                <p className="text-gray-600">No pharmacies found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Address</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">City</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">State</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Phone</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">License</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {pharmacies.map((pharmacy) => (
                                <tr key={pharmacy.id}>
                                    <td className="px-4 py-2 text-sm text-gray-700">{pharmacy.Name}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{pharmacy.Address}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{pharmacy.City}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{pharmacy.State}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{pharmacy.PhoneNumber}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{pharmacy.Email || '-'}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{pharmacy.LicenseNumber || '-'}</td>
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
