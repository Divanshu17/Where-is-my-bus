const mongoose = require('mongoose');

const busSeatsSchema = new mongoose.Schema({
  routeId: {
    type: String,
    required: true
  },
  totalSeats: {
    type: Number,
    default: 42
  },
  occupiedSeats: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    required: true
  }
});

const BusSeats = mongoose.model('BusSeats', busSeatsSchema);
module.exports = BusSeats; 