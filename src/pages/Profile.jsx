import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  ArrowLeftIcon,
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon,
  CameraIcon,
  PencilIcon,
  CheckIcon,
  EyeIcon,
  EyeSlashIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import SideNavBar from "./components/SideNavBar";

function Profile() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [avatarColor, setAvatarColor] = useState("#3B82F6"); // Default blue color

  // Load user data from localStorage
  const storedUserData = JSON.parse(localStorage.getItem("userData")) || {
    fullName: "User Name",
    email: "user@example.com",
    phoneNumber: "",
    password: "********",
    profileImage: null,
  };

  const [formData, setFormData] = useState(storedUserData);
  const [originalData, setOriginalData] = useState(storedUserData);

  useEffect(() => {
    // Generate a consistent color based on the user's name
    if (formData.fullName) {
      const hash = formData.fullName.split("").reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0);
      const hue = Math.abs(hash % 360);
      setAvatarColor(`hsl(${hue}, 70%, 50%)`);
    }
  }, [formData.fullName]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Get token from localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData?.token;

    if (!token) {
      setIsLoading(false);
      setSuccessMessage("Please login again to update your profile");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    // Send update request to backend
    fetch("http://localhost:5000/api/users/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        ...(formData.password !== "********" && {
          password: formData.password,
        }),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "Something went wrong!");
          });
        }
        return response.json();
      })
      .then((data) => {
        // Update localStorage with new data
        localStorage.setItem(
          "userData",
          JSON.stringify({
            ...userData,
            fullName: data.fullName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            token: data.token,
          })
        );

        setOriginalData(formData);
        setIsLoading(false);
        setIsEditing(false);
        setSuccessMessage("Profile updated successfully!");

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("Update profile error:", error);
        setIsLoading(false);
        setSuccessMessage(`Error: ${error.message}`);

        // Clear error message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      });
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0e6d2] to-[#d9c9a8] relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/5 to-amber-500/5"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 30 - 15],
              scale: [1, Math.random() * 0.3 + 0.9],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Header with Glassmorphism */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-[#f0e6d2]/80 shadow-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-full hover:bg-[#d9c9a8]/50 transition-colors"
          >
            <Bars3Icon className="h-6 w-6 text-gray-800" />
          </button>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent flex items-center">
            <UserCircleIcon className="h-6 w-6 mr-2 text-gray-800" />
            My Profile
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-[#d9c9a8]/50 transition-colors"
          >
            <ArrowLeftIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <SideNavBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 z-50 flex justify-center"
          >
            <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg shadow-md flex items-center">
              <CheckIcon className="h-5 w-5 mr-2" />
              {successMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-6 py-4 flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Profile Header */}
          <motion.div
            variants={itemVariants}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 mb-6 text-center relative border border-white/50"
          >
            {/* Profile Picture */}
            <div className="relative inline-block">
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md border-4 border-white"
                style={{ backgroundColor: avatarColor }}
              >
                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt={formData.fullName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(formData.fullName)
                )}
              </div>

              <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors">
                <CameraIcon className="h-5 w-5" />
              </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-4">
              {formData.fullName}
            </h2>
            <p className="text-gray-600">{formData.email}</p>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <PencilIcon className="h-5 w-5 text-gray-600" />
              </button>
            )}
          </motion.div>

          {/* Profile Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 border border-white/50"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ShieldCheckIcon className="h-5 w-5 mr-2 text-blue-500" />
              Personal Information
            </h3>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserCircleIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-3 bg-white/80 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                      isEditing
                        ? "border-blue-300"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-4 py-3 bg-white/80 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                      isEditing
                        ? "border-blue-300"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <PhoneIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder={
                      !isEditing && !formData.phoneNumber ? "Not provided" : ""
                    }
                    className={`w-full pl-10 pr-4 py-3 bg-white/80 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                      isEditing
                        ? "border-blue-300"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-10 pr-10 py-3 bg-white/80 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                      isEditing
                        ? "border-blue-300"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  />
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 flex space-x-3 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center"
                  >
                    {isLoading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {!isEditing && (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </motion.form>

          {/* Account Actions */}
          <motion.div
            variants={itemVariants}
            className="mt-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-white/50"
          >
            <button
              onClick={() => navigate("/login")}
              className="w-full py-4 px-6 text-red-500 font-medium hover:bg-red-50 transition-colors text-left"
            >
              Logout
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;
