
import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = ({ onMenuClick }) => {
    const userName = 'Admin User';

    return (
        <nav className="bg-teal-600 p-4 shadow-md flex items-center justify-between sticky top-0 z-10">
            {/* Left: Hamburger Menu + Logo */}
            <div className="flex items-center space-x-3">
                <button
                    onClick={onMenuClick}
                    className="md:hidden text-white p-2 rounded hover:bg-teal-700 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>

                <Link to="/" className="text-xl font-bold text-white">
                    My Health System
                </Link>
            </div>

            {/* Right: User Info + Icons + Logout */}
            <div className="flex items-center gap-8">
                <span className="hidden sm:inline text-white text-sm md:text-base">
                    Welcome, <span className="font-semibold">{userName}</span>
                </span>

                <Link
                    to="/logout"
                    className="px-3 py-1 md:px-4 md:py-2 bg-red-500 text-white text-sm font-semibold rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
                >
                    Logout
                </Link>
            </div>

        </nav>
    );
};

export default AdminNavbar;
