const express = require('express');
const {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
} = require('../controllers/issueController');
const { protect } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const {
  validateIssue,
  validateUpdateIssue,
  validateId,
  validateQuery,
} = require('../utils/validators');

const router = express.Router();

// @route   GET /api/issues
// @desc    Get all issues
// @access  Public
router.get('/', validateQuery, validate, getIssues);

// @route   POST /api/issues
// @desc    Create new issue
// @access  Private
router.post('/', protect, validateIssue, validate, createIssue);

// @route   GET /api/issues/:id
// @desc    Get single issue
// @access  Public
router.get('/:id', validateId, validate, getIssue);

// @route   PATCH /api/issues/:id
// @desc    Update issue
// @access  Private
router.patch('/:id', protect, validateId, validateUpdateIssue, validate, updateIssue);

// @route   DELETE /api/issues/:id
// @desc    Delete issue
// @access  Private
router.delete('/:id', protect, validateId, validate, deleteIssue);

module.exports = router;
