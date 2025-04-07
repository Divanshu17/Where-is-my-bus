import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useTranslation from "../hooks/useTranslation";
import LanguageSelector from "../components/LanguageSelector";
import {
  MapPinIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

function LocationPermission() {
  const navigate = useNavigate();
  const t = useTranslation();
  const [permissionState, setPermissionState] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleEnableLocation = () => {
    if ("geolocation" in navigator) {
      setPermissionState("loading");

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPermissionState("success");

          // Simulate a delay before navigating
          setTimeout(() => {
            navigate("/routes");
          }, 1500);
        },
        (error) => {
          setPermissionState("error");

          switch (error.code) {
            case error.PERMISSION_DENIED:
              setErrorMessage(
                "Location access was denied. Please enable location services in your browser settings."
              );
              break;
            case error.POSITION_UNAVAILABLE:
              setErrorMessage(
                "Location information is unavailable. Please try again later."
              );
              break;
            case error.TIMEOUT:
              setErrorMessage(
                "The request to get your location timed out. Please try again."
              );
              break;
            default:
              setErrorMessage(
                "An unknown error occurred while trying to access your location."
              );
          }

          console.error("Location access denied:", error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    } else {
      setPermissionState("error");
      setErrorMessage(
        "Geolocation is not supported by this browser. Please use a different browser."
      );
    }
  };

  const resetPermissionState = () => {
    setPermissionState("idle");
    setErrorMessage("");
  };

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
    visible: { y: 0, opacity: 1 },
  };

  const benefits = [
    {
      icon: <GlobeAltIcon className="h-5 w-5 text-blue-500" />,
      title: t.realTimeTracking,
      description: "See buses moving on the map in real-time",
    },
    {
      icon: <ShieldCheckIcon className="h-5 w-5 text-green-500" />,
      title: "Privacy Protected",
      description: "Your location data is only used while using the app",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-[#f0e6d2] to-[#d9c9a8] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-amber-500/10"
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

      {/* Main gradient overlays */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-3xl"></div>

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-300 z-10"
      >
        <ArrowLeftIcon className="h-6 w-6 text-gray-800" />
      </motion.button>

      {/* Language Selector */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute top-8 right-8 z-10"
      >
        <LanguageSelector />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md z-10"
      >
        <motion.div
          variants={itemVariants}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50 mb-6"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-100 rounded-full scale-[1.2] blur-md"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-full">
                  <MapPinIcon className="h-12 w-12 text-white" />
                </div>

                {/* Animated rings */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 0, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  className="absolute inset-0 border-2 border-blue-400 rounded-full"
                ></motion.div>
                <motion.div
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  className="absolute inset-0 border-2 border-blue-300 rounded-full"
                ></motion.div>
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl font-extrabold text-gray-900 mb-3"
            >
              {t.enableLocation}
            </motion.h2>

            <motion.p variants={itemVariants} className="text-gray-600 mb-6">
              {t.locationNeeded}
            </motion.p>

            <AnimatePresence mode="wait">
              {permissionState === "idle" && (
                <motion.button
                  key="enable-button"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEnableLocation}
                  className="w-full py-3 text-white text-lg font-semibold rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center"
                >
                  {t.enableLocationAccess}
                </motion.button>
              )}

              {permissionState === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="mb-3"
                  >
                    <ArrowPathIcon className="h-8 w-8 text-blue-500" />
                  </motion.div>
                  <p className="text-gray-600">{t.loading}</p>
                </motion.div>
              )}

              {permissionState === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="bg-green-100 p-3 rounded-full mb-3"
                  >
                    <ShieldCheckIcon className="h-8 w-8 text-green-500" />
                  </motion.div>
                  <p className="text-green-600 font-medium">
                    {t.locationGranted}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">{t.redirecting}</p>
                </motion.div>
              )}

              {permissionState === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <div className="bg-red-100 p-4 rounded-lg mb-4 text-center">
                    <p className="text-red-600">{errorMessage}</p>
                  </div>
                  <button
                    onClick={resetPermissionState}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all"
                  >
                    {t.tryAgain}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Benefits section */}
        <motion.div
          variants={itemVariants}
          className="bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-md"
        >
          <h3 className="text-center text-gray-700 font-medium mb-4">
            {t.whyLocationNeeded}
          </h3>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start"
              >
                <div className="bg-white p-2 rounded-full mr-3 shadow-sm">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Bus route illustration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300/30">
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0 w-20 h-full bg-blue-500/50 blur-sm"
        ></motion.div>
      </div>
    </div>
  );
}

export default LocationPermission;
