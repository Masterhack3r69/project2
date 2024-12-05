import React from 'react';
import '../css/components/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Online Exam System</h4>
          <p>Making education accessible and efficient</p>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@onlineexam.com</p>
          <p>Phone: (555) 123-4567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Online Exam System. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer; 