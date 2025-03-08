import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import {
  ArrowLeft,
  Bus,
  Calendar,
  Clock,
  MapPin,
  Download,
  Share2,
  QrCode,
  Search,
  Filter,
  Ticket,
  X,
  ChevronRight,
} from "lucide-react";

const TicketsPage = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all"); // all, upcoming, past
  const [showFilter, setShowFilter] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load tickets from localStorage
  useEffect(() => {
    setIsLoading(true);
    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];

    // Sort tickets by date (newest first)
    const sortedTickets = storedTickets.sort((a, b) => {
      return new Date(b.bookingDate) - new Date(a.bookingDate);
    });

    setTickets(sortedTickets);
    setFilteredTickets(sortedTickets);
    setIsLoading(false);
  }, []);

  // Filter tickets based on search query and filter type
  useEffect(() => {
    let result = tickets;

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (ticket) =>
          ticket.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.destination.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply type filter
    const now = new Date();
    if (filterType === "upcoming") {
      result = result.filter((ticket) => new Date(ticket.departureDate) > now);
    } else if (filterType === "past") {
      result = result.filter((ticket) => new Date(ticket.departureDate) < now);
    }

    setFilteredTickets(result);
  }, [searchQuery, filterType, tickets]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    setShowFilter(false);
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const closeTicketDetails = () => {
    setSelectedTicket(null);
  };

  const downloadTicket = (ticket) => {
    // Create a new PDF document
    const doc = new jsPDF();

    // Set document properties
    doc.setProperties({
      title: `Bus Ticket - ${ticket.ticketId}`,
      subject: `Bus Ticket from ${ticket.source} to ${ticket.destination}`,
      author: "BusTracker App",
      keywords: "bus, ticket, travel",
      creator: "BusTracker App",
    });

    // Define colors
    const primaryColor = [59, 130, 246]; // Blue
    const secondaryColor = [55, 65, 81]; // Gray
    const accentColor = [245, 158, 11]; // Amber

    // Add background pattern
    doc.setDrawColor(240, 240, 240);
    doc.setFillColor(250, 250, 250);
    for (let i = 0; i < 21; i++) {
      for (let j = 0; j < 30; j++) {
        if ((i + j) % 2 === 0) {
          doc.rect(i * 10, j * 10, 10, 10, "F");
        }
      }
    }

    // Add header with logo background
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 40, "F");

    // Add ticket title
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("BUS TICKET", 105, 20, { align: "center" });

    // Add ticket subtitle
    doc.setFontSize(12);
    doc.text("Your journey is confirmed", 105, 30, { align: "center" });

    // Add ticket status banner
    doc.setFillColor(39, 174, 96); // Green for confirmed
    doc.rect(0, 40, 210, 12, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(
      `STATUS: ${ticket.status.toUpperCase()} • TICKET ID: ${ticket.ticketId}`,
      105,
      47,
      { align: "center" }
    );

    // Add QR code placeholder (in a real app, generate an actual QR code)
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(145, 60, 50, 50, 3, 3, "F");
    doc.setDrawColor(220, 220, 220);
    doc.roundedRect(145, 60, 50, 50, 3, 3, "S");
    doc.addImage(qrCodeDataUrl, 145, 60, 50, 50);

    // Add journey details section
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(15, 60, 120, 50, 3, 3, "F");

    // Journey details title
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(0.5);
    doc.line(15, 70, 135, 70);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(12);
    doc.text("JOURNEY DETAILS", 20, 67);

    // Journey details content
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setFontSize(10);
    doc.text("Bus Number:", 20, 80);
    doc.text("Route:", 20, 88);
    doc.text("Date:", 20, 96);
    doc.text("Departure:", 20, 104);

    doc.setFont("helvetica", "bold");
    doc.text(ticket.busNumber, 60, 80);
    doc.text(ticket.route, 60, 88);
    doc.text(new Date(ticket.departureDate).toLocaleDateString(), 60, 96);
    doc.text(ticket.departureTime, 60, 104);

    // Add passenger details section
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(15, 120, 180, 40, 3, 3, "F");

    // Passenger details title
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.line(15, 130, 195, 130);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(12);
    doc.text("PASSENGER DETAILS", 20, 127);

    // Passenger details content
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setFontSize(10);
    doc.text("Name:", 20, 140);
    doc.text("Email:", 20, 148);
    doc.text("Seat:", 120, 140);
    doc.text("Fare:", 120, 148);

    doc.setFont("helvetica", "bold");
    doc.text(ticket.passengerName, 60, 140);
    doc.text(ticket.passengerEmail, 60, 148);
    doc.text(ticket.seatNumber, 160, 140);
    doc.text(ticket.fare, 160, 148);

    // Add payment details section
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(15, 170, 180, 40, 3, 3, "F");

    // Payment details title
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.line(15, 180, 195, 180);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(12);
    doc.text("PAYMENT DETAILS", 20, 177);

    // Payment details content
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setFontSize(10);
    doc.text("Payment Method:", 20, 190);
    doc.text("Transaction ID:", 20, 198);
    doc.text("Booking Date:", 120, 190);

    doc.setFont("helvetica", "bold");
    doc.text(ticket.paymentMethod, 80, 190);
    doc.text(ticket.transactionId, 80, 198);
    doc.text(new Date(ticket.bookingDate).toLocaleString(), 170, 190, {
      align: "right",
    });

    // Add footer
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(1);
    doc.line(15, 220, 195, 220);

    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(
      "This is an electronic ticket. Please show this ticket during your journey.",
      105,
      230,
      { align: "center" }
    );
    doc.text(
      "For any assistance, contact our helpline: +91 9876543210",
      105,
      238,
      { align: "center" }
    );

    // Add barcode at the bottom
    doc.setFillColor(0, 0, 0);
    const barcodeY = 250;
    for (let i = 0; i < 50; i++) {
      const barWidth = Math.random() * 3 + 1;
      const barHeight = 10;
      const barX = 40 + i * 3;
      if (i % 3 !== 0) {
        doc.rect(barX, barcodeY, barWidth, barHeight, "F");
      }
    }
    doc.setFontSize(8);
    doc.text(ticket.ticketId, 105, 268, { align: "center" });

    // Add corner decorations
    doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.setLineWidth(1);
    // Top left
    doc.line(10, 10, 20, 10);
    doc.line(10, 10, 10, 20);
    // Top right
    doc.line(190, 10, 200, 10);
    doc.line(200, 10, 200, 20);
    // Bottom left
    doc.line(10, 280, 20, 280);
    doc.line(10, 270, 10, 280);
    // Bottom right
    doc.line(190, 280, 200, 280);
    doc.line(200, 270, 200, 280);

    // Save the PDF
    doc.save(`bus_ticket_${ticket.ticketId}.pdf`);
  };

  const shareTicket = (ticket) => {
    // In a real app, this would open a share dialog
    if (navigator.share) {
      navigator.share({
        title: `Bus Ticket ${ticket.busNumber}`,
        text: `My bus ticket from ${ticket.source} to ${ticket.destination} on ${ticket.departureDate}`,
        url: window.location.href,
      });
    } else {
      alert(`Sharing ticket ${ticket.ticketId}`);
    }
  };

  // Sample QR code data URL (in a real app, this would be generated dynamically)
  const qrCodeDataUrl =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAACkCAYAAAAZtYVBAAAAAklEQVR4AewaftIAAAYcSURBVO3BQY4cSRLAQDLQ//8yV0c/JZCoain6zYjdYYnFQyxeYvEQi4dYPMTiIRYPsXiIxUMsHmLxEIuHWDzE4iEWD7F4iMVDLB5i8RCLD3xUyW9SMqXkRslUyW9S8omLh1g8xOIhFg98TMlNSm5UMim5UclNSm5S8omLh1g8xOIhFg/8ZUpuU3KjklnJjZIbJVMlk5KblPxlLh5i8RCLh1h88MuUfELJVMlUyaRkqmSq5BNK/mUuHmLxEIuHWHzwy5X8JiVTJVMlUyVTJVMlv8nFQyweYvEQiw9+mZLfpGSqZFIyVTIpmSqZlEyVTEr+ZS4eYvEQi4dYfOBjSv5LSqZKJiVTJVMlUyWTkqmSScmk5L/k4iEWD7F4iMUHPqbkL1MyVTIpmZRMlUxKpkqmSiYlUyWTkknJTUr+SxcPsXiIxUMsPvBRJTcpuVHJVMlUyaRkUjJVMimZKpmUTEpuUjJVMimZlNyk5BMuHmLxEIuHWOywxP/E4iEWD7F4iMUHPqrkRslUyaRkqmRSMlUyKZmUTJVMSqZKblIyKZmUTEqmSiYlUyWTkknJVMlNLh5i8RCLh1h84KNKblIyKZmUTJVMSiYlUyWTkknJpGRSMimZlExKpkpuUjJVMimZlExKpkpucvEQi4dYPMTiAx9TMlUyKZmUTJVMSiYlUyWTkknJpGSqZFIyKZmUTEomJVMlk5KpkknJpGSqZFIyKfnExUMsHmLxEIsPfFTJpGRSMimZKpmUTEomJZOSqZJJyaRkUjIpmZRMSiYlUyWTkknJpGRSMimZlExKJiWTkptcPMTiIRYPsfjAx5RMlUxKJiWTkknJpGSqZFIyKZmUTEomJZOSqZJJyaRkUjIpmZRMSiYlk5KpkknJpGRSMim5ycVDLB5i8RCLD3xUyaRkUjIpmZRMSiYlk5JJyaRkUjIpmZRMSiYlk5JJyaRkUjIpmZRMSiYlk5JJyaRkUjIpmZR84uIhFg+xeIjFBz6mZFIyKZmUTEomJZOSScmkZFIyKZmUTEomJZOSScmkZFIyKZmUTEomJZOSScmkZFIyKZmUTEpucvEQi4dYPMTiAx9TMimZlExKJiWTkknJpGRSMimZlExKJiWTkknJpGRSMimZlExKJiWTkknJpGRSMimZlExKJiWTkk9cPMTiIRYPsdjhf+biIRYPsXiIxUMsHmLxEIuHWDzE4iEWD7F4iMVDLB5i8RCLh1g8xOIhFg+xeIjFQ/wfCMNGgaseJSIAAAAASUVORK5CYII=";

  // Sample ticket data (in a real app, this would come from an API or localStorage)
  useEffect(() => {
    if (tickets.length === 0 && !isLoading) {
      // Add sample tickets if none exist
      const sampleTickets = [
        {
          ticketId: "TKT" + Math.floor(Math.random() * 1000000),
          busNumber: "RT-101",
          route: "JKLU → Mansarover",
          source: "JKLU",
          destination: "Mansarover",
          departureDate: new Date(Date.now() + 86400000).toISOString(), // tomorrow
          departureTime: "10:15 AM",
          arrivalTime: "11:00 AM",
          seatNumber: "A12",
          fare: "₹60",
          passengerName: "John Doe",
          passengerEmail: "john.doe@example.com",
          bookingDate: new Date().toISOString(),
          status: "Confirmed",
          paymentMethod: "Card",
          transactionId: "TXN" + Math.floor(Math.random() * 1000000),
        },
        {
          ticketId: "TKT" + Math.floor(Math.random() * 1000000),
          busNumber: "RT-205",
          route: "JKLU → City Palace",
          source: "JKLU",
          destination: "City Palace",
          departureDate: new Date(Date.now() - 86400000).toISOString(), // yesterday
          departureTime: "09:30 AM",
          arrivalTime: "10:15 AM",
          seatNumber: "B08",
          fare: "₹45",
          passengerName: "John Doe",
          passengerEmail: "john.doe@example.com",
          bookingDate: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          status: "Completed",
          paymentMethod: "UPI",
          transactionId: "TXN" + Math.floor(Math.random() * 1000000),
        },
      ];

      setTickets(sampleTickets);
      setFilteredTickets(sampleTickets);
      localStorage.setItem("tickets", JSON.stringify(sampleTickets));
    }
  }, [tickets, isLoading]);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Check if ticket is upcoming or past
  const isUpcoming = (dateString) => {
    return new Date(dateString) > new Date();
  };

  return (
    <div className="min-h-screen bg-[#f5f0e5] p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm mr-4"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">My Tickets</h1>
      </div>

      {/* Search and Filter */}
      <div className="mb-4 relative">
        <div className="flex items-center">
          <div className="relative flex-1">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search tickets..."
              className="w-full pl-10 pr-4 py-3 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="ml-2 p-3 bg-white rounded-lg shadow-sm"
          >
            <Filter className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* Filter dropdown */}
        {showFilter && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 overflow-hidden">
            <button
              onClick={() => handleFilterChange("all")}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                filterType === "all" ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              All Tickets
            </button>
            <button
              onClick={() => handleFilterChange("upcoming")}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                filterType === "upcoming" ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => handleFilterChange("past")}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                filterType === "past" ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              Past
            </button>
          </div>
        )}
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <motion.div
              key={ticket.ticketId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              onClick={() => handleTicketClick(ticket)}
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center">
                      <Bus className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="font-semibold text-gray-900">
                        {ticket.busNumber}
                      </span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-600">
                        {ticket.route}
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        {formatDate(ticket.departureDate)}
                      </span>
                      <span className="mx-2 text-gray-300">•</span>
                      <Clock className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm text-gray-600">
                        {ticket.departureTime}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isUpcoming(ticket.departureDate)
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {isUpcoming(ticket.departureDate) ? "Upcoming" : "Past"}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">
                      {ticket.source} → {ticket.destination}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Ticket className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="text-sm font-medium text-blue-600">
                      {ticket.fare}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-2 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Ticket ID: {ticket.ticketId}
                </span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </motion.div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Ticket className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No tickets found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery
                ? "Try adjusting your search criteria"
                : "You haven't booked any tickets yet"}
            </p>
            <button
              onClick={() => navigate("/routes")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
            >
              Book a Ticket
            </button>
          </div>
        )}
      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative p-6">
              <button
                onClick={closeTicketDetails}
                className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>

              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Ticket Details
              </h2>

              <div className="mb-6">
                <div className="flex justify-center mb-4">
                  <img
                    src={qrCodeDataUrl}
                    alt="Ticket QR Code"
                    className="w-40 h-40"
                  />
                </div>
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-500">Ticket ID</p>
                  <p className="font-medium text-gray-900">
                    {selectedTicket.ticketId}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="text-sm text-gray-500">Bus</p>
                    <p className="font-medium text-gray-900">
                      {selectedTicket.busNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Seat</p>
                    <p className="font-medium text-gray-900">
                      {selectedTicket.seatNumber}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(selectedTicket.departureDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium text-gray-900">
                      {selectedTicket.departureTime}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Route</p>
                  <p className="font-medium text-gray-900">
                    {selectedTicket.route}
                  </p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="font-medium text-gray-900">
                      {selectedTicket.source}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">To</p>
                    <p className="font-medium text-gray-900">
                      {selectedTicket.destination}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Departure</p>
                    <p className="font-medium text-gray-900">
                      {selectedTicket.departureTime}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Arrival</p>
                    <p className="font-medium text-gray-900">
                      {selectedTicket.arrivalTime}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Passenger</p>
                  <p className="font-medium text-gray-900">
                    {selectedTicket.passengerName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">
                    {selectedTicket.passengerEmail}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-500">Fare</p>
                  <p className="font-medium text-gray-900">
                    {selectedTicket.fare}
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium text-gray-900">
                    {selectedTicket.paymentMethod}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <p className="font-medium text-gray-900">
                    {selectedTicket.transactionId}
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => downloadTicket(selectedTicket)}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
                <button
                  onClick={() => shareTicket(selectedTicket)}
                  className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium flex items-center justify-center"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TicketsPage;
