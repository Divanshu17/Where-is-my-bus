import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  CheckCircle,
  Wallet,
  Banknote,
} from "lucide-react";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [selectedStop, setSelectedStop] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card"); // Default payment method
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

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

  // Handle form submission
  const handlePayment = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      setIsPaymentSuccessful(true);
    }, 2000);
  };

  // Calculate fare based on selected stop
  const selectedStopFare =
    stops.find((stop) => stop.name === selectedStop)?.fare || "₹0";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <header className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Payment</h2>
        <div className="w-10"></div>
      </header>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Ticket Details</h3>
            <p className="text-sm text-gray-600">Bus #101</p>
            <p className="text-sm text-gray-600">JKLU → Mansarover</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Fare</p>
            <p className="text-xl font-bold text-blue-600">
              {selectedStopFare}
            </p>
          </div>
        </div>

        {isPaymentSuccessful ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Payment Successful!
            </h3>
            <p className="text-sm text-gray-600">
              Your ticket has been booked successfully.
            </p>
            <button
              onClick={() => navigate("/routes")}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Go to Home
            </button>
          </div>
        ) : (
          <form onSubmit={handlePayment}>
            {/* Stop Selection Dropdown */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Stop
              </label>
              <select
                value={selectedStop}
                onChange={(e) => setSelectedStop(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>
                  Choose your stop
                </option>
                {stops.map((stop, index) => (
                  <option key={index} value={stop.name}>
                    {stop.name} - {stop.fare}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center justify-center p-4 rounded-lg border ${
                    paymentMethod === "card"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex items-center justify-center p-4 rounded-lg border ${
                    paymentMethod === "upi"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <Wallet className="h-5 w-5 mr-2" />
                  <span>UPI</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("netbanking")}
                  className={`flex items-center justify-center p-4 rounded-lg border ${
                    paymentMethod === "netbanking"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <Banknote className="h-5 w-5 mr-2" />
                  <span>Net Banking</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("wallet")}
                  className={`flex items-center justify-center p-4 rounded-lg border ${
                    paymentMethod === "wallet"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <Wallet className="h-5 w-5 mr-2" />
                  <span>Wallet</span>
                </button>
              </div>
            </div>

            {/* Payment Form (Conditional Rendering) */}
            {paymentMethod === "card" && (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {paymentMethod === "upi" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  UPI ID
                </label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            )}

            {paymentMethod === "netbanking" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Bank
                </label>
                <select
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Choose your bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                </select>
              </div>
            )}

            {paymentMethod === "wallet" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Wallet
                </label>
                <select
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Choose your wallet</option>
                  <option value="paytm">Paytm</option>
                  <option value="phonepe">PhonePe</option>
                  <option value="gpay">Google Pay</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Pay {selectedStopFare}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
