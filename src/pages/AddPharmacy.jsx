import React, { useState } from 'react';
import { supabase } from '../Components/supabaseClient';

const AddPharmacy = () => {
    const [formData, setFormData] = useState({
        pharmacy_name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        email: '',
        licenseNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('Pharmacies')
            .insert([{
                Pharmacy_name: formData.pharmacy_name,
                Address: formData.address,
                City: formData.city,
                State: formData.state,
                ZipCode: formData.zipCode || null,
                PhoneNumber: formData.phone,
                Email: formData.email || null,
                LicenseNumber: formData.licenseNumber || null,
            }]);

        if (error) {
            console.error('Supabase insert error:', error);
            alert('❌ Failed to add pharmacy:\n' + error.message);
        } else {
            alert('✅ Pharmacy added successfully!');
            setFormData({
                pharmacy_name: '',
                address: '',
                city: '',
                state: '',
                zipCode: '',
                phone: '',
                email: '',
                licenseNumber: '',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="bg-white w-full max-w-2xl p-6 sm:p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
                    Add New Pharmacy
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    {[
                        { label: "Pharmacy Name", id: "pharmacy_name", required: true, placeholder: "MediCare Pharmacy" },
                        { label: "Address", id: "address", required: true, placeholder: "123 Pharma Lane" },
                        { label: "Phone Number", id: "phone", required: true, placeholder: "+263 771 234 567" },
                        { label: "Email Address", id: "email", required: false, placeholder: "info@medicare.com", type: "email" },
                        { label: "License Number", id: "licenseNumber", required: false, placeholder: "PHARM-12345" },
                    ].map(({ label, id, required, placeholder, type = "text" }) => (
                        <div key={id}>
                            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                                {label}{!required && ' (Optional)'}
                            </label>
                            <input
                                type={type}
                                id={id}
                                name={id}
                                value={formData[id]}
                                onChange={handleChange}
                                required={required}
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                placeholder={placeholder}
                            />
                        </div>
                    ))}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            { id: "city", label: "City", required: true, placeholder: "Harare" },
                            { id: "state", label: "State/Province", required: true, placeholder: "Mashonaland West" },
                            { id: "zipCode", label: "Zip Code", required: false, placeholder: "12345" },
                        ].map(({ id, label, required, placeholder }) => (
                            <div key={id}>
                                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                                    {label}{!required && ' (Optional)'}
                                </label>
                                <input
                                    type="text"
                                    id={id}
                                    name={id}
                                    value={formData[id]}
                                    onChange={handleChange}
                                    required={required}
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    placeholder={placeholder}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="w-full sm:w-auto inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                            Add Pharmacy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPharmacy;
