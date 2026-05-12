const { body, param, query } = require('express-validator');

// Issue validation rules
const validateIssue = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 255 })
    .withMessage('Title cannot be more than 255 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),
  body('status')
    .optional()
    .isIn(['OPEN', 'IN_PROGRESS', 'CLOSED'])
    .withMessage('Invalid status value'),
  body('assignedTo')
    .optional()
    .isMongoId()
    .withMessage('Invalid user ID'),
];

// Update issue validation
const validateUpdateIssue = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 255 })
    .withMessage('Title cannot be more than 255 characters'),
  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Description cannot be empty'),
  body('status')
    .optional()
    .isIn(['OPEN', 'IN_PROGRESS', 'CLOSED'])
    .withMessage('Invalid status value'),
  body('assignedTo')
    .optional()
    .custom((value) => {
      if (value === null || value === '') return true;
      return /^[0-9a-fA-F]{24}$/.test(value);
    })
    .withMessage('Invalid user ID'),
];

// ID parameter validation
const validateId = [
  param('id').isMongoId().withMessage('Invalid ID format'),
];

// Query validation for filtering
const validateQuery = [
  query('status')
    .optional()
    .isIn(['OPEN', 'IN_PROGRESS', 'CLOSED'])
    .withMessage('Invalid status value'),
  query('assignedTo')
    .optional()
    .isMongoId()
    .withMessage('Invalid user ID'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];

module.exports = {
  validateIssue,
  validateUpdateIssue,
  validateId,
  validateQuery,
};
