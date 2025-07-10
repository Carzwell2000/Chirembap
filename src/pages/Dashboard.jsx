import React from 'react'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'

function Dashboard() {
    return (
        <div>
            <div className="flex">
                <Sidebar />
            </div>
            <div className=" flex-1 ml-64 p-8 h-screen">
                <Navbar />
                <Outlet />
            </div>

        </div>
    )
}

export default Dashboard
