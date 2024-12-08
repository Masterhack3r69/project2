import React, { useState, useEffect } from 'react';
import { MdAdd, MdEdit, MdDelete, MdSearch, MdFilterList, MdVisibility } from 'react-icons/md';
import '../../css/components/admin/UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Fetching users with token:', token);
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch users');
      }

      setUsers(data);
      setError(null);
    } catch (err) {
      console.error('Error in fetchUsers:', err);
      setError('Error loading users: ' + err.message);
      setUsers([]); // Reset users on error
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/users/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to delete user');
        }

        setUsers(users.filter(user => user.id !== id));
        alert('User deleted successfully');
      } catch (err) {
        console.error('Error in handleDeleteUser:', err);
        alert(err.message || 'Error deleting user. Please try again.');
      }
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const UserDetailsModal = ({ user, onClose }) => {
    if (!user) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>User Details</h3>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          <div className="modal-body">
            <div className="user-detail">
              <label>Name:</label>
              <span>{user.name}</span>
            </div>
            <div className="user-detail">
              <label>Email:</label>
              <span>{user.email}</span>
            </div>
            <div className="user-detail">
              <label>Role:</label>
              <span className={`role-badge ${user.role.toLowerCase()}`}>
                {user.role}
              </span>
            </div>
            <div className="user-detail">
              <label>Status:</label>
              <span className={`status-badge ${user.status.toLowerCase()}`}>
                {user.status}
              </span>
            </div>
            <div className="user-detail">
              <label>Last Login:</label>
              <span>{user.lastLogin}</span>
            </div>
          </div>
          <div className="modal-footer">
            <button className="close-modal-button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          {error}
          <button onClick={fetchUsers} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-management">
      <div className="user-management-header">
        <h2>User Management</h2>
        <button className="add-user-button">
          <MdAdd size={20} /> Add User
        </button>
      </div>

      <div className="filters-section">
        <div className="filters-wrapper">
          <div className="search-box">
            <MdSearch className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (  
              <button 
                className="clear-search" 
                onClick={() => setSearchTerm('')}
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className="filter-controls">
            <div className="filter-group">
              <div className="select-wrapper">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="All">All Roles</option>
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Admin">Admin</option>
                </select>
                <MdFilterList size={18} />
              </div>
            </div>

            <div className="filter-group">
              <div className="select-wrapper">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <MdFilterList size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className="active-filters">
          {(selectedRole !== 'All' || selectedStatus !== 'All' || searchTerm) && (
            <div className="filter-tags">
              {searchTerm && (
                <span className="filter-tag">
                  Search: {searchTerm}
                  <button onClick={() => setSearchTerm('')}>×</button>
                </span>
              )}
              {selectedRole !== 'All' && (
                <span className="filter-tag">
                  Role: {selectedRole}
                  <button onClick={() => setSelectedRole('All')}>×</button>
                </span>
              )}
              {selectedStatus !== 'All' && (
                <span className="filter-tag">
                  Status: {selectedStatus}
                  <button onClick={() => setSelectedStatus('All')}>×</button>
                </span>
              )}
              <button 
                className="clear-all-filters"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedRole('All');
                  setSelectedStatus('All');
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{user.lastLogin}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="view-button" 
                        title="View user details"
                        onClick={() => handleViewUser(user)}
                      >
                        <MdVisibility size={18} />
                      </button>
                      <button 
                        className="edit-button" 
                        title="Edit user">
                        <MdEdit size={18} />
                      </button>
                      <button 
                        className="delete-button" 
                        title="Delete user"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-users">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showUserModal && (
        <UserDetailsModal 
          user={selectedUser} 
          onClose={() => {
            setShowUserModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;
