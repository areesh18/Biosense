import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, Link } from 'react-router-dom';

// Import your page components
import LoginPage from './pages/Login.jsx';
import SignupPage from './pages/Signup.jsx';
import AdminDashboard from './pages/dashboards/AdminDashboard.jsx';
import DoctorDashboard from './pages/dashboards/DoctorDashboard.jsx';
import PatientDashboard from './pages/dashboards/PatientDashboard.jsx';
import Landing from './pages/Landing.jsx';

// --- Helper to decode JWT ---
const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

// --- Protected Route Component ---
// This component will check for a valid token and the correct user role.
const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" replace />;
  }

  const user = decodeToken(token);

  if (!user || !user.role) {
    // If token is invalid or has no role, redirect to login
    localStorage.removeItem('token'); // Clean up bad token
    return <Navigate to="/login" replace />;
  }

  // Check if the user's role is in the list of allowed roles for this route
  if (allowedRoles.includes(user.role)) {
    return <Outlet />; // Render the child component (the dashboard)
  } else {
    // If role is not allowed, show a "Forbidden" message or redirect
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-600">403 - Forbidden</h1>
            <p className="mt-4 text-lg text-gray-700">You do not have permission to access this page.</p>
            <Link to="/login" className="mt-6 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                Go to Login
            </Link>
        </div>
    );
  }
};

// --- Main App Component ---
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Redirect root to login */}
        <Route path="/" element={<Landing/>} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        
        <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        </Route>
        
        <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
        </Route>

        {/* Fallback for any other route */}
        <Route path="*" element={
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold text-gray-800">404 - Not Found</h1>
                <p className="mt-4 text-lg text-gray-600">The page you are looking for does not exist.</p>
                <Link to="/login" className="mt-6 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                    Go to Login
                </Link>
            </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

