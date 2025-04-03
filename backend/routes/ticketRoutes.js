const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Make sure the controller function exists before using it
router.post('/book', ticketController.bookTicket);

module.exports = router; 