# EmailJS Setup Guide for Bus Ticket System

This guide will help you set up EmailJS to send ticket confirmation emails with PDF attachments.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for an account
2. Verify your email address

## Step 2: Connect an Email Service

1. In the EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose a service provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Name your service (e.g., "bus-ticket-service")
6. Note the Service ID for later use

## Step 3: Create an Email Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Design your template with the following variables:
   - `{{to_name}}` - Passenger name
   - `{{to_email}}` - Passenger email
   - `{{ticket_id}}` - Ticket ID
   - `{{bus_number}}` - Bus number
   - `{{route}}` - Route name
   - `{{source}}` - Source location
   - `{{destination}}` - Destination location
   - `{{departure_date}}` - Departure date
   - `{{departure_time}}` - Departure time
   - `{{arrival_time}}` - Arrival time
   - `{{seat_number}}` - Seat number
   - `{{fare}}` - Ticket fare
   - `{{booking_date}}` - Booking date
   - `{{payment_method}}` - Payment method
   - `{{transaction_id}}` - Transaction ID

4. For the PDF attachment, you'll need to use the "File" content block and reference `{{pdf_attachment}}`
5. Save your template and note the Template ID

## Step 4: Update Configuration in Code

1. Open `src/services/emailService.js`
2. Update the following constants with your values:
   ```javascript
   const EMAILJS_SERVICE_ID = "your_service_id"; // From Step 2
   const EMAILJS_TEMPLATE_ID = "your_template_id"; // From Step 3
   ```

## Step 5: Test the Email Sending

1. Book a ticket in the application
2. Check your email to verify the ticket was received
3. Verify that the PDF attachment is included

## Troubleshooting

If you encounter issues:

1. Check the browser console for error messages
2. Verify your EmailJS account is active
3. Make sure your service is connected properly
4. Check that your template includes all the necessary variables
5. Verify that your public key is correct in the code

## Note on PDF Attachments

EmailJS has a size limit for attachments. If your PDF is too large, you may need to:

1. Reduce the quality of the PDF
2. Use a file hosting service and include a download link instead
3. Consider upgrading your EmailJS plan for larger attachment limits 