const express = require('express');
const router = express.Router();
const BusSeats = require('../models/BusSeats');

// Get seat availability for a route
router.get('/:routeId', async (req, res) => {
  try {
    const routeId = req.params.routeId;
    console.log(`Received seat availability request for routeId: ${routeId}`);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log(`Looking for seat info with date: ${today}`);

    const seatInfo = await BusSeats.findOne({
      routeId: routeId,
      date: today
    });

    if (!seatInfo) {
      console.log(`No seat info found for routeId: ${routeId}, returning default values`);
      return res.json({
        totalSeats: 42,
        occupiedSeats: 0
      });
    }

    console.log(`Found seat info for routeId: ${routeId}:`, seatInfo);
    res.json({
      totalSeats: seatInfo.totalSeats,
      occupiedSeats: seatInfo.occupiedSeats
    });
  } catch (error) {
    console.error(`Error getting seat availability for routeId: ${req.params.routeId}:`, error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;