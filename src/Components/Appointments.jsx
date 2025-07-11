import React, { useEffect, useState } from 'react';
import { supabase } from '../Components/supabaseClient'; // Adjust the path if needed

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [showRescheduleModal, setShowRescheduleModal] = useState(false);
    const [currentAppointmentToReschedule, setCurrentAppointmentToReschedule] = useState(null);
    const [newRescheduleDateTime, setNewRescheduleDateTime] = useState(''); // YYYY-MM-DDTHH:MM format

    const fetchAppointments = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('Appointments')
            .select('id, patient_name, doctor_name, appointment_timestamp, reason, status')
            .order('appointment_timestamp', { ascending: true });

        if (error) {
            console.error('Failed to fetch appointments:', error);
            // Optionally, show a user-friendly error message
        } else {
            const formatted = data.map((appt) => {
                const datetime = new Date(appt.appointment_timestamp);
                return {
                    id: appt.id,
                    patient: appt.patient_name,
                    doctor: appt.doctor_name,
                    date: datetime.toLocaleDateString(),
                    time: datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    reason: appt.reason,
                    status: appt.status,
                    rawTimestamp: appt.appointment_timestamp, // Keep raw timestamp for rescheduling
                };
            });
            setAppointments(formatted);
        }
        setLoading(false);
    };

    const updateAppointmentStatus = async (id, newStatus, newTimestamp = null) => {
        setUpdating(true);
        let updateData = { status: newStatus };

        if (newTimestamp) {
            updateData.appointment_timestamp = newTimestamp;
            updateData.status = 'Rescheduled'; // Set status to 'Rescheduled' if a new timestamp is provided
            // You might want to add other fields here, e.g., rescheduled_by_admin: true
        }

        const { error } = await supabase
            .from('Appointments')
            .update(updateData)
            .eq('id', id);

        if (error) {
            console.error('Failed to update appointment:', error);
            alert('Failed to update appointment status.');
        } else {
            await fetchAppointments(); // Re-fetch all appointments to update the list
            if (newTimestamp) {
                alert('Appointment successfully rescheduled!');
            } else {
                alert(`Appointment ${newStatus.toLowerCase()}!`);
            }
        }
        setUpdating(false);
        setShowRescheduleModal(false); // Close modal after update
        setNewRescheduleDateTime(''); // Clear date/time
        setCurrentAppointmentToReschedule(null); // Clear current appt
    };

    const handleDeclineClick = (appointment) => {
        setCurrentAppointmentToReschedule(appointment);
        // Pre-fill with current date/time or leave empty
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        setNewRescheduleDateTime(`${year}-${month}-${day}T${hours}:${minutes}`);

        setShowRescheduleModal(true);
    };

    const handleConfirmReschedule = () => {
        if (currentAppointmentToReschedule && newRescheduleDateTime) {
            // Validate if newRescheduleDateTime is a valid future date/time
            const selectedDate = new Date(newRescheduleDateTime);
            if (isNaN(selectedDate.getTime()) || selectedDate < new Date()) {
                alert('Please select a valid future date and time for rescheduling.');
                return;
            }
            // Call updateAppointmentStatus with the new timestamp
            updateAppointmentStatus(
                currentAppointmentToReschedule.id,
                'Rescheduled', // Explicitly setting status here
                newRescheduleDateTime
            );
        } else {
            alert('Please select a new date and time.');
        }
    };

    const handleCancelReschedule = () => {
        setShowRescheduleModal(false);
        setCurrentAppointmentToReschedule(null);
        setNewRescheduleDateTime('');
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div className="bg-white p-8 rounded-lg shadow-xl relative"> {/* Added relative for modal positioning */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upcoming Appointments</h2>

            {loading ? (
                <p className="text-gray-500">Loading appointments...</p>
            ) : appointments.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {appointments.map((appt) => (
                                <tr key={appt.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appt.patient}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{appt.doctor}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{appt.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{appt.time}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{appt.reason}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${appt.status === 'Confirmed'
                                                ? 'bg-green-100 text-green-800'
                                                : appt.status === 'Pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : appt.status === 'Rescheduled' // New status styling
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {appt.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                        <button
                                            className="text-green-600 hover:text-green-800 font-semibold disabled:opacity-50"
                                            disabled={updating}
                                            onClick={() => updateAppointmentStatus(appt.id, 'Confirmed')}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-800 font-semibold disabled:opacity-50"
                                            disabled={updating}
                                            onClick={() => handleDeclineClick(appt)}
                                        >
                                            Decline
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">No appointments scheduled for now.</p>
            )}

            {/* Reschedule Modal */}
            {showRescheduleModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Reschedule Appointment</h3>
                        {currentAppointmentToReschedule && (
                            <p className="text-gray-700 mb-4">
                                Rescheduling for  {currentAppointmentToReschedule.patient}with Dr.{currentAppointmentToReschedule.doctor}
                            </p>
                        )}
                        <label htmlFor="reschedule-datetime" className="block text-gray-700 text-sm font-bold mb-2">
                            New Date and Time:
                        </label>
                        <input
                            type="datetime-local"
                            id="reschedule-datetime"
                            value={newRescheduleDateTime}
                            onChange={(e) => setNewRescheduleDateTime(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleConfirmReschedule}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                disabled={updating}
                            >
                                Confirm Reschedule
                            </button>
                            <button
                                onClick={handleCancelReschedule}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                disabled={updating}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Appointments;