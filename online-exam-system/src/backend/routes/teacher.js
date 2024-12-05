const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware to check if user is teacher
const isTeacher = (req, res, next) => {
    if (req.user.role !== 'teacher') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

// Get teacher's dashboard data
router.get('/dashboard', isTeacher, async (req, res) => {
    try {
        // For now, just return basic info. You can expand this later with exams, students, etc.
        const students = await User.getAllByRole('student');
        res.json({
            teacherId: req.user.id,
            totalStudents: students.length,
            // Add more dashboard data as needed
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
