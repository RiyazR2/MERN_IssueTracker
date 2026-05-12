const Issue = require('../models/Issue');

// @desc    Get all issues
// @route   GET /api/issues
// @access  Public
const getIssues = async (req, res) => {
  try {
    const { status, assignedTo, page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;

    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (assignedTo) filter.assignedTo = assignedTo;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build sort
    const sort = {};
    sort[sortBy] = order === 'desc' ? -1 : 1;

    // Execute query
    const issues = await Issue.find(filter)
      .populate('assignedTo', 'name email image')
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    // Get total count
    const total = await Issue.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: issues.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: issues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching issues',
      error: error.message,
    });
  }
};

// @desc    Get single issue
// @route   GET /api/issues/:id
// @access  Public
const getIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id).populate('assignedTo', 'name email image');

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found',
      });
    }

    res.status(200).json({
      success: true,
      data: issue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching issue',
      error: error.message,
    });
  }
};

// @desc    Create new issue
// @route   POST /api/issues
// @access  Private
const createIssue = async (req, res) => {
  try {
    const { title, description, status, assignedTo } = req.body;

    const issue = await Issue.create({
      title,
      description,
      status: status || 'OPEN',
      assignedTo: assignedTo || null,
    });

    res.status(201).json({
      success: true,
      data: issue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating issue',
      error: error.message,
    });
  }
};

// @desc    Update issue
// @route   PATCH /api/issues/:id
// @access  Private
const updateIssue = async (req, res) => {
  try {
    const { title, description, status, assignedTo } = req.body;

    let issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found',
      });
    }

    // Update fields
    if (title !== undefined) issue.title = title;
    if (description !== undefined) issue.description = description;
    if (status !== undefined) issue.status = status;
    if (assignedTo !== undefined) issue.assignedTo = assignedTo || null;

    await issue.save();

    // Populate assignedTo
    issue = await Issue.findById(issue._id).populate('assignedTo', 'name email image');

    res.status(200).json({
      success: true,
      data: issue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating issue',
      error: error.message,
    });
  }
};

// @desc    Delete issue
// @route   DELETE /api/issues/:id
// @access  Private
const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found',
      });
    }

    await issue.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Issue deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting issue',
      error: error.message,
    });
  }
};

module.exports = {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
};
