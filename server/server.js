const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sendTicketEmail } = require('./emailService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Increased limit for PDF attachments

// Routes
app.post('/api/send-ticket', async (req, res) => {
  try {


    // require("regenerator-runtime/runtime");
    const { ticketData, pdfBase64 } = req.body;
    
    if (!ticketData || !pdfBase64) {
      return res.status(400).json({ error: 'Missing required data' });
    }
    
    const result = await sendTicketEmail(ticketData, pdfBase64);
    
    // Check if this is a test mode response
    if (result.TestMode) {
      console.log('Email sent in test mode due to domain restrictions');
      
      // Still return a success response to the client
      return res.status(200).json({ 
        success: true, 
        message: 'Email simulated successfully (Test Mode)',
        data: result,
        note: 'Your Postmark account is pending approval. In production, the email would be sent to the recipient.'
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      data: result
    });
  } catch (error) {
    console.error('Error sending ticket email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Email server ready at http://localhost:${process.env.PORT}`);
  console.log('Note: During Postmark account approval, emails will be simulated for unauthorized domains');
}); 
