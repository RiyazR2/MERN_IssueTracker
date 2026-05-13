const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
const googleCallback = async (req, res) => {
  try {
    // User is attached by passport
    const user = req.user;

    // Generate JWT token
    const token = generateToken(user._id);

    // Redirect to frontend with token
    const clientURL = process.env.NODE_ENV === 'production'
      ? process.env.CLIENT_URL || 'https://mern-issue-tracker-app.vercel.app'
      : process.env.CLIENT_URL || 'http://localhost:5173';

    // Redirect with token in URL (frontend will store it)
    res.redirect(`${clientURL}/auth/callback?token=${token}`);
  } catch (error) {
    console.error('Google callback error:', error);
    res.redirect(`${process.env.CLIENT_URL}/login?error=authentication_failed`);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-__v');

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user data',
      error: error.message,
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

module.exports = {
  googleCallback,
  getMe,
  logout,
};
