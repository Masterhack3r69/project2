import React, { useState } from 'react';
import icon from '../components/icon.svg';
import FeatureIcon from '../components/FeatureIcon';
import '../css/pages/Home.css';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [examCode, setExamCode] = useState('');

  const handleExamCodeChange = (e) => {
    setExamCode(e.target.value);
  };

  // Dummy data - replace with actual data from your backend
  const categories = ['all', 'programming', 'mathematics', 'science', 'history'];
  const featuredQuizzes = [
    { 
      id: 1, 
      title: 'JavaScript Basics', 
      category: 'programming', 
      participants: 1200, 
      description: 'Learn the fundamentals of JavaScript programming language including variables, functions, and DOM manipulation.'
    },
    { 
      id: 2, 
      title: 'World History', 
      category: 'history', 
      participants: 800, 
      description: 'Explore major historical events and civilizations that shaped our world from ancient times to modern era.'
    },
    { 
      id: 3, 
      title: 'Physics 101', 
      category: 'science', 
      participants: 950, 
      description: 'Introduction to basic physics concepts including mechanics, energy, and motion.'
    },
  ];

  const popularQuizzes = [
    { 
      id: 4, 
      title: 'Python for Beginners', 
      category: 'programming', 
      participants: 2000, 
      description: 'Start your programming journey with Python. Perfect for absolute beginners.'
    },
    { 
      id: 5, 
      title: 'Calculus Fundamentals', 
      category: 'mathematics', 
      participants: 1500, 
      description: 'Master the basics of calculus including limits, derivatives, and integrals.'
    },
    { 
      id: 6, 
      title: 'Ancient Civilizations', 
      category: 'history', 
      participants: 1800, 
      description: 'Discover the fascinating world of ancient civilizations from Egypt to Rome.'
    },
  ];

  const filteredFeatured = selectedCategory === 'all' 
    ? featuredQuizzes 
    : featuredQuizzes.filter(quiz => quiz.category === selectedCategory);

  const filteredPopular = selectedCategory === 'all'
    ? popularQuizzes
    : popularQuizzes.filter(quiz => quiz.category === selectedCategory);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <div className="icon-container">
            <img src={icon} alt="Online Exam Icon" className="exam-icon" />
          </div>
          <h1>Welcome to Online Exam System</h1>
          <p>Your trusted platform for online assessments and examinations</p>
          <div className="exam-code-input-home">
            <input 
              type="text" 
              placeholder="Enter Exam Code"
              className="code-input"
              value={examCode}
              onChange={handleExamCodeChange}
            />
            <button className="enter-code-btn">Enter</button>
          </div>
        </div>
      </section>
      
      <section className="quiz-sections">
        <div className="category-filter">
          <h3>Filter by Category:</h3>
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="featured-quizzes">
          <h2>Featured Quizzes</h2>
          <div className="quiz-grid">
            {filteredFeatured.map(quiz => (
              <div key={quiz.id} className="quiz-card">
                <h3>{quiz.title}</h3>
                <div className="quiz-info">
                  <span className="category">{quiz.category}</span>
                  <span className="participants">{quiz.participants} participants</span>
                </div>
                <p className="quiz-description">{quiz.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="popular-quizzes">
          <h2>Popular Quizzes</h2>
          <div className="quiz-grid">
            {filteredPopular.map(quiz => (
              <div key={quiz.id} className="quiz-card">
                <h3>{quiz.title}</h3>
                <div className="quiz-info">
                  <span className="category">{quiz.category}</span>
                  <span className="participants">{quiz.participants} participants</span>
                </div>
                <p className="quiz-description">{quiz.description}</p>
              </div>
            ))}
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