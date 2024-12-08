const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

// Secure JWT secret (in production, this should be in environment variables)
const JWT_SECRET = 'exam_system_secure_jwt_secret_key_2024';

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '3Quetras',
  database: 'exam_system'
});

// Database connection check
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all users (protected route, only for admin)
app.get('/api/users', verifyToken, async (req, res) => {
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

    // Format the response to match the frontend expectations
    const formattedUsers = rows.map(user => ({
      id: user.id,
      name: user.username,
      email: user.email,
      role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
      status: 'Active', // You might want to add a status field to your database
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
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Get user from database
    const [rows] = await db.promise().query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token with new secret
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      role: user.role,
      username: user.username
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if username already exists
    const [existing] = await db.promise().query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    await db.promise().query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, role]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));