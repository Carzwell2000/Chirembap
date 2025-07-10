// src/pages/Dashboard.jsx
import React from 'react';


const Appointments = () => {
    // Dummy data for appointments - in a real app, this would come from an API
    const appointments = [
        { id: 1, patient: 'Alice Smith', doctor: 'Dr. John Doe', date: '2025-07-10', time: '10:00 AM', status: 'Confirmed' },
        { id: 2, patient: 'Bob Johnson', doctor: 'Dr. Jane Smith', date: '2025-07-10', time: '02:30 PM', status: 'Pending' },
        { id: 3, patient: 'Charlie Brown', doctor: 'Dr. Emily White', date: '2025-07-11', time: '09:00 AM', status: 'Confirmed' },
        { id: 4, patient: 'Diana Prince', doctor: 'Dr. John Doe', date: '2025-07-11', time: '01:00 PM', status: 'Cancelled' },
    ];

    return (<div>

        <div className="bg-white p-8 rounded-lg shadow-xl">


            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upcoming Appointments</h2>

            {appointments.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {appointments.map((appt) => (
                                <tr key={appt.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appt.patient}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{appt.doctor}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{appt.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{appt.time}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${appt.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                                appt.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {appt.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">No appointments scheduled for now.</p>
            )}
        </div>
    </div>
    );
};

export default Appointments;