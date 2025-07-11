import React, { useEffect, useState } from 'react';
import { supabase } from '../Components/supabaseClient';

const ViewDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDoctors = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('Doctors')
            .select('*');

        if (error) {
            console.error('Error fetching doctors:', error.message);
        } else {
            setDoctors(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-600 text-lg">Loading doctors...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 text-center sm:text-left">
                Doctors List
            </h2>

            {doctors.length === 0 ? (
                <p className="text-gray-500 text-center">No doctors found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm text-sm sm:text-base">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="text-left px-4 py-2">First Name</th>
                                <th className="text-left px-4 py-2">Last Name</th>
                                <th className="text-left px-4 py-2">Specialization</th>
                                <th className="text-left px-4 py-2">Email</th>
                                <th className="text-left px-4 py-2">Phone</th>
                                <th className="text-left px-4 py-2">Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map((doc) => (
                                <tr key={doc.id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2">{doc.FirstName}</td>
                                    <td className="px-4 py-2">{doc.LastName}</td>
                                    <td className="px-4 py-2">{doc.Specialization}</td>
                                    <td className="px-4 py-2">{doc.Email}</td>
                                    <td className="px-4 py-2">{doc.PhoneNumber}</td>
                                    <td className="px-4 py-2">{doc.Address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ViewDoctors;
