const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

// Get all teachers
router.get('/teachers', isAdmin, async (req, res) => {
    try {
        const teachers = await User.getAllByRole('teacher');
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all students
router.get('/students', isAdmin, async (req, res) => {
    try {
        const students = await User.getAllByRole('student');
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new user (teacher or student)
router.post('/users', isAdmin, async (req, res) => {
    try {
        const { username, password, email, role } = req.body;
        if (role !== 'teacher' && role !== 'student') {
            return res.status(400).json({ message: 'Invalid role' });
        }
        await User.create({ username, password, email, role });
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
