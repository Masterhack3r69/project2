import React from 'react';
import Sidebar from './Sidebar';
import '../../css/components/dashboard/Dashboard.css';

const DashboardLayout = ({ children, role, title }) => {
  if (role === 'student') {
    return (
      <div className="student-dashboard-container">
        <main className="student-dashboard-main">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar role={role} />
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;