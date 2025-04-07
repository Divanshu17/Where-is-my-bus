const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Load environment variables
dotenv.config();

// Generate JWT Token (copied from userController.js)
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Test user data
const testUser = {
  fullName: 'API Test User',
  email: 'apitest' + Date.now() + '@example.com', // Unique email
  password: 'password123',
  phoneNumber: '9876543210'
};

console.log('Attempting to connect to MongoDB...');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB Atlas');
    
    try {
      console.log('Simulating signup API with data:', testUser);
      
      // Check if user already exists (copied from userController.js)
      const userExists = await User.findOne({ email: testUser.email });
      if (userExists) {
        console.log('User already exists:', testUser.email);
        mongoose.disconnect();
        return;
      }
      
      // Create new user (copied from userController.js)
      console.log('Creating user...');
      const user = await User.create({
        fullName: testUser.fullName,
        email: testUser.email,
        password: testUser.password,
        phoneNumber: testUser.phoneNumber
      });
      
      if (user) {
        console.log('User created successfully:', user._id);
        console.log('User details:', {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          token: generateToken(user._id)
        });
        
        // List all users
        const users = await User.find({});
        console.log('\nAll users in database:', users.length);
        users.forEach((u, index) => {
          console.log(`${index + 1}. ${u.email} (${u.fullName})`);
        });
      } else {
        console.log('User creation failed but no error was thrown');
      }
      
    } catch (error) {
      console.error('Signup error details:', error);
      
      if (error.name === 'ValidationError') {
        // Handle mongoose validation errors
        const messages = Object.values(error.errors).map(val => val.message);
        console.log('Validation error messages:', messages);
      }
      
      if (error.code === 11000) {
        // Handle duplicate key error (usually email)
        console.log('Duplicate key error (email already exists)');
      }
      
      console.error('Error stack:', error.stack);
    } finally {
      // Close connection
      mongoose.disconnect();
      console.log('MongoDB disconnected');
    }
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
