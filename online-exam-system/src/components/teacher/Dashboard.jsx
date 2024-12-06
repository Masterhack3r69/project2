import React from 'react';

const TeacherDashboard = () => {
  return (
    <div className="teacher-dashboard">
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>My Exams</h3>
          <p>12</p>
        </div>
        <div className="stat-card">
          <h3>Active Students</h3>
          <p>156</p>
        </div>
        <div className="stat-card">
          <h3>Average Score</h3>
          <p>78%</p>
        </div>
      </div>
      
      <div className="upcoming-exams">
        <h2>Upcoming Exams</h2>
        {/* Add upcoming exams list here */}
      </div>
    </div>
  );
};

export default TeacherDashboard; 