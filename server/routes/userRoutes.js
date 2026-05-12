const express = require('express');
const { getUsers } = require('../controllers/userController');

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users
// @access  Public
router.get('/', getUsers);

module.exports = router;
