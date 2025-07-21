import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import AddDoctor from './pages/AddDoctor';
import ViewDoctors from './pages/ViewDoctors';
import AddPharmacy from './pages/AddPharmacy';
import ViewPharmacies from './pages/ViewPharmacies';
import Appointments from './Components/Appointments';
import Login from './pages/Login';
import Register from './pages/Register';


// Dummy auth check
const isAuthenticated = () => !!localStorage.getItem('accessToken');

// Protected route wrapper
const ProtectedRoute = ({ children }) =>
  isAuthenticated() ? children : <Navigate to="/login" replace />;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* Protected Dashboard */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Appointments />} />
          <Route path="add-doctor" element={<AddDoctor />} />
          <Route path="view-doctors" element={<ViewDoctors />} />
          <Route path="add-pharmacy" element={<AddPharmacy />} />
          <Route path="view-pharmacies" element={<ViewPharmacies />} />
        </Route>

        {/* Catch-all */}
        <Route
          path="*"
          element={
            isAuthenticated() ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
