import React, { useState } from 'react';
import { MdAdd, MdEdit, MdDelete, MdSearch, MdFilterList } from 'react-icons/md';
import '../../css/components/teacher/ExamsManagement.css';

const ExamsManagement = () => {
  const [exams, setExams] = useState([
    {
      id: 1,
      title: 'Midterm Mathematics',
      subject: 'Mathematics',
      duration: '120',
      totalMarks: 100,
      dueDate: '2024-04-15',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Physics Quiz 1',
      subject: 'Physics',
      duration: '45',
      totalMarks: 50,
      dueDate: '2024-04-20',
      status: 'Draft'
    }
  ]);

  return (
    <div className="teacher-exams-management">
      <div className="teacher-exams-content-wrapper">
        <div className="teacher-exams-header">
          <div className="teacher-exams-header-title">
            <h2>Exams Management</h2>
            <p className="teacher-exams-subtitle">Manage and monitor your exams</p>
          </div>
          <button className="teacher-exams-create-btn">
            <MdAdd size={20} />
            Create New Exam
          </button>
        </div>

        <div className="teacher-exams-filters">
          <div className="teacher-exams-search-wrapper">
            <MdSearch className="teacher-exams-search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search exams..." 
              className="teacher-exams-search-input"
            />
          </div>
          <div className="teacher-exams-filter-wrapper">
            <MdFilterList className="teacher-exams-filter-icon" size={20} />
            <select className="teacher-exams-filter-select">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="teacher-exams-list">
          <div className="teacher-exams-table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Duration (min)</th>
                  <th>Total Marks</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => (
                  <tr key={exam.id}>
                    <td className="teacher-exams-title">{exam.title}</td>
                    <td>{exam.subject}</td>
                    <td>{exam.duration}</td>
                    <td>{exam.totalMarks}</td>
                    <td>{exam.dueDate}</td>
                    <td>
                      <span className={`teacher-exams-status-badge ${exam.status.toLowerCase()}`}>
                        {exam.status}
                      </span>
                    </td>
                    <td className="teacher-exams-actions">
                      <button className="teacher-exams-action-btn edit" title="Edit exam">
                        <MdEdit size={18} />
                      </button>
                      <button className="teacher-exams-action-btn delete" title="Delete exam">
                        <MdDelete size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamsManagement; 