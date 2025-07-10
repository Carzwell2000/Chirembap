import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block md:w-64`}>
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-gray-50">
                {/* Top Navbar */}
                <div className="sticky top-0 z-20">
                    <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
                </div>

                {/* Page Content */}
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

