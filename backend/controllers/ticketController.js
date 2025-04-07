const BusSeats = require('../models/BusSeats');
const Ticket = require('../models/Ticket'); // You'll need to create this model

// Export the functions properly
exports.bookTicket = async (req, res) => {
  try {
    const { routeId, passengerName, passengerEmail, source, destination, fare } = req.body;

    console.log("Received booking request:", {
      routeId, passengerName, passengerEmail, source, destination, fare
    });

    // Validate routeId
    if (!routeId) {
      console.error("Missing routeId in booking request");
      return res.status(400).json({ message: 'Route ID is required' });
    }

    // Check seat availability first
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    console.log(`Looking for seat info for routeId: ${routeId}, date: ${today}`);
    let seatInfo = await BusSeats.findOne({ routeId, date: today });

    if (!seatInfo) {
      console.log(`No seat info found for routeId: ${routeId}, creating new entry`);
      seatInfo = new BusSeats({
        routeId,
        date: today,
        totalSeats: 42,
        occupiedSeats: 0
      });
      console.log(`Created new seat info: ${JSON.stringify(seatInfo)}`);
    } else {
      console.log(`Found existing seat info for routeId: ${routeId}:`, seatInfo);
    }

    // Check if seats are available
    if (seatInfo.occupiedSeats >= seatInfo.totalSeats) {
      console.log("No seats available");
      return res.status(400).json({ message: 'No seats available' });
    }

    // Create new ticket
    const ticket = new Ticket({
      routeId,
      passengerName,
      passengerEmail,
      source,
      destination,
      fare,
      bookingDate: new Date(),
      status: 'Confirmed'
    });

    const savedTicket = await ticket.save();
    console.log("Ticket saved:", savedTicket._id);

    // Update seat count
    seatInfo.occupiedSeats += 1;
    await seatInfo.save();
    console.log(`Updated seat count for routeId: ${routeId} to ${seatInfo.occupiedSeats}`);

    // Double-check that the update was saved
    const updatedSeatInfo = await BusSeats.findOne({ routeId, date: today });
    console.log(`Verified seat info after update for routeId: ${routeId}:`, updatedSeatInfo);

    res.status(201).json({
      message: 'Ticket booked successfully',
      ticket: savedTicket,
      seatsRemaining: seatInfo.totalSeats - seatInfo.occupiedSeats
    });

  } catch (error) {
    console.error('Ticket booking error:', error);
    res.status(500).json({ message: 'Error booking ticket', error: error.message });
  }
};