const mongoose = require('mongoose');
const BusSeats = require('./models/BusSeats');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB Atlas');
    
    try {
      // Get today's date with time set to midnight
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Check seat availability for all routes
      console.log('Checking seat availability for all routes...');
      
      // Define routes to check
      const routeIds = ['1', '2', '3', '4', '5'];
      
      for (const routeId of routeIds) {
        // Find seat info for this route
        const seatInfo = await BusSeats.findOne({ routeId, date: today });
        
        if (seatInfo) {
          console.log(`Route ${routeId}: Total seats: ${seatInfo.totalSeats}, Occupied seats: ${seatInfo.occupiedSeats}`);
        } else {
          console.log(`Route ${routeId}: No seat information found`);
        }
      }
      
      // Create test data for a route that doesn't have seat info
      const testRouteId = '3'; // Change this to a route that doesn't have seat info
      const existingSeatInfo = await BusSeats.findOne({ routeId: testRouteId, date: today });
      
      if (!existingSeatInfo) {
        console.log(`Creating test seat info for route ${testRouteId}...`);
        
        const newSeatInfo = new BusSeats({
          routeId: testRouteId,
          date: today,
          totalSeats: 42,
          occupiedSeats: 5 // Set some initial occupied seats
        });
        
        await newSeatInfo.save();
        console.log(`Created seat info for route ${testRouteId}: Total seats: ${newSeatInfo.totalSeats}, Occupied seats: ${newSeatInfo.occupiedSeats}`);
      } else {
        console.log(`Route ${testRouteId} already has seat info: Total seats: ${existingSeatInfo.totalSeats}, Occupied seats: ${existingSeatInfo.occupiedSeats}`);
        
        // Update the occupied seats
        existingSeatInfo.occupiedSeats += 1;
        await existingSeatInfo.save();
        console.log(`Updated seat info for route ${testRouteId}: Total seats: ${existingSeatInfo.totalSeats}, Occupied seats: ${existingSeatInfo.occupiedSeats}`);
      }
      
      // Check all seat info again
      console.log('\nSeat availability after updates:');
      for (const routeId of routeIds) {
        const seatInfo = await BusSeats.findOne({ routeId, date: today });
        
        if (seatInfo) {
          console.log(`Route ${routeId}: Total seats: ${seatInfo.totalSeats}, Occupied seats: ${seatInfo.occupiedSeats}`);
        } else {
          console.log(`Route ${routeId}: No seat information found`);
        }
      }
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // Close the connection
      mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    }
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });
