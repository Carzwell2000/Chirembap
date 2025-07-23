import React, { useState, useEffect } from 'react';
import { supabase } from '../Components/supabaseClient'; // Update path as needed

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        category: '',
        pharmacy_name: '', // This will hold the selected pharmacy's name
    });
    const [imageFile, setImageFile] = useState(null);
    const [pharmacies, setPharmacies] = useState([]); // Will store { Pharmacy_name: "..." } objects
    const [loading, setLoading] = useState(false);

    // Fetch pharmacies (now only fetching Pharmacy_name as there's no ID)
    useEffect(() => {
        const fetchPharmacies = async () => {
            // Select only the Pharmacy_name column
            const { data, error } = await supabase.from('Pharmacies').select('Pharmacy_name');
            if (error) {
                console.error("Error fetching pharmacies:", error.message);
                alert("Error loading pharmacies. Please check your network.");
            } else {
                setPharmacies(data);
            }
        };
        fetchPharmacies();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // If the changed input is the pharmacy selection dropdown
        if (name === 'pharmacy_name_select') { // Use a different name for the select element
            setFormData(prev => ({
                ...prev,
                pharmacy_name: value // Directly set the pharmacy_name in formData
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const trimmedProductName = formData.name.trim(); // Trim product name

        // Updated validation: now checking for formData.pharmacy_name
        if (!trimmedProductName || !formData.price || !formData.quantity || !formData.category || !formData.pharmacy_name) {
            alert("Please fill all required fields, including selecting a pharmacy.");
            setLoading(false);
            return;
        }

        let imageUrl = null;

        if (imageFile) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
            const filePath = `public/${fileName}`;

            const { error: uploadError } = await supabase
                .storage
                .from('product-images')
                .upload(filePath, imageFile);

            if (uploadError) {
                alert("Error uploading image: " + uploadError.message);
                console.error(uploadError);
                setLoading(false);
                return;
            }

            const { data: publicUrlData } = supabase.storage.from('product-images').getPublicUrl(filePath);
            imageUrl = publicUrlData?.publicUrl;

            if (!imageUrl) {
                alert("Error generating public URL for image.");
                setLoading(false);
                return;
            }
        }

        // Insert into Products table
        const { error: insertError } = await supabase
            .from('Products')
            .insert([{
                name: trimmedProductName, // Use the trimmed product name
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity),
                category: formData.category,
                image_url: imageUrl,
                Pharmacy_name: formData.pharmacy_name, // Send the selected pharmacy's name
            }]);

        if (insertError) {
            alert("Error adding product: " + insertError.message);
            console.error(insertError);
        } else {
            alert("Product added successfully!");
            // Reset form data
            setFormData({
                name: '',
                price: '',
                quantity: '',
                category: '',
                pharmacy_name: '', // Reset pharmacy name
            });
            setImageFile(null);
            // Clear the file input visually
            e.target.querySelector('input[type="file"]').value = '';
        }

        setLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Product Name"
                    className="w-full border p-2 rounded"
                />
                <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    className="w-full border p-2 rounded"
                />
                <input
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    type="number"
                    placeholder="Quantity"
                    className="w-full border p-2 rounded"
                />
                <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    placeholder="Category (e.g., Antibiotic)"
                    className="w-full border p-2 rounded"
                />

                {/* Pharmacy Dropdown - using name="pharmacy_name_select" to avoid conflict with formData.pharmacy_name */}
                <select
                    name="pharmacy_name_select" // Changed name to avoid direct conflict with formData.pharmacy_name
                    value={formData.pharmacy_name} // Value is the pharmacy name
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                >
                    <option value="">Select Pharmacy</option>
                    {pharmacies.map((pharm, index) => (
                        <option key={index} value={pharm.Pharmacy_name}>
                            {pharm.Pharmacy_name}
                        </option>
                    ))}
                </select>

                {/* Image Upload */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;