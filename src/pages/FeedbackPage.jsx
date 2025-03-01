import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function FeedbackPage() {
  const navigate = useNavigate();
  
  // Get user details from localStorage (Saved from SignUp page)
  const [userDetails, setUserDetails] = useState({
    name: "Divanshu",
    email: "xyz123@gmail.com",
    contact: "+91 00000 00000",
  });

  const [rating, setRating] = useState(2); // Default: "Fine"
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // 🔹 Track submission

  const emojis = [
    { id: 1, icon: "😡", label: "Worst" },
    { id: 2, icon: "😞", label: "Not Good" },
    { id: 3, icon: "😐", label: "Fine" },
    { id: 4, icon: "😊", label: "Look Good" },
    { id: 5, icon: "😎", label: "Very Good" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); // 🔹 Mark as submitted
    setTimeout(() => navigate("/routes"), 2000); // Redirect after 2s
  };

  return (
    <div className="min-h-screen bg-[#D9C9A8] px-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white shadow-md">
          <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
        </button>
        <h2 className="text-xl font-semibold text-gray-900">Feedback</h2>
        <div className="w-10"></div>
      </div>

      {/* Feedback Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name & Contact */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={userDetails.name}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white font-semibold"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="text"
              value={userDetails.contact}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white font-semibold"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            value={userDetails.email}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white font-semibold"
          />
        </div>

        {/* Rating Section */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Share your experience in scaling
          </label>
          <div className="flex justify-between mt-2">
            {emojis.map((emoji, index) => (
              <div key={emoji.id} className="flex flex-col items-center">
                <button
                  type="button"
                  className={`text-2xl ${rating === index + 1 ? "scale-125" : "opacity-50"}`}
                  onClick={() => setRating(index + 1)}
                >
                  {emoji.icon}
                </button>
                <span className="text-xs text-gray-700">{emoji.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Slider for scaling */}
        <input
          type="range"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="w-full mt-4"
        />

        {/* Comment Box */}
        <textarea
          placeholder="Add your comments..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 font-semibold rounded-lg mt-4 transition ${
            isSubmitted ? "bg-gray-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          disabled={isSubmitted} // 🔹 Disable after submission
        >
          {isSubmitted ? "SUBMITTED SUCCESSFULLY !!" : "SUBMIT FEEDBACK"}
        </button>
      </form>
    </div>
  );
}

export default FeedbackPage;
