import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../Components/firebaseConfig'; // Ensure this path is correct for your project

const Logout = () => {
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(true);

    const handleYes = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('accessToken'); // Clear access token from local storage
            navigate('/login', { replace: true }); // Redirect to login page
        } catch (error) {
            console.error('Logout error:', error);

        }
    };

    const handleNo = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
            {showConfirm && (
                <div className="bg-teal-600 rounded-xl shadow-2xl p-8 sm:p-10 text-center max-w-md w-full border border-red-400 transform hover:scale-105 transition-transform duration-300 ease-in-out">
                    <h2 className="text-3xl font-extrabold text-white mb-6 leading-tight">
                        <span role="img" aria-label="logout-icon" className="mr-2"></span> Are you sure you want to log out?
                    </h2>

                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <button
                            onClick={handleYes}
                            className="w-full sm:w-auto bg-red-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-75"
                        >
                            Yes
                        </button>
                        <button
                            onClick={handleNo}
                            className="w-full sm:w-auto bg-green-800  text-white font-bold py-3 px-8 rounded-full shadow-md transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-75"
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Logout;

