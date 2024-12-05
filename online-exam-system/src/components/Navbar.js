import React from 'react';
import { Link } from 'react-router-dom';
import icon from './icon.svg';
import '../css/components/Navbar.css';

function Navbar() {
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
        <Link to="/quizzes">Quizzes</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;