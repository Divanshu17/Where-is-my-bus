import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Shield,
  Award,
  Sparkles,
} from "lucide-react";

// Animated background particle component
const BackgroundParticles = ({ color }) => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 12 + 4,
            height: Math.random() * 12 + 4,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            backgroundColor: color,
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, Math.random() * 10 - 5, 0],
            scale: [1, Math.random() * 0.5 + 0.8, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Animated number counter
const AnimatedCounter = ({ value, className }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    let start = 0;
    const end = parseInt(value);
    const duration = 1200;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(easeProgress * (end - start) + start);

      node.textContent = currentCount;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        node.textContent = end;
      }
    };

    requestAnimationFrame(updateCounter);
  }, [value]);

  return (
    <span ref={nodeRef} className={className}>
      {value}
    </span>
  );
};

const SeatAvailability = ({ totalSeats = 42, occupiedSeats = 0 }) => {
  const [animateCount, setAnimateCount] = useState(false);
  const [activeStat, setActiveStat] = useState(null);
  const [showTip, setShowTip] = useState(false);

  const availableSeats = totalSeats - occupiedSeats;
  const occupancyPercentage = Math.round((occupiedSeats / totalSeats) * 100);

  useEffect(() => {
    // Animate when occupancy changes
    setAnimateCount(true);
    const timer = setTimeout(() => setAnimateCount(false), 1000);

    // Show tip briefly when less than 30% seats available
    if (availableSeats / totalSeats < 0.3) {
      setShowTip(true);
      const hideTip = setTimeout(() => setShowTip(false), 5000);
      return () => {
        clearTimeout(timer);
        clearTimeout(hideTip);
      };
    }

    return () => clearTimeout(timer);
  }, [occupiedSeats, availableSeats, totalSeats]);

  // Status configurations with enhanced styling
  const getStatus = () => {
    if (occupancyPercentage >= 90) {
      return {
        label: "High Demand",
        icon: AlertCircle,
        colors: {
          primary: "#ef4444",
          secondary: "#fee2e2",
          text: "#b91c1c",
          gradient: "from-red-500 via-red-600 to-red-500",
          darkGradient: "from-red-700 to-red-900",
          accentGradient: "from-orange-400 to-red-500",
          glow: "shadow-[0_0_15px_rgba(239,68,68,0.4)]",
          particleColor: "#f87171",
        },
        message: "Few seats left! Book now to secure your spot.",
        accentIcon: Sparkles,
      };
    } else if (occupancyPercentage >= 70) {
      return {
        label: "Filling Fast",
        icon: Clock,
        colors: {
          primary: "#f59e0b",
          secondary: "#fef3c7",
          text: "#b45309",
          gradient: "from-amber-500 via-amber-600 to-amber-500",
          darkGradient: "from-amber-700 to-amber-900",
          accentGradient: "from-yellow-400 to-amber-500",
          glow: "shadow-[0_0_15px_rgba(245,158,11,0.4)]",
          particleColor: "#fbbf24",
        },
        message: "Seats are filling up quickly for this route.",
        accentIcon: TrendingUp,
      };
    } else {
      return {
        label: "Good Availability",
        icon: CheckCircle,
        colors: {
          primary: "#10b981",
          secondary: "#d1fae5",
          text: "#047857",
          gradient: "from-green-500 via-green-600 to-green-500",
          darkGradient: "from-green-700 to-green-900",
          accentGradient: "from-emerald-400 to-green-500",
          glow: "shadow-[0_0_15px_rgba(16,185,129,0.4)]",
          particleColor: "#34d399",
        },
        message: "Plenty of seats available for your journey.",
        accentIcon: Shield,
      };
    }
  };

  const status = getStatus();
  const StatusIcon = status.icon;
  const AccentIcon = status.accentIcon;

  // Enhanced progress bar with animated elements
  const renderProgressBar = () => (
    <div className="h-5 bg-gray-100 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${occupancyPercentage}%` }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 15,
        }}
        className={`h-full relative overflow-hidden ${status.colors.glow}`}
      >
        {/* Gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${status.colors.gradient}`}
        ></div>

        {/* Shimmering effect */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["100% 0%", "-100% 0%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Progress label with pulsing animation */}
        <motion.div
          className="absolute inset-0 flex items-center justify-end pr-2"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-bold text-white drop-shadow-md">
            {occupancyPercentage}%
          </span>
        </motion.div>
      </motion.div>
    </div>
  );

  // Occupancy history data
  const weeklyData = [25, 40, 35, 55, occupancyPercentage, 70, 65];
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Today", "Sat", "Sun"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100"
    >
      {/* Header section with dynamic gradient based on status */}
      <div
        className={`p-6 bg-gradient-to-br ${status.colors.darkGradient} text-white relative overflow-hidden`}
      >
        <BackgroundParticles color={status.colors.particleColor} />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  rotate: animateCount ? [0, -10, 10, 0] : 0,
                }}
                transition={{
                  scale: { type: "spring", stiffness: 400, damping: 10 },
                  rotate: { duration: 0.5 },
                }}
                className="rounded-full p-2 bg-white/20 backdrop-blur-sm"
              >
                <StatusIcon className="h-6 w-6 text-white" />
              </motion.div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  Seat Availability
                </h3>
                <motion.p
                  className="text-sm text-white/90"
                  animate={{ y: animateCount ? [0, -5, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {status.label}
                </motion.p>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-full bg-gradient-to-br ${status.colors.accentGradient} shadow-lg`}
            >
              <AccentIcon className="h-5 w-5 text-white" />
            </motion.div>
          </div>

          {/* Seats available pill */}
          <motion.div
            animate={{
              y: animateCount ? [0, -8, 0] : 0,
              scale: animateCount ? [1, 1.05, 1] : 1,
            }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm"
          >
            <span className="text-sm font-medium mr-2">Available Seats:</span>
            <span className="text-xl font-extrabold flex items-baseline">
              <AnimatedCounter value={availableSeats} className="mr-1" />
              <motion.span
                className="text-xs opacity-80"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                /{totalSeats}
              </motion.span>
            </span>
          </motion.div>
        </div>
      </div>

      {/* Main content area */}
      <div className="p-6 relative">
        {/* Occupancy Meter */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">
              Current Occupancy
            </span>
            <motion.div
              animate={{ scale: animateCount ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.3 }}
              className={`px-2 py-1 rounded-full text-xs font-semibold bg-${status.colors.secondary} text-${status.colors.text}`}
            >
              {status.label}
            </motion.div>
          </div>

          {renderProgressBar()}
        </div>

        {/* Statistics cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setActiveStat("available")}
            onHoverEnd={() => setActiveStat(null)}
            className={`relative overflow-hidden rounded-xl border ${
              activeStat === "available"
                ? "ring-2 ring-blue-500"
                : "border-blue-100"
            } bg-gradient-to-br from-blue-50 to-indigo-50 p-4`}
          >
            {activeStat === "available" && (
              <BackgroundParticles color="#93c5fd" />
            )}

            <span className="text-sm font-medium text-blue-700">Available</span>
            <div className="flex items-baseline mt-2">
              <motion.span
                key={availableSeats}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl font-extrabold text-blue-800"
              >
                <AnimatedCounter value={availableSeats} className="" />
              </motion.span>
              <span className="ml-1 text-sm text-blue-600">seats</span>
            </div>
            <motion.div
              animate={{
                rotate: activeStat === "available" ? 0 : -10,
                scale: activeStat === "available" ? 1.1 : 1,
                x: activeStat === "available" ? -5 : 0,
                y: activeStat === "available" ? -5 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="absolute -bottom-2 -right-2 p-2 text-blue-400 opacity-50"
            >
              <CheckCircle size={40} />
            </motion.div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setActiveStat("occupied")}
            onHoverEnd={() => setActiveStat(null)}
            className={`relative overflow-hidden rounded-xl border ${
              activeStat === "occupied"
                ? `ring-2 ring-${status.colors.primary}`
                : `border-${status.colors.secondary}`
            } bg-gradient-to-br from-${status.colors.secondary} to-white p-4`}
          >
            {activeStat === "occupied" && (
              <BackgroundParticles color={status.colors.particleColor} />
            )}

            <span className={`text-sm font-medium text-${status.colors.text}`}>
              Occupied
            </span>
            <div className="flex items-baseline mt-2">
              <motion.span
                key={occupiedSeats}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`text-3xl font-extrabold text-${status.colors.text}`}
              >
                <AnimatedCounter value={occupiedSeats} className="" />
              </motion.span>
              <span className={`ml-1 text-sm text-${status.colors.text}`}>
                seats
              </span>
            </div>
            <motion.div
              animate={{
                rotate: activeStat === "occupied" ? 0 : -10,
                scale: activeStat === "occupied" ? 1.1 : 1,
                x: activeStat === "occupied" ? -5 : 0,
                y: activeStat === "occupied" ? -5 : 0,
              }}
              transition={{ duration: 0.3 }}
              className={`absolute -bottom-2 -right-2 p-2 text-${status.colors.primary} opacity-50`}
            >
              <Users size={40} />
            </motion.div>
          </motion.div>
        </div>

        {/* Weekly Trend chart with enhanced styling */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-gray-500" />
              Weekly Occupancy Trends
            </h4>
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-100 text-indigo-700"
            >
              Live
            </motion.div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-b from-gray-50 to-white border border-gray-100">
            <div className="grid grid-cols-7 gap-2 h-24">
              {weeklyData.map((height, i) => (
                <div key={i} className="flex flex-col items-center h-full">
                  <div className="h-full w-full flex items-end">
                    <motion.div
                      initial={{ height: "0%" }}
                      animate={{ height: `${height}%` }}
                      transition={{
                        type: "spring",
                        damping: 12,
                        delay: i * 0.05,
                      }}
                      className={`w-full rounded-t-md ${
                        i === 4
                          ? `bg-gradient-to-t ${status.colors.gradient} ${status.colors.glow}`
                          : "bg-gradient-to-t from-gray-200 to-gray-300"
                      } relative group`}
                    >
                      {/* Label popup on hover */}
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded ${
                          i === 4
                            ? `bg-${status.colors.primary} text-white`
                            : "bg-gray-700 text-white"
                        }`}
                      >
                        {height}%
                      </motion.div>

                      {/* Bar highlight on hover */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.3 }}
                        className="absolute inset-0 bg-white rounded-t-md"
                      />
                    </motion.div>
                  </div>
                  <span
                    className={`text-xs mt-1 ${
                      i === 4 ? "font-bold text-blue-700" : "text-gray-500"
                    }`}
                  >
                    {weekDays[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action footer with tip */}
        <AnimatePresence>
          {showTip && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              className={`rounded-xl overflow-hidden bg-gradient-to-r ${status.colors.gradient} p-0.5 mb-4`}
            >
              <div className="bg-white rounded-[calc(0.75rem-1px)] p-4 flex items-center gap-3">
                <div
                  className={`rounded-full p-2 bg-${status.colors.secondary} ${status.colors.glow}`}
                >
                  <Award className={`h-5 w-5 text-${status.colors.primary}`} />
                </div>
                <p className="text-sm text-gray-700">
                  <span className={`font-semibold text-${status.colors.text}`}>
                    Pro Tip:
                  </span>{" "}
                  {status.message}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`w-full py-3 px-4 rounded-xl bg-gradient-to-r ${status.colors.gradient} text-white font-medium ${status.colors.glow} 
              flex items-center justify-center`}
        >
          <span>Check Route Details</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="ml-2"
          >
            →
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SeatAvailability;
