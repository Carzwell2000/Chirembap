// src/pages/Logout.jsx
import React, { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../Components/firebaseConfig'; // Adjust path if needed

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const doLogout = async () => {
            try {
                await signOut(auth); // Firebase logout
                localStorage.removeItem('accessToken'); // Clear token
                navigate('/login', { replace: true }); // Redirect to login
            } catch (error) {
                console.error('Logout error:', error);
            }
        };

        doLogout();
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-lg text-gray-700">Logging out...</p>
        </div>
    );
};

export default Logout;
