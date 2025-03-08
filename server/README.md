# BusTracker Email Server

This is a simple Express server that handles sending ticket emails using Postmark.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## API Endpoints

### Send Ticket Email
- **URL**: `/api/send-ticket`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "ticketData": {
      "ticketId": "TKT123456",
      "busNumber": "RT-101",
      "route": "JKLU → Mansarover",
      "source": "JKLU",
      "destination": "Mansarover",
      "departureDate": "2023-06-01T10:00:00.000Z",
      "departureTime": "10:15 AM",
      "arrivalTime": "11:00 AM",
      "seatNumber": "A12",
      "fare": "₹60",
      "passengerName": "John Doe",
      "passengerEmail": "john.doe@example.com"
    },
    "pdfBase64": "base64EncodedPdfContent"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Email sent successfully",
    "data": {
      "To": "john.doe@example.com",
      "SubmittedAt": "2023-06-01T10:30:00.000Z",
      "MessageID": "message-id-from-postmark",
      "ErrorCode": 0,
      "Message": "OK"
    }
  }
  ```

### Health Check
- **URL**: `/api/health`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "status": "ok",
    "message": "Server is running"
  }
  ```

## Configuration

The Postmark server token is configured in `emailService.js`. Make sure to update the sender email address to a verified sender in your Postmark account. 