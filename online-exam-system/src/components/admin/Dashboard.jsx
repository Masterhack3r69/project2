import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>1,234</p>
        </div>
        <div className="stat-card">
          <h3>Active Exams</h3>
          <p>45</p>
        </div>
        <div className="stat-card">
          <h3>Completed Exams</h3>
          <p>789</p>
        </div>
      </div>
      
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        {/* Add recent activity list here */}
      </div>
    </div>
  );
};

export default AdminDashboard; 