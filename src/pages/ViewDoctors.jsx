// src/pages/ViewDoctors.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../Components/supabaseClient';

const ViewDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDoctors = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('Doctors')
            .select('*'); // Or select only needed columns

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

    if (loading) return <p className="text-center text-gray-600">Loading doctors...</p>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Doctors List</h2>
            {doctors.length === 0 ? (
                <p className="text-gray-500">No doctors found.</p>
            ) : (
                <table className="w-full border border-gray-300 rounded">
                    <thead className="bg-gray-100">
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
                            <tr key={doc.id} className="border-t">
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
            )}
        </div>
    );
};

export default ViewDoctors;
