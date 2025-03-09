// Import the Postmark client
const postmark = require("postmark");
import regeneratorRuntime from "regenerator-runtime";
// Create a client instance with your server token




const client = new postmark.ServerClient("c8aafc17-bb9d-49bb-8d24-d7b1220a26d6");

// List of authorized test email domains during account approval period
// You can add your own domain here if you have one
const AUTHORIZED_DOMAINS = ['postmarkapp.com', 'example.com', 'jklu.edu.in'];

/**
 * Send a ticket email with PDF attachment
 * @param {Object} ticketData - The ticket data
 * @param {String} pdfBase64 - Base64 encoded PDF content
 * @returns {Promise} - Promise resolving to the API response
 */
async function sendTicketEmail(ticketData, pdfBase64) {
  try {
    // Check if recipient email is from an authorized domain
    const recipientDomain = ticketData.passengerEmail.split('@')[1];
    const isAuthorizedDomain = AUTHORIZED_DOMAINS.includes(recipientDomain);
    
    // If not authorized, use test mode
    if (!isAuthorizedDomain) {
      console.log(`Email domain ${recipientDomain} is not authorized during account approval period.`);
      console.log(`Using test mode for email to ${ticketData.passengerEmail}`);
      
      // Log what would have been sent
      console.log("Email would have been sent with the following details:");
      console.log(`- To: ${ticketData.passengerEmail}`);
      console.log(`- Subject: Your Bus Ticket: ${ticketData.busNumber} - ${ticketData.source} to ${ticketData.destination}`);
      console.log("- PDF Attachment: Included");
      
      // Return a simulated successful response
      return {
        To: ticketData.passengerEmail,
        SubmittedAt: new Date().toISOString(),
        MessageID: `test-${Date.now()}`,
        ErrorCode: 0,
        Message: "OK (Test Mode - Email not actually sent)",
        TestMode: true
      };
    }
    
    // For authorized domains, proceed with actual sending
    const response = await client.sendEmail({
      "From": "onboarding@postmarkapp.com", // Using Postmark's default sender
      "To": ticketData.passengerEmail,
      "Subject": `Your Bus Ticket: ${ticketData.busNumber} - ${ticketData.source} to ${ticketData.destination}`,
      "HtmlBody": generateHtmlEmail(ticketData),
      "TextBody": generateTextEmail(ticketData),
      "Attachments": [
        {
          "Name": `bus_ticket_${ticketData.ticketId}.pdf`,
          "Content": pdfBase64,
          "ContentType": "application/pdf"
        }
      ],
      "MessageStream": "notification_ticket"
    });
    
    console.log("Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    
    // If the error is related to unauthorized recipients, provide a more helpful message
    if (error.message && error.message.includes("domain")) {
      console.log("This appears to be a domain restriction issue during account approval.");
      console.log("Returning simulated success response instead.");
      
      return {
        To: ticketData.passengerEmail,
        SubmittedAt: new Date().toISOString(),
        MessageID: `test-${Date.now()}`,
        ErrorCode: 0,
        Message: "OK (Test Mode - Email not actually sent due to domain restrictions)",
        TestMode: true
      };
    }
    
    throw error;
  }
}

/**
 * Generate HTML email content
 * @param {Object} ticket - The ticket data
 * @returns {String} - HTML email content
 */
function generateHtmlEmail(ticket) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #3b82f6; margin-bottom: 10px;">Your Bus Ticket is Confirmed!</h1>
        <p style="color: #4b5563; font-size: 16px;">Thank you for booking with BusTracker</p>
      </div>
      
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 15px;">Ticket Details</h2>
        <p style="margin: 5px 0;"><strong>Ticket ID:</strong> ${ticket.ticketId}</p>
        <p style="margin: 5px 0;"><strong>Bus Number:</strong> ${ticket.busNumber}</p>
        <p style="margin: 5px 0;"><strong>Route:</strong> ${ticket.route}</p>
        <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(ticket.departureDate).toLocaleDateString()}</p>
        <p style="margin: 5px 0;"><strong>Departure Time:</strong> ${ticket.departureTime}</p>
        <p style="margin: 5px 0;"><strong>Seat Number:</strong> ${ticket.seatNumber}</p>
        <p style="margin: 5px 0;"><strong>Amount Paid:</strong> ${ticket.fare}</p>
      </div>
      
      <div style="background-color: #eff6ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 15px;">Passenger Information</h2>
        <p style="margin: 5px 0;"><strong>Name:</strong> ${ticket.passengerName}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> ${ticket.passengerEmail}</p>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="color: #6b7280; font-size: 14px;">Your PDF ticket is attached to this email.</p>
        <p style="color: #6b7280; font-size: 14px;">Please show this ticket during your journey.</p>
        <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">Have a safe journey!</p>
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <p style="color: #9ca3af; font-size: 12px;">© 2023 BusTracker. All rights reserved.</p>
      </div>
    </div>
  `;
}

/**
 * Generate plain text email content
 * @param {Object} ticket - The ticket data
 * @returns {String} - Plain text email content
 */
function generateTextEmail(ticket) {
  return `
    Your Bus Ticket is Confirmed!
    Thank you for booking with BusTracker
    
    Ticket Details:
    Ticket ID: ${ticket.ticketId}
    Bus Number: ${ticket.busNumber}
    Route: ${ticket.route}
    Date: ${new Date(ticket.departureDate).toLocaleDateString()}
    Departure Time: ${ticket.departureTime}
    Seat Number: ${ticket.seatNumber}
    Amount Paid: ${ticket.fare}
    
    Passenger Information:
    Name: ${ticket.passengerName}
    Email: ${ticket.passengerEmail}
    
    Your PDF ticket is attached to this email.
    Please show this ticket during your journey.
    
    Have a safe journey!
    
    © 2023 BusTracker. All rights reserved.
  `;
}

module.exports = {
  sendTicketEmail
}; 