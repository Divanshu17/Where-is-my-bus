import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useTranslation from "../hooks/useTranslation";
import {
  ArrowLeftIcon,
  Bars3Icon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckCircleIcon,
  PaperAirplaneIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import SideNavBar from "./components/SideNavBar";

function FeedbackPage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const t = useTranslation();

  // Get user details from localStorage (Saved from SignUp page)
  const [userDetails, setUserDetails] = useState({
    name: "Divanshu",
    email: "xyz123@gmail.com",
    contact: "+91 00000 00000",
  });

  useEffect(() => {
    // Try to load user data from localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.fullName) {
      setUserDetails({
        name: userData.fullName,
        email: userData.email,
        contact: userData.phoneNumber || "+91 00000 00000",
      });
    }
  }, []);

  const [rating, setRating] = useState(3); // Default: "Fine"
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("bus_service");

  const emojis = [
    { id: 1, icon: "😡", label: t.terrible },
    { id: 2, icon: "😞", label: t.poor },
    { id: 3, icon: "😐", label: t.okay },
    { id: 4, icon: "😊", label: t.good },
    { id: 5, icon: "😎", label: t.excellent },
  ];

  const categories = [
    {
      id: "bus_service",
      label: t.busService,
      icon: <TruckIcon className="h-5 w-5" />,
    },
    {
      id: "app_experience",
      label: t.appExperience,
      icon: <UserIcon className="h-5 w-5" />,
    },
    {
      id: "driver_behavior",
      label: t.driverBehavior,
      icon: <UserIcon className="h-5 w-5" />,
    },
    {
      id: "route_timing",
      label: t.routeTiming,
      icon: <ArrowLeftIcon className="h-5 w-5" />,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Redirect after showing success message
      setTimeout(() => navigate("/routes"), 2000);
    }, 1500);
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
      {/* Animated background elements - reduced opacity and blur for clarity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/3 to-amber-500/3"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
            }}
            animate={{
              y: [0, Math.random() * 20 - 10],
              x: [0, Math.random() * 20 - 10],
              scale: [1, Math.random() * 0.2 + 0.9],
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

      {/* Header with reduced blur for clarity */}
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-[#f0e6d2]/90 shadow-md px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-full hover:bg-[#d9c9a8]/70 transition-colors"
          >
            <Bars3Icon className="h-6 w-6 text-gray-900" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <ChatBubbleBottomCenterTextIcon className="h-6 w-6 mr-2 text-blue-600" />
            {t.feedback}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-[#d9c9a8]/70 transition-colors"
          >
            <ArrowLeftIcon className="h-6 w-6 text-gray-900" />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <SideNavBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Success Message - improved contrast */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 z-50 flex justify-center"
          >
            <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              {t.feedbackSubmitted}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-6 py-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md mx-auto"
        >
          {/* Feedback Form - improved contrast and reduced blur */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <ChatBubbleBottomCenterTextIcon className="h-5 w-5 mr-2 text-blue-600" />
              {t.shareExperience}
            </h3>

            {/* User Information */}
            <div className="space-y-4 mb-6">
              {/* Name */}
              <motion.div variants={itemVariants} className="relative">
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  {t.yourName}
                </label>
                <div className="relative">
                  <UserIcon className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={userDetails.name}
                    disabled
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 font-medium focus:outline-none"
                  />
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants} className="relative">
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  {t.email}
                </label>
                <div className="relative">
                  <EnvelopeIcon className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    value={userDetails.email}
                    disabled
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 font-medium focus:outline-none"
                  />
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div variants={itemVariants} className="relative">
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  {t.contactNumber}
                </label>
                <div className="relative">
                  <PhoneIcon className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={userDetails.contact}
                    disabled
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 font-medium focus:outline-none"
                  />
                </div>
              </motion.div>
            </div>

            {/* Feedback Category - improved contrast */}
            <motion.div variants={itemVariants} className="mb-6">
              <label className="block text-sm font-medium text-gray-800 mb-2">
                {t.feedbackCategory}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all ${
                      selectedCategory === category.id
                        ? "bg-blue-50 border-blue-400 text-blue-700"
                        : "bg-white border-gray-300 text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`p-2 rounded-full mb-1 ${
                          selectedCategory === category.id
                            ? "bg-blue-100"
                            : "bg-gray-100"
                        }`}
                      >
                        {category.icon}
                      </div>
                      <span className="text-xs font-semibold">
                        {category.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Rating Section - improved contrast */}
            <motion.div variants={itemVariants} className="mb-6">
              <label className="block text-sm font-medium text-gray-800 mb-2">
                {t.rateExperience}
              </label>
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-300">
                {emojis.map((emoji, index) => (
                  <motion.button
                    key={emoji.id}
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center"
                    onClick={() => setRating(index + 1)}
                  >
                    <motion.div
                      animate={{
                        scale: rating === index + 1 ? [1, 1.2, 1] : 1,
                        rotate: rating === index + 1 ? [0, 5, -5, 0] : 0,
                      }}
                      transition={{
                        repeat: rating === index + 1 ? Infinity : 0,
                        repeatDelay: 2,
                        duration: 0.5,
                      }}
                      className={`text-3xl transition-all duration-200 ${
                        rating === index + 1
                          ? "transform scale-125"
                          : "opacity-60"
                      }`}
                    >
                      {emoji.icon}
                    </motion.div>
                    <span
                      className={`text-xs mt-1 font-semibold ${
                        rating === index + 1 ? "text-blue-700" : "text-gray-600"
                      }`}
                    >
                      {emoji.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Slider for rating - improved styling */}
              <div className="mt-4 px-2">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between mt-1 text-xs text-gray-600 px-1">
                  <span>{t.terrible}</span>
                  <span>{t.poor}</span>
                  <span>{t.okay}</span>
                  <span>{t.good}</span>
                  <span>{t.excellent}</span>
                </div>
              </div>
            </motion.div>

            {/* Comment Box - improved contrast */}
            <motion.div variants={itemVariants} className="mb-6">
              <label className="block text-sm font-medium text-gray-800 mb-2">
                {t.additionalComments}
              </label>
              <textarea
                placeholder={t.commentPlaceholder}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all h-32 resize-none text-gray-800"
              />
            </motion.div>

            {/* Submit Button - improved contrast */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className={`w-full py-3.5 rounded-xl font-bold shadow-md flex items-center justify-center space-x-2 transition-all ${
                isSubmitted
                  ? "bg-green-600 text-white"
                  : isSubmitting
                  ? "bg-blue-500 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? (
                <>
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
                  <span>{t.loading}</span>
                </>
              ) : isSubmitted ? (
                <>
                  <CheckCircleIcon className="h-5 w-5" />
                  <span>{t.feedbackSubmitted}</span>
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="h-5 w-5" />
                  <span>{t.submitFeedback}</span>
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Thank You Note - improved contrast */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-6 text-gray-700 text-sm font-medium"
          >
            {t.thankYou}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default FeedbackPage;
