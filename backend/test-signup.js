const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Test user data
const testUser = {
  fullName: 'Test User',
  email: 'testuser' + Date.now() + '@example.com', // Unique email
  password: 'password123',
  phoneNumber: '1234567890'
};

console.log('Attempting to connect to MongoDB...');
console.log('MongoDB URI:', process.env.MONGODB_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB Atlas');
    
    try {
      console.log('Attempting to create user with data:', testUser);
      
      // Create user
      const user = new User(testUser);
      await user.save();
      
      console.log('Test user created successfully:');
      console.log('ID:', user._id);
      console.log('Name:', user.fullName);
      console.log('Email:', user.email);
      
      // List all users
      const users = await User.find({});
      console.log('\nAll users in database:', users.length);
      users.forEach((u, index) => {
        console.log(`${index + 1}. ${u.email} (${u.fullName})`);
      });
      
    } catch (error) {
      console.error('Error creating test user:', error);
    } finally {
      // Close connection
      mongoose.disconnect();
      console.log('MongoDB disconnected');
    }
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
