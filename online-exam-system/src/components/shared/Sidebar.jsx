import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../css/components/dashboard/Sidebar.css';

const Sidebar = ({ role }) => {
  const location = useLocation();
  
  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/users', label: 'User Management', icon: '👥' },
    { path: '/admin/exams', label: 'Exam Management', icon: '📝' },
  ];

  const teacherLinks = [
    { path: '/teacher/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/teacher/create-exam', label: 'Create Exam', icon: '✏️' },
    { path: '/teacher/results', label: 'Student Results', icon: '📋' },
  ];

  const links = role === 'admin' ? adminLinks : teacherLinks;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>{role.charAt(0).toUpperCase() + role.slice(1)} Panel</h2>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar; 