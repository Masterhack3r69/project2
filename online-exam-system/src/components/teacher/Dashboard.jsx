import React from 'react';
import { MdAssignment, MdCheckCircle, MdPeople, MdTimeline } from 'react-icons/md';
import '../../css/components/dashboard/Dashboard.css';

const TeacherDashboard = () => {
  return (
    <div className="teacher-dashboard">
      <header className="dashboard-header">
        <h2>Teacher Dashboard</h2>
      </header>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon students">
            <MdPeople size={32} />
          </div>
          <div className="stat-info">
            <p className="stat-label">My Students</p>
            <h2 className="stat-value">156</h2>
            <p className="stat-change positive">↑ 5% from last month</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon active-exams">
            <MdAssignment size={32} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Active Assignments</p>
            <h2 className="stat-value">12</h2>
            <p className="stat-change positive">↑ 2 new this week</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed">
            <MdCheckCircle size={32} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Graded Assignments</p>
            <h2 className="stat-value">48</h2>
            <p className="stat-change neutral">8 pending review</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon performance">
            <MdTimeline size={32} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Class Average</p>
            <h2 className="stat-value">85%</h2>
            <p className="stat-change positive">↑ 3% this semester</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;