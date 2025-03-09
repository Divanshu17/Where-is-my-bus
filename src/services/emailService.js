import emailjs from '@emailjs/browser';


// import dotenv from 'assert/strict'

// EmailJS configuration
const EMAILJS_PUBLIC_KEY = "gfrYAaSitUc7WKG8a";
const EMAILJS_PRIVATE_KEY = "tE6hf2Jp9TdIuSiJ5Aenj";
const EMAILJS_SERVICE_ID = "service_6g78jtk"; // Update this with your actual service ID
const EMAILJS_TEMPLATE_ID = "template_knsxh1p"; // Update this with your actual template ID

// Initialize EmailJS once
emailjs.init(EMAILJS_PUBLIC_KEY);

/**
 * Send a ticket confirmation email with PDF attachment
 * @param {Object} ticket - Ticket data
 * @param {string} [pdfBase64] - Base64 encoded PDF data (optional)
 * @returns {Promise} - Promise resolving to the API response
 */
export const sendTicketEmail = async (ticket, pdfBase64) => {
  try {
    // Check if required data is available
    if (!ticket || !ticket.passengerEmail) {
      throw new Error("Missing required ticket data");
    }
    
    // Prepare template parameters
    const templateParams = {
      to_email: ticket.passengerEmail,
      to_name: ticket.passengerName || 'Passenger',
      ticket_id: ticket.ticketId || 'N/A',
      bus_number: ticket.busNumber || 'N/A',
      route: ticket.route || 'N/A',
      source: ticket.source || 'N/A',
      destination: ticket.destination || 'N/A',
      departure_date: ticket.departureDate ? new Date(ticket.departureDate).toLocaleDateString() : 'N/A',
      departure_time: ticket.departureTime || 'N/A',
      arrival_time: ticket.arrivalTime || 'N/A',
      seat_number: ticket.seatNumber || 'N/A',
      fare: ticket.fare || 'N/A',
      booking_date: ticket.bookingDate ? new Date(ticket.bookingDate).toLocaleString() : 'N/A',
      payment_method: ticket.paymentMethod || 'N/A',
      transaction_id: ticket.transactionId || 'N/A',
      message: `Your ticket for bus ${ticket.busNumber || 'N/A'} has been confirmed. Please find the details in this email.`
    };
    
    // Add PDF attachment if provided and not too large

    
    if (pdfBase64 && typeof pdfBase64 === 'string' && pdfBase64.length > 0) {
      // EmailJS has a size limit, so we might need to trim it
      if (pdfBase64.length > 500000) {
        console.warn('PDF is too large for email attachment, it will be trimmed');
        templateParams.pdf_data = pdfBase64.substring(0, 500000);
      } else {
        templateParams.pdf_data = pdfBase64;
      }
    }
    
    console.log("Sending email to:", templateParams.to_email);
    
    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
    
    console.log('Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Provide more detailed error information
    if (error.text) {
      console.error('EmailJS error details:', error.text);
    }
    
    throw error;
  }
}; 