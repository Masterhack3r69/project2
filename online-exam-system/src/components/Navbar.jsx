import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import icon from './icon.svg';
import '../css/components/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('userRole');
    if (storedUsername && storedRole) {
      setUsername(storedUsername);
      setUserRole(storedRole);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    setUserRole('');
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
          <Link to={`/${userRole}/dashboard`} className="nav-link">Dashboard</Link>
          <div className="user-info">
            <span className="username">
              Welcome, <strong>{username}</strong>
            </span>
            <button onClick={handleLogout} className="logout-button">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link register-btn">Register</Link>
        </>
      )}
    </div>
  </nav>
  );
}

export default Navbar;