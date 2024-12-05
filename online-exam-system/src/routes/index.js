import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../components/admin/Dashboard';
import TeacherDashboard from '../components/teacher/Dashboard';
import DashboardLayout from '../components/shared/DashboardLayout';

// This is a protected route component that checks for authentication
const ProtectedRoute = ({ children, role }) => {
  // You can implement your authentication logic here
  const isAuthenticated = true; // Replace with actual auth check
  const userRole = role; // Replace with actual user role check

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/" />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <DashboardLayout role="admin" title="Admin Dashboard">
                <AdminDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher"
          element={
            <ProtectedRoute role="teacher">
              <DashboardLayout role="teacher" title="Teacher Dashboard">
                <TeacherDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
