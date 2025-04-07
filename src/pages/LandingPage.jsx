import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPinIcon,
  ClockIcon,
  BellIcon,
  ArrowRightIcon,
  DevicePhoneMobileIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Logo from "../assets/Logo2.png";
import HawaMahalBg from "../assets/hawamahal_background.png";

function LandingPage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Features data
  const features = [
    {
      icon: <MapPinIcon className="h-6 w-6" />,
      title: "Real-time Tracking",
      description:
        "Track buses on the map in real-time with accurate GPS positioning",
      color: "from-blue-500 to-blue-600",
      delay: 0.2,
    },
    {
      icon: <ClockIcon className="h-6 w-6" />,
      title: "ETA Updates",
      description: "Get precise arrival time estimates updated in real-time",
      color: "from-amber-500 to-amber-600",
      delay: 0.3,
    },
    {
      icon: <BellIcon className="h-6 w-6" />,
      title: "Notifications",
      description: "Receive alerts about delays, route changes, and arrivals",
      color: "from-green-500 to-green-600",
      delay: 0.4,
    },
    {
      icon: <DevicePhoneMobileIcon className="h-6 w-6" />,
      title: "Mobile Tickets",
      description: "Purchase and store tickets directly on your phone",
      color: "from-purple-500 to-purple-600",
      delay: 0.5,
    },
  ];

  // Animated bus route
  const busRoute = [
    { x: "-10%", y: "20%" },
    { x: "30%", y: "10%" },
    { x: "60%", y: "30%" },
    { x: "90%", y: "15%" },
    { x: "120%", y: "25%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0e6d2] to-[#d9c9a8] relative overflow-x-hidden">
      {/* Hawa Mahal PNG Background */}
      <div className="absolute right-0 top-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 2 }}
          className="absolute right-0 top-[5%] w-[80%] h-[80%] flex justify-end items-start"
        >
          <img
            src={HawaMahalBg}
            alt="Hawa Mahal"
            className="object-contain max-w-full max-h-full"
          />
        </motion.div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Hawa Mahal background silhouette */}
        <div className="absolute right-0 bottom-0 w-full h-full opacity-[0.07] overflow-hidden">
          <motion.svg
            width="100%"
            height="100%"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMaxYMax slice"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-pink-800"
          >
            {/* Main structure */}
            <path
              d="M600,800 L600,200 L900,200 L900,800 Z"
              fill="currentColor"
            />
            <path
              d="M300,800 L300,300 L600,200 L600,800 Z"
              fill="currentColor"
            />

            {/* Towers and details */}
            <path
              d="M400,300 L400,150 L450,100 L500,150 L500,300 Z"
              fill="currentColor"
            />
            <path
              d="M700,200 L700,100 L750,50 L800,100 L800,200 Z"
              fill="currentColor"
            />
            <path
              d="M550,200 L550,120 L600,70 L650,120 L650,200 Z"
              fill="currentColor"
            />

            {/* Windows and arches - left section */}
            <path
              d="M320,350 L320,320 A15,15 0 0,1 350,320 L350,350 Z"
              fill="currentColor"
            />
            <path
              d="M380,350 L380,320 A15,15 0 0,1 410,320 L410,350 Z"
              fill="currentColor"
            />
            <path
              d="M440,350 L440,320 A15,15 0 0,1 470,320 L470,350 Z"
              fill="currentColor"
            />
            <path
              d="M500,350 L500,320 A15,15 0 0,1 530,320 L530,350 Z"
              fill="currentColor"
            />
            <path
              d="M560,350 L560,320 A15,15 0 0,1 590,320 L590,350 Z"
              fill="currentColor"
            />

            <path
              d="M320,420 L320,390 A15,15 0 0,1 350,390 L350,420 Z"
              fill="currentColor"
            />
            <path
              d="M380,420 L380,390 A15,15 0 0,1 410,390 L410,420 Z"
              fill="currentColor"
            />
            <path
              d="M440,420 L440,390 A15,15 0 0,1 470,390 L470,420 Z"
              fill="currentColor"
            />
            <path
              d="M500,420 L500,390 A15,15 0 0,1 530,390 L530,420 Z"
              fill="currentColor"
            />
            <path
              d="M560,420 L560,390 A15,15 0 0,1 590,390 L590,420 Z"
              fill="currentColor"
            />

            <path
              d="M320,490 L320,460 A15,15 0 0,1 350,460 L350,490 Z"
              fill="currentColor"
            />
            <path
              d="M380,490 L380,460 A15,15 0 0,1 410,460 L410,490 Z"
              fill="currentColor"
            />
            <path
              d="M440,490 L440,460 A15,15 0 0,1 470,460 L470,490 Z"
              fill="currentColor"
            />
            <path
              d="M500,490 L500,460 A15,15 0 0,1 530,460 L530,490 Z"
              fill="currentColor"
            />
            <path
              d="M560,490 L560,460 A15,15 0 0,1 590,460 L590,490 Z"
              fill="currentColor"
            />

            {/* Windows and arches - right section */}
            <path
              d="M620,350 L620,320 A15,15 0 0,1 650,320 L650,350 Z"
              fill="currentColor"
            />
            <path
              d="M680,350 L680,320 A15,15 0 0,1 710,320 L710,350 Z"
              fill="currentColor"
            />
            <path
              d="M740,350 L740,320 A15,15 0 0,1 770,320 L770,350 Z"
              fill="currentColor"
            />
            <path
              d="M800,350 L800,320 A15,15 0 0,1 830,320 L830,350 Z"
              fill="currentColor"
            />
            <path
              d="M860,350 L860,320 A15,15 0 0,1 890,320 L890,350 Z"
              fill="currentColor"
            />

            <path
              d="M620,420 L620,390 A15,15 0 0,1 650,390 L650,420 Z"
              fill="currentColor"
            />
            <path
              d="M680,420 L680,390 A15,15 0 0,1 710,390 L710,420 Z"
              fill="currentColor"
            />
            <path
              d="M740,420 L740,390 A15,15 0 0,1 770,390 L770,420 Z"
              fill="currentColor"
            />
            <path
              d="M800,420 L800,390 A15,15 0 0,1 830,390 L830,420 Z"
              fill="currentColor"
            />
            <path
              d="M860,420 L860,390 A15,15 0 0,1 890,390 L890,420 Z"
              fill="currentColor"
            />

            <path
              d="M620,490 L620,460 A15,15 0 0,1 650,460 L650,490 Z"
              fill="currentColor"
            />
            <path
              d="M680,490 L680,460 A15,15 0 0,1 710,460 L710,490 Z"
              fill="currentColor"
            />
            <path
              d="M740,490 L740,460 A15,15 0 0,1 770,460 L770,490 Z"
              fill="currentColor"
            />
            <path
              d="M800,490 L800,460 A15,15 0 0,1 830,460 L830,490 Z"
              fill="currentColor"
            />
            <path
              d="M860,490 L860,460 A15,15 0 0,1 890,460 L890,490 Z"
              fill="currentColor"
            />

            {/* Decorative elements */}
            <path
              d="M400,150 L420,130 L430,140 L450,100 L470,140 L480,130 L500,150"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M700,100 L720,80 L730,90 L750,50 L770,90 L780,80 L800,100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M550,120 L570,100 L580,110 L600,70 L620,110 L630,100 L650,120"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </motion.svg>
        </div>

        {/* Animated bubbles with Jaipur colors */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-pink-500/10 to-amber-500/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
            }}
            animate={{
              y: [0, Math.random() * 50 - 25],
              x: [0, Math.random() * 50 - 25],
              scale: [1, Math.random() * 0.3 + 0.9],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Glass effect header with Jaipur-themed elements */}
        <div className="relative backdrop-blur-md bg-white/10 border-b border-pink-100">
          {/* Decorative Jaipur pattern border */}
          <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-pink-500 via-amber-500 to-pink-500"></div>
          </div>

          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="relative">
                <img src={Logo} alt="Logo" className="h-10 mr-3" />
                {/* Small decorative element */}
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </div>
              <div className="flex flex-col">
                <h1 className="font-bold text-2xl bg-gradient-to-r from-pink-600 to-amber-600 bg-clip-text text-transparent">
                  JaipurBus
                </h1>
                <div className="text-xs text-pink-700 font-medium">
                  Explore the Pink City
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="#features"
                  className="text-sm font-medium text-pink-800 hover:text-pink-600 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#about"
                  className="text-sm font-medium text-pink-800 hover:text-pink-600 transition-colors"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="text-sm font-medium text-pink-800 hover:text-pink-600 transition-colors"
                >
                  Contact
                </a>
              </div>
              <button
                onClick={() => navigate("/signin-selection")}
                className="hidden md:flex items-center px-4 py-2 bg-gradient-to-r from-pink-600 to-amber-600 text-white rounded-full hover:from-pink-700 hover:to-amber-700 transition-all shadow-md hover:shadow-lg"
              >
                <span>Sign In</span>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 2,
                  }}
                  className="ml-1"
                >
                  <ArrowRightIcon className="h-4 w-4" />
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-pink-600 to-amber-600 bg-clip-text text-transparent">
                    Where is My Bus
                  </span>
                  <span className="text-4xl md:text-5xl text-gray-700 font-bold">
                    {" "}
                    in Jaipur
                  </span>
                </h1>
                <p className="text-xl text-gray-700 mb-8 max-w-lg">
                  Track your bus in real-time across the Pink City and never
                  miss a ride
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/signin-selection")}
                    className="px-8 py-4 bg-gradient-to-r from-pink-600 to-amber-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                  >
                    Get Started
                    <ArrowRightIcon className="h-5 w-5 ml-2" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/routes")}
                    className="px-8 py-4 bg-white text-pink-600 border border-pink-200 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    Find Routes
                  </motion.button>
                </div>
              </motion.div>
            </div>
            <div className="md:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                {/* Phone mockup with improved design */}
                <div className="relative mx-auto w-[300px] h-[600px] bg-gray-900 rounded-[3rem] border-[14px] border-gray-900 shadow-2xl overflow-hidden">
                  {/* Phone screen with Jaipur-themed gradient */}
                  <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#FDF2E9] to-[#FCE4D6]">
                    {/* Notch */}
                    <div className="absolute top-0 inset-x-0 h-7 bg-gray-900 rounded-b-xl w-1/3 mx-auto z-50"></div>

                    {/* App UI mockup */}
                    <div className="h-full flex flex-col">
                      {/* App header with Jaipur theme */}
                      <div className="flex justify-between items-center p-4 pb-2">
                        <div className="text-base font-bold text-pink-800 flex items-center">
                          <svg
                            className="w-5 h-5 mr-1 text-pink-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                            />
                          </svg>
                          JaipurBus
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-5 h-5 bg-pink-500 rounded-full shadow-sm"></div>
                          <div className="w-5 h-5 bg-amber-400 rounded-full shadow-sm"></div>
                        </div>
                      </div>

                      {/* Map view - now with Jaipur theme */}
                      <div className="flex-1 relative overflow-hidden">
                        {/* Map background with Jaipur-themed colors */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#FDF2E9] to-[#FCE4D6]"></div>

                        {/* Grid lines - with Jaipur pink tint */}
                        <div className="absolute inset-0">
                          {[...Array(12)].map((_, i) => (
                            <div
                              key={`h-${i}`}
                              className="absolute h-[0.5px] w-full bg-pink-200/50"
                              style={{ top: `${i * 8.33}%` }}
                            />
                          ))}
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={`v-${i}`}
                              className="absolute w-[0.5px] h-full bg-pink-200/50"
                              style={{ left: `${i * 12.5}%` }}
                            />
                          ))}
                        </div>

                        {/* Main roads - Jaipur-themed */}
                        <div className="absolute top-[40%] left-0 right-0 h-1.5 bg-amber-100/80"></div>
                        <div className="absolute top-0 bottom-0 left-[25%] w-1.5 bg-amber-100/80"></div>
                        <div className="absolute top-0 bottom-0 right-[35%] w-1.5 bg-amber-100/80"></div>
                        <div className="absolute top-0 bottom-0 right-[15%] w-1.5 bg-amber-100/80"></div>

                        {/* Hawa Mahal silhouette */}
                        <div className="absolute top-[10%] left-[10%] z-10">
                          <motion.svg
                            width="50"
                            height="50"
                            viewBox="0 0 100 100"
                            fill="none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-pink-800/80"
                          >
                            <path
                              d="M20,90 L20,40 L30,30 L40,40 L50,30 L60,40 L70,30 L80,40 L80,90 Z"
                              fill="currentColor"
                            />
                            <path
                              d="M30,90 L30,50 L40,45 L50,50 L60,45 L70,50 L70,90 Z"
                              fill="#FBD38D"
                            />
                            <path
                              d="M35,70 L35,55 A5,5 0 0,1 40,50 A5,5 0 0,1 45,55 L45,70 Z"
                              fill="#FEEBC8"
                            />
                            <path
                              d="M55,70 L55,55 A5,5 0 0,1 60,50 A5,5 0 0,1 65,55 L65,70 Z"
                              fill="#FEEBC8"
                            />
                            <path
                              d="M45,50 L45,40 A5,5 0 0,1 50,35 A5,5 0 0,1 55,40 L55,50 Z"
                              fill="#FEEBC8"
                            />
                            <path
                              d="M25,60 L25,50 A3,3 0 0,1 28,47 A3,3 0 0,1 31,50 L31,60 Z"
                              fill="#FEEBC8"
                            />
                            <path
                              d="M69,60 L69,50 A3,3 0 0,1 72,47 A3,3 0 0,1 75,50 L75,60 Z"
                              fill="#FEEBC8"
                            />
                          </motion.svg>
                        </div>

                        {/* Jal Mahal silhouette */}
                        <div className="absolute top-[20%] right-[15%] z-10">
                          <motion.svg
                            width="40"
                            height="30"
                            viewBox="0 0 100 70"
                            fill="none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.7 }}
                            className="text-amber-700/70"
                          >
                            <rect
                              x="20"
                              y="30"
                              width="60"
                              height="40"
                              fill="currentColor"
                            />
                            <rect
                              x="30"
                              y="10"
                              width="40"
                              height="20"
                              fill="currentColor"
                            />
                            <rect
                              x="35"
                              y="40"
                              width="10"
                              height="15"
                              fill="#FEEBC8"
                            />
                            <rect
                              x="55"
                              y="40"
                              width="10"
                              height="15"
                              fill="#FEEBC8"
                            />
                            <rect
                              x="45"
                              y="15"
                              width="10"
                              height="15"
                              fill="#FEEBC8"
                            />
                            <path
                              d="M30,10 L45,0 L70,0 L70,10 Z"
                              fill="currentColor"
                            />
                          </motion.svg>
                        </div>

                        {/* Bus route - Jaipur-themed color */}
                        <svg className="absolute inset-0 w-full h-full">
                          <motion.path
                            d="M0,250 C60,240 120,230 180,230 S240,240 300,250"
                            fill="none"
                            stroke="#E53E3E"
                            strokeWidth="3"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                          />
                          {/* Add a glow effect to the route */}
                          <motion.path
                            d="M0,250 C60,240 120,230 180,230 S240,240 300,250"
                            fill="none"
                            stroke="#E53E3E"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeOpacity="0.2"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.5 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                          />
                        </svg>

                        {/* Amber Fort area */}
                        <motion.div
                          className="absolute top-[30%] left-[20%] w-16 h-16 bg-amber-200/40 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        >
                          {/* Add a subtle pulse to the area */}
                          <motion.div
                            className="absolute inset-0 rounded-full bg-amber-300/20"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.3, 0.1, 0.3],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              repeatType: "loop",
                            }}
                          />
                        </motion.div>

                        {/* Bus icon - Jaipur-themed */}
                        <motion.div
                          className="absolute top-[15%] left-[15%] w-12 h-12 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center z-10 shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <span className="text-white text-sm">🚌</span>
                          {/* Improved pulsing effect */}
                          <motion.div
                            className="absolute inset-0 rounded-full bg-pink-400"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.7, 0, 0.7],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatType: "loop",
                            }}
                          />
                        </motion.div>

                        {/* Hawa Mahal Station marker */}
                        <div className="absolute top-[25%] left-[30%]">
                          <motion.div
                            className="w-8 h-8 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </motion.div>
                          {/* Hawa Mahal Station label */}
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                            className="absolute top-[-5px] left-8 bg-white px-3 py-2 rounded-lg shadow-xl text-xs whitespace-nowrap z-20 border border-gray-100"
                          >
                            <div className="font-medium text-gray-800 text-sm">
                              Hawa Mahal
                            </div>
                            <div className="text-pink-500 text-[11px] font-medium">
                              Departing soon
                            </div>
                          </motion.div>
                        </div>

                        {/* City Palace marker */}
                        <div className="absolute top-[20%] right-[25%]">
                          <motion.div
                            className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                          >
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </motion.div>
                          {/* City Palace label */}
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="absolute top-[-5px] left-8 bg-white px-3 py-2 rounded-lg shadow-xl text-xs whitespace-nowrap z-20 border border-gray-100"
                          >
                            <div className="font-medium text-gray-800 text-sm">
                              City Palace
                            </div>
                            <div className="text-amber-500 text-[11px] font-medium">
                              Arriving in 5 min
                            </div>
                          </motion.div>
                        </div>

                        {/* Your location - Jaipur-themed */}
                        <div className="absolute top-[35%] left-[40%] z-20">
                          <motion.div
                            className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                          >
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </motion.div>
                          {/* Pulsing rings */}
                          <motion.div
                            className="absolute -inset-2 rounded-full border-2 border-blue-400/50"
                            animate={{
                              scale: [1, 1.8],
                              opacity: [0.7, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                            }}
                          />
                          {/* Your location label */}
                          <motion.div
                            className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                          >
                            Your location
                          </motion.div>
                        </div>

                        {/* Map controls */}
                        <div className="absolute top-3 right-3 flex flex-col bg-white rounded-lg overflow-hidden shadow-xl border border-gray-100">
                          <motion.button
                            className="w-9 h-9 flex items-center justify-center text-gray-700 text-sm font-bold"
                            whileHover={{ backgroundColor: "#f8fafc" }}
                          >
                            +
                          </motion.button>
                          <div className="w-full h-px bg-gray-200"></div>
                          <motion.button
                            className="w-9 h-9 flex items-center justify-center text-gray-700 text-sm font-bold"
                            whileHover={{ backgroundColor: "#f8fafc" }}
                          >
                            -
                          </motion.button>
                        </div>

                        {/* Compass */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1, duration: 0.5 }}
                          className="absolute bottom-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center text-sm font-bold text-gray-700 shadow-lg border border-gray-100"
                        >
                          N
                        </motion.div>

                        {/* Search bar - Jaipur-themed */}
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2, duration: 0.5 }}
                          className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg flex items-center w-4/5 border border-gray-100"
                        >
                          <svg
                            className="w-4 h-4 text-pink-500 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          <span className="text-gray-400 text-sm">
                            Search Jaipur landmarks...
                          </span>
                        </motion.div>

                        {/* Map interaction animation */}
                        <motion.div
                          className="absolute inset-0 bg-transparent pointer-events-none"
                          animate={{
                            scale: [1, 1.02, 1],
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Jaipur-themed decorative elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-pink-400/30 to-amber-300/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-gradient-to-tr from-amber-400/30 to-pink-300/20 rounded-full blur-xl"></div>
                <div className="absolute top-1/3 -right-16 w-20 h-20 bg-gradient-to-bl from-pink-500/20 to-amber-400/10 rounded-full blur-xl"></div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            >
              <span className="text-gray-600 text-sm mb-2">
                Scroll to explore
              </span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDownIcon className="h-6 w-6 text-gray-600" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how BusTracker makes your daily commute easier, more
              reliable, and stress-free
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: feature.delay }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                <div className="p-6">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-10 md:p-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to never miss your bus again?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of commuters who have made their daily travel more
              efficient and stress-free with BusTracker
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/signin-selection")}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center"
            >
              Get Started
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </motion.button>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-60 h-60 bg-amber-400/20 rounded-full blur-3xl"></div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <img src={Logo} alt="Logo" className="h-10 mr-3" />
              <h2 className="text-xl font-bold">BusTracker</h2>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-blue-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} BusTracker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
