const express = require('express');
const router = express.Router();
const { verifyToken } = require('../config/auth');
const { getAllUsers, deleteUser } = require('../controllers/userController');

router.get('/', verifyToken, getAllUsers);
router.delete('/:id', verifyToken, deleteUser);

module.exports = router; 