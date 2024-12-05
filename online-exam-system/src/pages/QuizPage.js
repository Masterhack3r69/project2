import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExamIcon from '../components/ExamIcon';
import '../css/pages/QuizPage.css';

// Mock data - replace with actual API call
const mockExams = [
  {
    id: 1,
    title: 'Mathematics Final',
    subject: 'Mathematics',
    teacherName: 'Dr. Smith',
    duration: '2 hours',
    totalQuestions: 50,
    difficulty: 'Advanced',
    date: '2024-02-15',
  },
  {
    id: 2,
    title: 'Physics Quiz',
    subject: 'Physics',
    teacherName: 'Prof. Johnson',
    duration: '1 hour',
    totalQuestions: 30,
    difficulty: 'Intermediate',
    date: '2024-02-20',
  },
  {
    id: 3,
    title: 'Chemistry Lab Test',
    subject: 'Chemistry',
    teacherName: 'Dr. Williams',
    duration: '1.5 hours',
    totalQuestions: 40,
    difficulty: 'Intermediate',
    date: '2024-02-18',
  },
  // Add more mock exams as needed
];

function QuizPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Get unique values for filters
  const subjects = [...new Set(mockExams.map(exam => exam.subject))].sort();
  const difficulties = [...new Set(mockExams.map(exam => exam.difficulty))].sort();

  // Filter exams based on search term and filters
  const filteredExams = mockExams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.teacherName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = !selectedSubject || exam.subject === selectedSubject;
    const matchesDifficulty = !selectedDifficulty || exam.difficulty === selectedDifficulty;

    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const handleViewExam = (examId) => {
    navigate(`/exam/${examId}`);
  };

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <div className="quiz-header-top">
          <h1>Available Exams</h1>
          <div className="view-mode-toggle">
            <button 
              className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid View
            </button>
            <button 
              className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              List View
            </button>
          </div>
        </div>
        
        <div className="search-filters-container">
          <div className="search-bar">
            <i className="search-icon">🔍</i>
            <input
              type="text"
              placeholder="Search by exam title or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filters">
            <div className="filter-group">
              <label>Subject</label>
              <div className="filter-buttons">
                <button
                  className={`filter-btn ${selectedSubject === '' ? 'active' : ''}`}
                  onClick={() => setSelectedSubject('')}
                >
                  All
                </button>
                {subjects.map(subject => (
                  <button
                    key={subject}
                    className={`filter-btn ${selectedSubject === subject ? 'active' : ''}`}
                    onClick={() => setSelectedSubject(subject)}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="filter-group">
              <label>Difficulty</label>
              <div className="filter-buttons">
                <button
                  className={`filter-btn ${selectedDifficulty === '' ? 'active' : ''}`}
                  onClick={() => setSelectedDifficulty('')}
                >
                  All
                </button>
                {difficulties.map(difficulty => (
                  <button
                    key={difficulty}
                    className={`filter-btn ${selectedDifficulty === difficulty ? 'active' : ''}`}
                    onClick={() => setSelectedDifficulty(difficulty)}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`exam-container ${viewMode}`}>
        {filteredExams.length === 0 ? (
          <div className="no-results">
            <ExamIcon width="64" height="64" color="#4335A7" />
            <h3>No exams found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredExams.map(exam => (
            <div key={exam.id} className="exam-card">
              <div className="exam-card-header">
                <div className="exam-card-icon">
                  <ExamIcon width="32" height="32" color="#4335A7" />
                </div>
                <div className="difficulty-badge" data-difficulty={exam.difficulty.toLowerCase()}>
                  {exam.difficulty}
                </div>
              </div>
              
              <div className="exam-card-content">
                <h3>{exam.title}</h3>
                <div className="exam-details">
                  <div className="detail-item">
                    <span className="detail-label">Subject:</span>
                    <span className="detail-value">{exam.subject}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Teacher:</span>
                    <span className="detail-value">{exam.teacherName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Duration:</span>
                    <span className="detail-value">{exam.duration}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Questions:</span>
                    <span className="detail-value">{exam.totalQuestions}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">{new Date(exam.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <button
                className="view-button"
                onClick={() => handleViewExam(exam.id)}
              >
                View Exam Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default QuizPage;
