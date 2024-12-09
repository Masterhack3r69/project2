import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import icon from './icon.svg';
import '../css/components/Navbar.css';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, username, userRole, logout } = useAuth();
  const [examCode, setExamCode] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleExamCodeSubmit = (e) => {
    e.preventDefault();
    if (examCode.trim()) {
      navigate(`/exam/${examCode}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          <img src={icon} alt="Logo" className="navbar-icon" />
          <span className="brand-text">OES</span>
        </Link>
      </div>

      <div className="search-and-code">
        <div className="search-container">
          <input
            type="search"
            placeholder="Search..."
            className="search-input"
          />
        </div>
        {isLoggedIn && userRole === 'student' && (
          <form onSubmit={handleExamCodeSubmit} className="exam-code-form">
            <input
              type="text"
              value={examCode}
              onChange={(e) => setExamCode(e.target.value)}
              placeholder="Enter code"
              className="exam-code-input"
            />
            <button type="submit" className="join-exam-btn">
              Join Exam
            </button>
          </form>
        )}
      </div>

      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        {isLoggedIn ? (
          <>
            {userRole === 'admin' && (
              <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
            )}
            {userRole === 'teacher' && (
              <Link to="/teacher/dashboard" className="nav-link">Dashboard</Link>
            )}
            {userRole === 'student' && (
              <>
                <Link to="/student/exams" className="nav-link">Exams</Link>
                <Link to="/student/my-results" className="nav-link">Results</Link>
              </>
            )}
            <div className="user-menu" ref={dropdownRef}>
              <div className="user-avatar" onClick={toggleDropdown}>
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="user-dropdown" onClick={toggleDropdown}>
                <span className="username">{username}</span>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    {userRole === 'student' && (
                      <Link 
                        to="/student/profile" 
                        className="dropdown-item"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <i className="fas fa-user"></i> My Profile
                      </Link>
                    )}
                    <button onClick={handleLogout} className="logout-button">
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                  </div>
                )}
              </div>
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