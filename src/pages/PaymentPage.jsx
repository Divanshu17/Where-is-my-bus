import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  ArrowLeft,
  CreditCard,
  CheckCircle,
  Wallet,
  Banknote,
  Bus,
  MapPin,
  Clock,
  Calendar,
  ChevronDown,
  Shield,
  Mail,
  User,
  Download,
  X,
  AlertCircle,
} from "lucide-react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { sendTicketEmail } from "../services/emailService";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [selectedStop, setSelectedStop] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card"); // Default payment method
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showStopDropdown, setShowStopDropdown] = useState(false);
  const [passengerName, setPassengerName] = useState("");
  const [passengerEmail, setPassengerEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ticketData, setTicketData] = useState(null);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [showEmailToast, setShowEmailToast] = useState(false);
  const [emailSendError, setEmailSendError] = useState(null);
  const [autoSendEmail, setAutoSendEmail] = useState(true); // New state for auto-sending email

  // Get user data from localStorage if available
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setPassengerName(userData.fullName || "");
      setPassengerEmail(userData.email || "");
    }
  }, []);

  // Example ticket details
  const stops = [
    { name: "JKLU", fare: "₹10" },
    { name: "Bhakrota", fare: "₹15" },
    { name: "Keshopura", fare: "₹20" },
    { name: "Kamla Nehru Nagar", fare: "₹25" },
    { name: "Gajsinghpur", fare: "₹30" },
    { name: "RSEB Colony", fare: "₹35" },
    { name: "Vardhman Nagar", fare: "₹40" },
    { name: "200ft Bus Stand", fare: "₹45" },
    { name: "Element Mall", fare: "₹50" },
    { name: "Vidyut Nagar", fare: "₹55" },
    { name: "Mansarover", fare: "₹60" },
  ];

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle form submission
  const handlePayment = (e) => {
    e.preventDefault();

    // Validate email
    if (!validateEmail(passengerEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);

      // Create ticket data
      const newTicket = {
        ticketId: "TKT" + Math.floor(Math.random() * 1000000),
        busNumber: "RT-101",
        route: "JKLU → Mansarover",
        source: "JKLU",
        destination: selectedStop,
        departureDate: new Date(Date.now() + 86400000).toISOString(), // tomorrow
        departureTime: "10:15 AM",
        arrivalTime: "11:00 AM",
        seatNumber: "A" + Math.floor(Math.random() * 30 + 1),
        fare: selectedStopFare,
        passengerName: passengerName,
        passengerEmail: passengerEmail,
        bookingDate: new Date().toISOString(),
        status: "Confirmed",
        paymentMethod: paymentMethod,
        transactionId: "TXN" + Math.floor(Math.random() * 1000000),
      };

      // Save ticket to localStorage
      const existingTickets = JSON.parse(localStorage.getItem("tickets")) || [];
      const updatedTickets = [newTicket, ...existingTickets];
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));

      setTicketData(newTicket);
      setIsPaymentSuccessful(true);

      // Generate PDF and send email automatically if enabled
      setTimeout(() => {
        const pdfBase64 = generatePDFAndGetBase64(newTicket);

        if (autoSendEmail) {
          setIsEmailSending(true);
          setShowEmailToast(true);

          try {
            sendEmailWithTicket(newTicket, pdfBase64);
            setIsEmailSent(true);
            setEmailSendError(null);
          } catch (error) {
            setIsEmailSent(false);
            setEmailSendError(
              "Failed to send email automatically. You can try sending it manually."
            );
          } finally {
            setIsEmailSending(false);
            setTimeout(() => setShowEmailToast(false), 5000);
          }
        }
      }, 1000);
    }, 2000);
  };

  // Generate PDF ticket and return as base64
  const generatePDFAndGetBase64 = (ticket) => {
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

    // Add ticket details
    doc.setFontSize(12);
    doc.text(`Bus Number: ${ticket.busNumber}`, 10, 60);
    doc.text(`Route: ${ticket.route}`, 10, 70);
    doc.text(`Source: ${ticket.source}`, 10, 80);
    doc.text(`Destination: ${ticket.destination}`, 10, 90);
    doc.text(
      `Departure Date: ${new Date(ticket.departureDate).toLocaleString()}`,
      10,
      100
    );
    doc.text(`Departure Time: ${ticket.departureTime}`, 10, 110);
    doc.text(`Arrival Time: ${ticket.arrivalTime}`, 10, 120);
    doc.text(`Seat Number: ${ticket.seatNumber}`, 10, 130);
    doc.text(`Fare: ${ticket.fare}`, 10, 140);
    doc.text(`Passenger Name: ${ticket.passengerName}`, 10, 150);
    doc.text(`Passenger Email: ${ticket.passengerEmail}`, 10, 160);
    doc.text(
      `Booking Date: ${new Date(ticket.bookingDate).toLocaleString()}`,
      10,
      170
    );
    doc.text(`Status: ${ticket.status}`, 10, 180);
    doc.text(`Payment Method: ${ticket.paymentMethod}`, 10, 190);
    doc.text(`Transaction ID: ${ticket.transactionId}`, 10, 200);

    // Add footer
    doc.setFontSize(10);
    doc.text("Thank you for choosing our service!", 105, 220, {
      align: "center",
    });

    // Return the PDF as a base64 string
    return doc.output("dataurlstring");
  };

  // Generate QR code data URL
  const generateQRCodeDataUrl = (ticket) => {
    // Implement your QR code generation logic here
    // For example, you can use a library like qrcode to generate a QR code image
    // and then convert it to a data URL
    return `data:image/png;base64,${qrcode(0, "M")}`;
  };

  // Send email with ticket
  const sendEmailWithTicket = (ticket, pdfBase64) => {
    // Implement your email sending logic here
    // For example, you can use a library like nodemailer to send an email
    sendTicketEmail(
      ticket.passengerEmail,
      ticket.subject,
      ticket.body,
      pdfBase64
    );
  };

  // Get the fare for the selected stop
  const selectedStopFare =
    stops.find((stop) => stop.name === selectedStop)?.fare || "";

  // QR code placeholder for PDF generation
  const qrCodeDataUrl =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <AnimatePresence>
        {isPaymentSuccessful ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 py-8"
          >
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white text-center">
                <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-12 w-12" />
                </div>
                <h2 className="text-2xl font-bold">Payment Successful!</h2>
                <p className="mt-2 opacity-90">
                  Your ticket has been booked successfully.
                </p>
              </div>

              <div className="p-6">
                <div className="mb-6 border-b pb-4">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Bus className="mr-2 text-blue-500" size={20} />
                    Ticket Details
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-gray-500">Ticket ID:</div>
                    <div className="font-medium text-gray-800">
                      {ticketData?.ticketId}
                    </div>
                    <div className="text-gray-500">Bus Number:</div>
                    <div className="font-medium text-gray-800">
                      {ticketData?.busNumber}
                    </div>
                    <div className="text-gray-500">Route:</div>
                    <div className="font-medium text-gray-800">
                      {ticketData?.route}
                    </div>
                    <div className="text-gray-500">From:</div>
                    <div className="font-medium text-gray-800">
                      {ticketData?.source}
                    </div>
                    <div className="text-gray-500">To:</div>
                    <div className="font-medium text-gray-800">
                      {ticketData?.destination}
                    </div>
                    <div className="text-gray-500">Departure:</div>
                    <div className="font-medium text-gray-800">
                      {new Date(ticketData?.departureDate).toLocaleDateString()}{" "}
                      {ticketData?.departureTime}
                    </div>
                    <div className="text-gray-500">Seat:</div>
                    <div className="font-medium text-gray-800">
                      {ticketData?.seatNumber}
                    </div>
                    <div className="text-gray-500">Fare:</div>
                    <div className="font-medium text-gray-800">
                      {ticketData?.fare}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      const doc = new jsPDF();
                      const pdfBase64 = generatePDFAndGetBase64(ticketData);
                      const link = document.createElement("a");
                      link.href = pdfBase64;
                      link.download = `Ticket_${ticketData.ticketId}.pdf`;
                      link.click();
                    }}
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <Download size={18} />
                    Download Ticket
                  </button>

                  {!isEmailSent && (
                    <button
                      onClick={() => {
                        setIsEmailSending(true);
                        setShowEmailToast(true);

                        try {
                          const pdfBase64 = generatePDFAndGetBase64(ticketData);
                          sendEmailWithTicket(ticketData, pdfBase64);
                          setIsEmailSent(true);
                          setEmailSendError(null);
                        } catch (error) {
                          setIsEmailSent(false);
                          setEmailSendError(
                            "Failed to send email. Please try again."
                          );
                        } finally {
                          setIsEmailSending(false);
                          setTimeout(() => setShowEmailToast(false), 5000);
                        }
                      }}
                      disabled={isEmailSending}
                      className="flex items-center justify-center gap-2 bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors shadow-sm disabled:bg-gray-400"
                    >
                      <Mail size={18} />
                      {isEmailSending ? "Sending..." : "Send to Email"}
                    </button>
                  )}

                  <button
                    onClick={() => navigate("/tickets")}
                    className="flex items-center justify-center gap-2 border border-gray-300 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    View All Tickets
                  </button>
                </div>
              </div>
            </div>

            {/* Email toast notification */}
            {showEmailToast && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-center gap-3 ${
                  isEmailSent
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-red-100 text-red-800 border border-red-200"
                }`}
              >
                {isEmailSent ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <div>
                  {isEmailSent
                    ? "Ticket sent to your email successfully!"
                    : emailSendError || "Failed to send email."}
                </div>
                <button
                  onClick={() => setShowEmailToast(false)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 py-8"
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-blue-600 mb-6 hover:underline font-medium"
            >
              <ArrowLeft size={18} className="mr-1" />
              Back
            </button>

            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
              Complete Your Payment
            </h1>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <CreditCard className="mr-2 text-blue-500" size={20} />
                    Payment Details
                  </h2>

                  <div className="mb-6">
                    <div className="flex flex-wrap gap-3 mb-4">
                      <button
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                          paymentMethod === "card"
                            ? "border-blue-500 bg-blue-50 text-blue-600 shadow-sm"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setPaymentMethod("card")}
                      >
                        <CreditCard size={18} />
                        Card
                      </button>
                      <button
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                          paymentMethod === "upi"
                            ? "border-blue-500 bg-blue-50 text-blue-600 shadow-sm"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setPaymentMethod("upi")}
                      >
                        <Wallet size={18} />
                        UPI
                      </button>
                      <button
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                          paymentMethod === "cash"
                            ? "border-blue-500 bg-blue-50 text-blue-600 shadow-sm"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setPaymentMethod("cash")}
                      >
                        <Banknote size={18} />
                        Cash
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handlePayment} className="space-y-5">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Passenger Name
                      </label>
                      <div className="relative">
                        <User
                          size={18}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="text"
                          value={passengerName}
                          onChange={(e) => setPassengerName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail
                          size={18}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="email"
                          value={passengerEmail}
                          onChange={(e) => {
                            setPassengerEmail(e.target.value);
                            setEmailError("");
                          }}
                          className={`w-full pl-10 pr-4 py-3 border ${
                            emailError ? "border-red-500" : "border-gray-300"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                      {emailError && (
                        <p className="mt-1 text-sm text-red-600">
                          {emailError}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Destination Stop
                      </label>
                      <div className="relative">
                        <MapPin
                          size={18}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <div
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer hover:border-gray-400 transition-colors"
                          onClick={() => setShowStopDropdown(!showStopDropdown)}
                        >
                          <span
                            className={
                              selectedStop ? "text-gray-900" : "text-gray-400"
                            }
                          >
                            {selectedStop || "Select your destination stop"}
                          </span>
                          <ChevronDown size={18} className="text-gray-400" />
                        </div>

                        {showStopDropdown && (
                          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                            {stops.map((stop) => (
                              <div
                                key={stop.name}
                                className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex justify-between border-b border-gray-100 last:border-0"
                                onClick={() => {
                                  setSelectedStop(stop.name);
                                  setShowStopDropdown(false);
                                }}
                              >
                                <span>{stop.name}</span>
                                <span className="font-medium text-blue-600">
                                  {stop.fare}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {paymentMethod === "card" && (
                      <>
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Card Number
                          </label>
                          <div className="relative">
                            <CreditCard
                              size={18}
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                if (value.length <= 16) {
                                  setCardNumber(value);
                                }
                              }}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="1234 5678 9012 3456"
                              required={paymentMethod === "card"}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                              Expiry Date
                            </label>
                            <div className="relative">
                              <Calendar
                                size={18}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              />
                              <input
                                type="text"
                                value={expiryDate}
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /\D/g,
                                    ""
                                  );
                                  if (value.length <= 4) {
                                    setExpiryDate(
                                      value
                                        .replace(/(\d{2})(\d{0,2})/, "$1/$2")
                                        .replace(/\/$/, "")
                                    );
                                  }
                                }}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="MM/YY"
                                required={paymentMethod === "card"}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                              CVV
                            </label>
                            <div className="relative">
                              <Shield
                                size={18}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              />
                              <input
                                type="password"
                                value={cvv}
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /\D/g,
                                    ""
                                  );
                                  if (value.length <= 3) {
                                    setCvv(value);
                                  }
                                }}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="123"
                                required={paymentMethod === "card"}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {paymentMethod === "upi" && (
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          UPI ID
                        </label>
                        <div className="relative">
                          <Wallet
                            size={18}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type="text"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="username@upi"
                            required={paymentMethod === "upi"}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="autoSendEmail"
                        checked={autoSendEmail}
                        onChange={(e) => setAutoSendEmail(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="autoSendEmail"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Automatically send ticket to my email
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={!selectedStop || isProcessing}
                      className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                        !selectedStop || isProcessing
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                      } transition-all shadow-sm flex items-center justify-center gap-2`}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                          Processing...
                        </>
                      ) : (
                        <>Pay {selectedStopFare || ""}</>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-6 border border-gray-100">
                  <h3 className="text-lg font-semibold mb-6 flex items-center">
                    <Bus className="mr-2 text-blue-500" size={20} />
                    Trip Summary
                  </h3>

                  <div className="space-y-5 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Bus className="text-blue-600" size={18} />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Bus</p>
                        <p className="font-medium text-gray-800">
                          RT-101 (JKLU → Mansarover)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <MapPin className="text-blue-600" size={18} />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">From</p>
                        <p className="font-medium text-gray-800">JKLU</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <MapPin className="text-blue-600" size={18} />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">To</p>
                        <p className="font-medium text-gray-800">
                          {selectedStop || "Select destination"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Calendar className="text-blue-600" size={18} />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Date</p>
                        <p className="font-medium text-gray-800">
                          {new Date(Date.now() + 86400000).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Clock className="text-blue-600" size={18} />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Departure Time</p>
                        <p className="font-medium text-gray-800">10:15 AM</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Fare</span>
                      <span className="font-medium">
                        {selectedStopFare || "₹0"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="font-medium">₹0</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t mt-3">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold text-blue-600 text-lg">
                        {selectedStopFare || "₹0"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentPage;
