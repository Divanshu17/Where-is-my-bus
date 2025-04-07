import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useTranslation from "../hooks/useTranslation";
import LanguageSelector from "../components/LanguageSelector";
import {
  UserIcon,
  TruckIcon,
  ArrowLeftIcon,
  MapIcon,
  ClockIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

function SignInSelection() {
  const navigate = useNavigate();
  const t = useTranslation();
  const [hoveredRole, setHoveredRole] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    // Show features after initial animation
    const timer = setTimeout(() => {
      setShowFeatures(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);

    // Navigate after animation
    setTimeout(() => {
      navigate(role === "user" ? "/signup" : "/driver-login");
    }, 500);
  };

  const features = [
    { icon: <MapIcon className="h-5 w-5" />, text: t.realTimeTracking },
    { icon: <ClockIcon className="h-5 w-5" />, text: t.etaUpdates },
    { icon: <BellIcon className="h-5 w-5" />, text: t.notifications },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#f0e6d2] to-[#d9c9a8] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
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
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-block mb-4 bg-white/30 backdrop-blur-sm p-4 rounded-full"
          >
            <motion.div
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
              className="text-4xl"
            >
              🚌
            </motion.div>
          </motion.div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            {t.welcome}
          </h2>
          <p className="text-gray-600 text-lg">{t.chooseRole}</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-6 border border-white/50"
        >
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setHoveredRole("user")}
                onMouseLeave={() => setHoveredRole(null)}
                onClick={() => handleRoleSelect("user")}
                className={`relative overflow-hidden rounded-xl shadow-md cursor-pointer transition-all duration-300 ${
                  hoveredRole === "user" ? "ring-2 ring-blue-500" : ""
                } ${selectedRole === "user" ? "scale-105" : ""}`}
                animate={selectedRole === "user" ? { y: -20 } : {}}
                exit={selectedRole === "user" ? { opacity: 0, y: -50 } : {}}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-90"></div>
                <div className="relative p-6 flex items-center">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <UserIcon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {t.passenger}
                    </h3>
                    <p className="text-blue-100">{t.passengerDesc}</p>
                  </div>
                  <motion.div
                    animate={{
                      x: hoveredRole === "user" ? 0 : 10,
                      opacity: hoveredRole === "user" ? 1 : 0,
                    }}
                    className="text-white text-xl"
                  >
                    →
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setHoveredRole("driver")}
                onMouseLeave={() => setHoveredRole(null)}
                onClick={() => handleRoleSelect("driver")}
                className={`relative overflow-hidden rounded-xl shadow-md cursor-pointer transition-all duration-300 ${
                  hoveredRole === "driver" ? "ring-2 ring-amber-500" : ""
                } ${selectedRole === "driver" ? "scale-105" : ""}`}
                animate={selectedRole === "driver" ? { y: -20 } : {}}
                exit={selectedRole === "driver" ? { opacity: 0, y: -50 } : {}}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-90"></div>
                <div className="relative p-6 flex items-center">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <TruckIcon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {t.driver}
                    </h3>
                    <p className="text-amber-100">{t.driverDesc}</p>
                  </div>
                  <motion.div
                    animate={{
                      x: hoveredRole === "driver" ? 0 : 10,
                      opacity: hoveredRole === "driver" ? 1 : 0,
                    }}
                    className="text-white text-xl"
                  >
                    →
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <AnimatePresence>
          {showFeatures && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-md"
            >
              <h3 className="text-center text-gray-700 font-medium mb-3">
                {t.keyFeatures}
              </h3>
              <div className="flex justify-around">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="bg-blue-100 p-2 rounded-full mb-2 text-blue-600">
                      {feature.icon}
                    </div>
                    <span className="text-xs text-gray-600">
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={itemVariants} className="text-center">
          <p className="text-gray-600">
            {t.dontHaveAccount}{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-600 font-medium hover:underline transition-all"
            >
              {t.signup}
            </button>
          </p>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10">
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-16 h-16 rounded-full bg-blue-500/20 backdrop-blur-sm"
        ></motion.div>
      </div>
      <div className="absolute bottom-10 left-10">
        <motion.div
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-12 h-12 rounded-full bg-amber-500/20 backdrop-blur-sm"
        ></motion.div>
      </div>

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

export default SignInSelection;
