
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../assets/Logo2.png";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: "#D9C9A8" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <img src={Logo} alt="Logo" className="w-45 h-40 mb-4 mx-auto" />

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Where is My Bus
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Track your bus in real-time and never miss a ride
        </p>
        <button
          onClick={() => navigate("/signin-selection")}
          className="btn-primary"
        >
          Get Started
        </button>
      </motion.div>
    </div>
  );
}

export default LandingPage;
