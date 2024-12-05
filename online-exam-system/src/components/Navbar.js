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
        <Link to="/">
          <img src={icon} alt="Online Exam System Logo" className="navbar-icon" />
          <span>Online Exam System</span>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to={`/${userRole}/dashboard`}>Dashboard</Link>
            <span className="username">Welcome, {username}</span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;