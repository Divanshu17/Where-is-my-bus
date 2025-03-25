const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/users/signup
// @access  Public
exports.signup = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber } = req.body;
    console.log('Signup attempt:', { fullName, email, phoneNumber });

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      fullName,
      email,
      password,
      phoneNumber
    });

    if (user) {
      console.log('User created successfully:', user._id);
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profileImage: user.profileImage,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    console.error('Signup error details:', error);
    if (error.name === 'ValidationError') {
      // Handle mongoose validation errors
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: messages 
      });
    }
    if (error.code === 11000) {
      // Handle duplicate key error (usually email)
      return res.status(400).json({ 
        message: 'Email is already registered' 
      });
    }
    res.status(500).json({ 
      message: 'Error creating user',
      error: error.message 
    });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email }); // Don't log passwords

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // If everything is valid, send the response
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profileImage: user.profileImage,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Error logging in',
      error: error.message 
    });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profileImage: user.profileImage
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      message: 'Error retrieving user profile',
      error: error.message 
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user) {
      user.fullName = req.body.fullName || user.fullName;
      user.email = req.body.email || user.email;
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
      
      // Only update password if provided
      if (req.body.password) {
        user.password = req.body.password;
      }
      
      // Update profile image if provided
      if (req.body.profileImage) {
        user.profileImage = req.body.profileImage;
      }
      
      const updatedUser = await user.save();
      
      res.json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        profileImage: updatedUser.profileImage,
        token: generateToken(updatedUser._id)
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      message: 'Error updating user profile',
      error: error.message 
    });
  }
}; 