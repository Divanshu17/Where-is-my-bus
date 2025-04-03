const express = require('express');
const router = express.Router();
const BusSeats = require('../models/BusSeats');

// Get seat availability for a route
router.get('/:routeId', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const seatInfo = await BusSeats.findOne({
      routeId: req.params.routeId,
      date: today
    });

    if (!seatInfo) {
      return res.json({
        totalSeats: 42,
        occupiedSeats: 0
      });
    }

    res.json({
      totalSeats: seatInfo.totalSeats,
      occupiedSeats: seatInfo.occupiedSeats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 