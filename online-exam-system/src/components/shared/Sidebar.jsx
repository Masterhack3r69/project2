import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdDashboard, MdPeople, MdAssignment, MdEdit, 
         MdAssessment, MdChevronLeft, MdChevronRight, MdPerson } from 'react-icons/md';
import '../../css/components/dashboard/Sidebar.css';

const Sidebar = ({ role }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: MdDashboard },
    { path: '/admin/users', label: 'User Management', icon: MdPeople },
    { path: '/admin/categories', label: 'Categories', icon: MdAssignment },
    { path: '/admin/exams', label: 'Exam Management', icon: MdEdit },
  ];

  const teacherLinks = [
    { path: '/teacher/dashboard', label: 'Dashboard', icon: MdDashboard },
    { path: '/teacher/create-exam', label: 'Create Exam', icon: MdEdit },
    { path: '/teacher/results', label: 'Student Results', icon: MdAssessment },
  ];

  const studentLinks = [
    { path: '/student/profile', label: 'Profile', icon: MdPerson },
    { path: '/quizzes', label: 'Available Exams', icon: MdAssignment },
    { path: '/student/results', label: 'My Results', icon: MdAssessment },
  ];

  const getLinks = () => {
    switch(role) {
      case 'admin':
        return adminLinks;
      case 'teacher':
        return teacherLinks;
      case 'student':
        return studentLinks;
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="header-content">
          {!isCollapsed && <h2>{role === 'student' ? 'Student Menu' : `${role.charAt(0).toUpperCase() + role.slice(1)} Panel`}</h2>}
          <button 
            className="collapse-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <MdChevronRight size={24} /> : <MdChevronLeft size={24} />}
          </button>
        </div>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
              title={isCollapsed ? link.label : ''}
            >
              <span className="sidebar-icon">
                <Icon size={22} />
              </span>
              {!isCollapsed && <span className="sidebar-label">{link.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;