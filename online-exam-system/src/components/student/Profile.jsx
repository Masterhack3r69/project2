import React, { useState, useEffect } from 'react';
import '../../css/components/student/Profile.css';

function Profile() {
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    fullName: '',
    studentId: '',
  });

  useEffect(() => {
    // Load profile data from localStorage for now
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email') || '';
    const fullName = localStorage.getItem('fullName') || '';
    const studentId = localStorage.getItem('studentId') || '';

    setProfileData({
      username,
      email,
      fullName,
      studentId,
    });
  }, []);

  return (
    <div className="profile-container">
      <h1>Student Profile</h1>
      <div className="profile-card">
        <div className="profile-avatar">
          <i className="fas fa-user-circle"></i>
        </div>
        <div className="profile-info">
          <div className="info-group">
            <label>Username:</label>
            <p>{profileData.username}</p>
          </div>
          <div className="info-group">
            <label>Full Name:</label>
            <p>{profileData.fullName}</p>
          </div>
          <div className="info-group">
            <label>Email:</label>
            <p>{profileData.email}</p>
          </div>
          <div className="info-group">
            <label>Student ID:</label>
            <p>{profileData.studentId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
