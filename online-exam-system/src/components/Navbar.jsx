import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import icon from './icon.svg';
import '../css/components/Navbar.css';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, username, userRole, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          <img src={icon} alt="Online Exam System Logo" className="navbar-icon" />
          <span className="brand-text">Online Exam System</span>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        {isLoggedIn ? (
          <>
            {userRole === 'admin' && (
              <>
                <Link to="/about" className="nav-link">About</Link>
                <Link to="/contact" className="nav-link">Contact</Link>
                <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
              </>
            )}
            {userRole === 'teacher' && (
              <>
                <Link to="/about" className="nav-link">About</Link>
                <Link to="/contact" className="nav-link">Contact</Link>
                <Link to="/teacher/dashboard" className="nav-link">Dashboard</Link>
              </>
            )}
            {userRole === 'student' && (
              <>
                <Link to="/student/profile" className="nav-link">Profile</Link>
                <Link to="/student/exams" className="nav-link">Available Exams</Link>
                <Link to="/student/my-results" className="nav-link">My Results</Link>
                <Link to="/student/schedule" className="nav-link">Exam Schedule</Link>
              </>
            )}
            <div className="user-info">
              <span className="username">
                <i className="fas fa-user"></i> Welcome, <strong>{username}</strong> ({userRole})
              </span>
              <button onClick={handleLogout} className="logout-button">
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link register-btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;