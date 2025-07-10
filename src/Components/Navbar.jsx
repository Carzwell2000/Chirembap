import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
    const userName = "Admin User";

    return (
        <nav className="bg-teal-600 p-4 shadow-md flex items-center justify-between z-10 sticky top-0">
            <div className="text-xl font-bold text-white">
                <Link to="/" className="text-white">
                    My Health System
                </Link>
            </div>

            <div className="flex items-center space-x-4">
                <span className="text-white text-sm md:text-base">
                    Welcome, <span className="font-semibold text-white">{userName}</span>
                </span>

                {/* Notification icon */}
                <button className="text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341
              C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" />
                    </svg>
                </button>

                {/* Profile icon */}
                <button className="text-white focus:outline-none">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804
              M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>

                {/* Logout button using Link */}
                <Link
                    to="/Logout"
                    className="ml-4 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Logout
                </Link>
            </div>
        </nav>
    );
};

export default AdminNavbar;
