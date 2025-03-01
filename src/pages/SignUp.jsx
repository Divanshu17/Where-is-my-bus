import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserIcon, EnvelopeIcon, LockClosedIcon, PhoneIcon } from "@heroicons/react/24/outline";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/location-permission");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#D9C9A8]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Sign up</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm bg-gray-100 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm bg-gray-100 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a Password"
              className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm bg-gray-100 focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-xs text-gray-600 mt-1 pl-2">*Must be at least 8 characters</p>
          </div>

          {/* Phone Number */}
          <div className="relative">
            <PhoneIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your Phone No"
              className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm bg-gray-100 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white text-lg font-semibold rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all"
          >
            SIGN UP
          </button>

          {/* Sign Up with Google */}
          <button
            type="button"
            className="w-full py-3 border border-gray-500 text-gray-800 bg-gray-200 rounded-lg font-semibold shadow-md hover:bg-gray-300 transition"
          >
            SIGN UP WITH GOOGLE
          </button>
        </form>

        {/* Already have an account? */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default SignUp;
