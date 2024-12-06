import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../components/icon.svg';
import FeatureIcon from '../components/FeatureIcon';
import '../css/pages/Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <div className="icon-container">
            <img src={icon} alt="Online Exam Icon" className="exam-icon" />
          </div>
          <h1>Welcome to Online Exam System</h1>
          <p>Your trusted platform for online assessments and examinations</p>
          <div className="cta-buttons">
            <Link to="/login" className="cta-button">Get Started</Link>
            <Link to="/register" className="cta-button secondary">Learn More</Link>
          </div>
        </div>
      </section>
      
      <section className="features">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FeatureIcon width="32" height="32" color="#4335A7" />
            <h3>Secure Testing</h3>
            <p>Advanced security measures to ensure test integrity</p>
          </div>
          <div className="feature-card">
            <FeatureIcon width="32" height="32" color="#4335A7" />
            <h3>Easy Access</h3>
            <p>Take exams from anywhere, anytime</p>
          </div>
          <div className="feature-card">
            <FeatureIcon width="32" height="32" color="#4335A7" />
            <h3>Instant Results</h3>
            <p>Get your results immediately after completion</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;