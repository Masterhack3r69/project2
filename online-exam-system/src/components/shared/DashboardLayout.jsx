import React from 'react';
import Sidebar from './Sidebar';
import '../../css/components/dashboard/Dashboard.css';

const DashboardLayout = ({ children, role, title }) => {
  return (
    <div className="dashboard-container">
      <Sidebar role={role} />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>{title}</h1>
        </header>
        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout; 