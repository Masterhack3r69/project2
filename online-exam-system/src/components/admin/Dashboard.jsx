import React from 'react';
import { MdAssignment, MdCheckCircle, MdSchool, MdCastForEducation } from 'react-icons/md';
import '../../css/components/dashboard/Dashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h2>Admin Dashboard</h2>
      </header>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon teachers">
            <MdCastForEducation size={32} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Teachers</p>
            <h2 className="stat-value">234</h2>
            <p className="stat-change positive">↑ 12% from last month</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon students">
            <MdSchool size={32} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Students</p>
            <h2 className="stat-value">1,000</h2>
            <p className="stat-change positive">↑ 8% from last month</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon active-exams">
            <MdAssignment size={32} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Active Exams</p>
            <h2 className="stat-value">45</h2>
            <p className="stat-change neutral">No change</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed">
            <MdCheckCircle size={32} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Completed Exams</p>
            <h2 className="stat-value">789</h2>
            <p className="stat-change positive">↑ 23% from last month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;