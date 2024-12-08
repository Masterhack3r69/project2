import React from 'react';
import { MdPeople, MdAssignment, MdCheckCircle } from 'react-icons/md';
import '../../css/components/dashboard/Dashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
        <header className="dashboard-header">
          <h2>Dashboard</h2>
        </header>
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <MdPeople size={28} />
          </div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <p>1,234</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <MdAssignment size={28} />
          </div>
          <div className="stat-info">
            <h3>Active Exams</h3>
            <p>45</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <MdCheckCircle size={28} />
          </div>
          <div className="stat-info">
            <h3>Completed Exams</h3>
            <p>789</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;