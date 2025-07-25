import React, { useState } from 'react';
import { supabase } from '../Components/supabaseClient';

const AddDoctor = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        specialization: '',
        email: '',
        phone: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value || '',
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data, error } = await supabase
                .from('Doctors')
                .insert([{
                    FirstName: formData.firstName,
                    LastName: formData.lastName,
                    Specialization: formData.specialization,
                    Email: formData.email,
                    PhoneNumber: formData.phone,
                    Address: formData.address,
                }]);

            if (error) {
                console.error('Supabase insert error:', error);
                alert('Failed to add doctor: ' + error.message);
            } else {
                alert('Doctor added successfully!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    specialization: '',
                    email: '',
                    phone: '',
                    address: '',
                });
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            alert('An unexpected error occurred.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="bg-white w-full max-w-2xl p-6 sm:p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">Add New Doctor</h2>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            placeholder="John"
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            placeholder="Doe"
                        />
                    </div>

                    <div>
                        <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                        <input
                            type="text"
                            id="specialization"
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            required
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            placeholder="Cardiologist, Pediatrician, etc."
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            placeholder="john.doe@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            placeholder="+1234567890"
                        />
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address (Optional)</label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            placeholder="123 Main St, Anytown, USA"
                        ></textarea>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="w-full sm:w-auto inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                            Add Doctor
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDoctor;
