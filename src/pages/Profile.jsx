import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bars3Icon, ArrowLeftIcon } from "@heroicons/react/24/outline";

function Profile() {
  const navigate = useNavigate();

  // Load user data from localStorage
  const storedUserData = JSON.parse(localStorage.getItem("userData")) || {
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  };

  const [formData, setFormData] = useState(storedUserData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(formData));
    alert("Profile Updated!");
  };

  return (
    <div className="min-h-screen bg-[#D9C9A8] px-4 py-6 relative flex flex-col items-center">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-md mb-6">
        <button onClick={() => navigate("/routes")} className="p-2">
          <Bars3Icon className="h-6 w-6 text-gray-900" />
        </button>
        <h2 className="text-[22px] font-extrabold tracking-wider text-gray-900">
          Profile
        </h2>
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-md">
          <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center border-2 border-gray-700">
          <span className="text-gray-700 text-4xl">👤</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mt-2">{formData.fullName}</h3>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-800">Username</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-800">Email I’d</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-800">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-800">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg mt-4"
        >
          UPDATE
        </button>
      </form>
    </div>
  );
}

export default Profile;
