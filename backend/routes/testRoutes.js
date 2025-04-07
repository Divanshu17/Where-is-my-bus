const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/db-status', (req, res) => {
  const state = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({
    state: states[state],
    dbName: mongoose.connection.name,
    host: mongoose.connection.host,
    isConnected: state === 1
  });
});

module.exports = router; 