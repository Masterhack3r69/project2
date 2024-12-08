const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { JWT_SECRET } = require('../config/auth');

const getAllUsers = async (req, res) => {
  console.log('Received request for /api/users');
  console.log('User role:', req.user.role);
  
  try {
    if (req.user.role !== 'admin') {
      console.log('Access denied: User is not an admin');
      return res.status(403).json({ message: 'Access denied: Only administrators can view user list' });
    }

    console.log('Executing database query...');
    const [rows] = await db.promise().query(
      'SELECT id, username, email, role, created_at, (SELECT MAX(login_time) FROM user_logins WHERE user_id = users.id) as last_login FROM users'
    );
    console.log('Query successful, found', rows.length, 'users');

    const formattedUsers = rows.map(user => ({
      id: user.id,
      name: user.username,
      email: user.email,
      role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
      status: 'Active',
      lastLogin: user.last_login ? new Date(user.last_login).toISOString().split('T')[0] : 'Never'
    }));

    console.log('Sending response with formatted users');
    res.json(formattedUsers);
  } catch (error) {
    console.error('Error in /api/users endpoint:', error);
    res.status(500).json({ 
      message: 'Server error occurred while fetching users',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const deleteUser = async (req, res) => {
  console.log('Received delete request for user:', req.params.id);
  
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Only administrators can delete users' });
    }

    const userId = req.params.id;
    const [result] = await db.promise().query(
      'DELETE FROM users WHERE id = ?',
      [userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error occurred while deleting user' });
  }
};

module.exports = {
  getAllUsers,
  deleteUser
}; 