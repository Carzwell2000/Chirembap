import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const activeLinkClasses = "bg-teal-600 text-white font-semibold";
    const normalLinkClasses = "text-gray-300 hover:bg-teal-700 hover:text-white";

    return (
        <div className="w-64 bg-gray-800 text-white p-5 h-screen fixed top-0 left-0 shadow-lg">
            <div className="text-center mb-8 border-b border-gray-700 pb-4">
                <h2 className="text-2xl font-bold text-teal-400">Admin Dashboard</h2>
            </div>
            <ul className="space-y-3">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `block py-2.5 px-4 rounded transition duration-200 ${isActive ? activeLinkClasses : normalLinkClasses}`
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/add-doctor"
                        className={({ isActive }) =>
                            `block py-2.5 px-4 rounded transition duration-200 ${isActive ? activeLinkClasses : normalLinkClasses}`
                        }
                    >
                        Add Doctor
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/view-doctors"
                        className={({ isActive }) =>
                            `block py-2.5 px-4 rounded transition duration-200 ${isActive ? activeLinkClasses : normalLinkClasses}`
                        }
                    >
                        View Doctors
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/add-pharmacy"
                        className={({ isActive }) =>
                            `block py-2.5 px-4 rounded transition duration-200 ${isActive ? activeLinkClasses : normalLinkClasses}`
                        }
                    >
                        Add Pharmacy
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/view-pharmacies" // ✅ Fixed path
                        className={({ isActive }) =>
                            `block py-2.5 px-4 rounded transition duration-200 ${isActive ? activeLinkClasses : normalLinkClasses}`
                        }
                    >
                        View Pharmacies
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/add-products" // ✅ Fixed path
                        className={({ isActive }) =>
                            `block py-2.5 px-4 rounded transition duration-200 ${isActive ? activeLinkClasses : normalLinkClasses}`
                        }
                    >
                        Add products
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/dashboard/view-products" // ✅ Fixed path
                        className={({ isActive }) =>
                            `block py-2.5 px-4 rounded transition duration-200 ${isActive ? activeLinkClasses : normalLinkClasses}`
                        }
                    >
                        View products
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
