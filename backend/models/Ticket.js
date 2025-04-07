const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  routeId: {
    type: String,
    required: true
  },
  passengerName: {
    type: String,
    required: true
  },
  passengerEmail: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  fare: {
    type: String,
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Cancelled'],
    default: 'Confirmed'
  }
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket; 