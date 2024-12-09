import React, { useState, useEffect } from 'react';
import '../../css/components/student/Profile.css';
import { useAuth } from '../../context/AuthContext';

function Profile() {
  const { username } = useAuth();
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    fullName: '',
    studentId: '',
    department: '',
    semester: '',
    joinDate: '',
    examsTaken: 0,
    averageScore: 0
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load profile data from localStorage for now
    // In real app, this would be an API call
    setProfileData({
      username: username || localStorage.getItem('username'),
      email: 'student@example.com',
      fullName: 'John Doe',
      studentId: 'STU123456',
      department: 'Computer Science',
      semester: '6th',
      joinDate: '2023-09-01',
      examsTaken: 15,
      averageScore: 85.5
    });
  }, [username]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to save the changes
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
        {!isEditing ? (
          <button className="edit-button" onClick={handleEdit}>
            <i className="fas fa-edit"></i> Edit Profile
          </button>
        ) : (
          <button className="save-button" onClick={handleSave}>
            <i className="fas fa-save"></i> Save Changes
          </button>
        )}
      </div>

      <div className="profile-content">
        <div className="profile-main">
          <div className="profile-avatar">
            <span className="avatar-text">{profileData.fullName.charAt(0)}</span>
          </div>
          <div className="profile-info-main">
            <h2>{profileData.fullName}</h2>
            <p className="student-id">Student ID: {profileData.studentId}</p>
            <p className="department">{profileData.department}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="info-section">
            <h3>Personal Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Username</label>
                <p>{profileData.username}</p>
              </div>
              <div className="info-item">
                <label>Email</label>
                <p>{profileData.email}</p>
              </div>
              <div className="info-item">
                <label>Department</label>
                <p>{profileData.department}</p>
              </div>
              <div className="info-item">
                <label>Semester</label>
                <p>{profileData.semester}</p>
              </div>
              <div className="info-item">
                <label>Join Date</label>
                <p>{profileData.joinDate}</p>
              </div>
            </div>
          </div>

          <div className="stats-section">
            <h3>Academic Statistics</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-value">{profileData.examsTaken}</span>
                <span className="stat-label">Exams Taken</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{profileData.averageScore}%</span>
                <span className="stat-label">Average Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
