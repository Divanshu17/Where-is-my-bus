import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  BookmarkIcon,
  TruckIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
  StarIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  ArrowPathIcon,
  MapIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import {
  BookmarkIcon as BookmarkIconSolid,
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";
import SideNavBar from "./components/SideNavBar.jsx";

function RoutesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // "all" or "saved"
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all"); // "all", "popular", "nearest", "fastest"
  const [showSearchClear, setShowSearchClear] = useState(false);

  // Refs for scroll animations
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef);

  // Load saved routes from localStorage when component mounts
  useEffect(() => {
    const storedRoutes = JSON.parse(localStorage.getItem("savedRoutes")) || [];
    setSavedRoutes(storedRoutes);

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Update showSearchClear based on searchQuery
  useEffect(() => {
    setShowSearchClear(searchQuery.length > 0);
  }, [searchQuery]);

  // Routes with stops (waypoints)
  const routes = [
    {
      id: 1,
      number: "101",
      name: "JKLU-Mansarover",
      eta: "5 min",
      destination: [26.891839, 75.743184], // Final destination
      stops: [[26.85117, 75.641325]], // Stop 1
      color: "#4F46E5", // Indigo
      popularity: 4.8,
      distance: "2.3 km",
      departureTime: "10:15 AM",
      arrivalTime: "10:45 AM",
      fare: "₹25",
      busType: "AC",
    },
    {
      id: 2,
      number: "102",
      name: "JKLU-Tonk Phatak",
      eta: "10 min",
      destination: [27.00047, 75.770244],
      stops: [
        [26.9012, 75.7556],
        [26.9208, 75.765],
      ],
      color: "#0EA5E9", // Sky blue
      popularity: 4.5,
      distance: "3.7 km",
      departureTime: "10:30 AM",
      arrivalTime: "11:15 AM",
      fare: "₹30",
      busType: "Non-AC",
    },
    {
      id: 3,
      number: "303",
      name: "Amer Fort",
      eta: "15 min",
      destination: [26.988241, 75.962551],
      stops: [
        [26.9356, 75.8754],
        [26.9608, 75.93],
      ],
      color: "#10B981", // Emerald
      popularity: 4.2,
      distance: "5.1 km",
      departureTime: "11:00 AM",
      arrivalTime: "11:45 AM",
      fare: "₹35",
      busType: "AC",
    },
    {
      id: 4,
      number: "205",
      name: "City Palace",
      eta: "8 min",
      destination: [26.925771, 75.826735],
      stops: [
        [26.9012, 75.7556],
        [26.9208, 75.765],
      ],
      color: "#F59E0B", // Amber
      popularity: 4.6,
      distance: "4.2 km",
      departureTime: "10:45 AM",
      arrivalTime: "11:20 AM",
      fare: "₹28",
      busType: "AC",
    },
    {
      id: 5,
      number: "404",
      name: "Hawa Mahal",
      eta: "12 min",
      destination: [26.923936, 75.826744],
      stops: [[26.9012, 75.7556]],
      color: "#EC4899", // Pink
      popularity: 4.3,
      distance: "3.9 km",
      departureTime: "11:15 AM",
      arrivalTime: "11:50 AM",
      fare: "₹32",
      busType: "Non-AC",
    },
  ];

  // Filter and sort routes based on search query, active tab, and selected filter
  const getFilteredRoutes = () => {
    let filtered = routes.filter((route) => {
      const matchesSearch =
        route.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.name.toLowerCase().includes(searchQuery.toLowerCase());

      if (activeTab === "all") return matchesSearch;
      return (
        matchesSearch && savedRoutes.some((saved) => saved.id === route.id)
      );
    });

    // Apply sorting based on selected filter
    if (selectedFilter === "popular") {
      filtered = [...filtered].sort((a, b) => b.popularity - a.popularity);
    } else if (selectedFilter === "nearest") {
      filtered = [...filtered].sort(
        (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
      );
    } else if (selectedFilter === "fastest") {
      filtered = [...filtered].sort(
        (a, b) => parseInt(a.eta) - parseInt(b.eta)
      );
    }

    return filtered;
  };

  const filteredRoutes = getFilteredRoutes();

  // Function to toggle saving a route
  const toggleSaveRoute = (route) => {
    let updatedSavedRoutes = [...savedRoutes];

    if (savedRoutes.some((saved) => saved.id === route.id)) {
      updatedSavedRoutes = savedRoutes.filter((saved) => saved.id !== route.id);
    } else {
      updatedSavedRoutes.push(route);
    }

    setSavedRoutes(updatedSavedRoutes);
    localStorage.setItem("savedRoutes", JSON.stringify(updatedSavedRoutes));
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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

  const filterVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.3,
        },
        opacity: {
          duration: 0.2,
          delay: 0.1,
        },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.3,
        },
        opacity: {
          duration: 0.2,
        },
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
      <header
        ref={headerRef}
        className={`sticky top-0 z-20 backdrop-blur-md bg-[#f0e6d2]/80 shadow-sm transition-all duration-300 ${
          headerInView ? "py-6" : "py-4"
        }`}
      >
        <div className="px-6 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-full hover:bg-[#d9c9a8]/50 transition-colors"
          >
            <Bars3Icon className="h-6 w-6 text-gray-800" />
          </button>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
          >
            Find Your Bus
          </motion.h2>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`p-2 rounded-full transition-colors ${
              isFilterOpen
                ? "bg-blue-500 text-white"
                : "hover:bg-[#d9c9a8]/50 text-gray-800"
            }`}
          >
            <AdjustmentsHorizontalIcon className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Search Box with Visual Enhancement */}
      <div className="px-6 pt-4">
        <div className="relative w-full mb-4">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 absolute left-4 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by route number or name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 bg-white/80 backdrop-blur-sm border border-[#d9c9a8] rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
          {showSearchClear && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Filter section */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              variants={filterVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden mb-4"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-[#d9c9a8] shadow-sm">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Sort Routes By:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "Default" },
                    { id: "popular", label: "Most Popular" },
                    { id: "nearest", label: "Nearest" },
                    { id: "fastest", label: "Fastest" },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedFilter === filter.id
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-[#e8dcc8] text-gray-700 hover:bg-[#d9c9a8]"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-4 border-b border-[#d9c9a8]">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              activeTab === "all"
                ? "text-gray-900"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            All Routes
            {activeTab === "all" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-2 font-medium text-sm transition-colors relative flex items-center ${
              activeTab === "saved"
                ? "text-gray-900"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Saved Routes
            {savedRoutes.length > 0 && (
              <span className="ml-1.5 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {savedRoutes.length}
              </span>
            )}
            {activeTab === "saved" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
              />
            )}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <SideNavBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Routes List with Enhanced Visuals */}
      <div className="px-6 pb-20">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="mb-4"
              >
                <ArrowPathIcon className="h-10 w-10 text-blue-500" />
              </motion.div>
              <p className="text-gray-600">
                Finding the best routes for you...
              </p>
            </motion.div>
          ) : filteredRoutes.length > 0 ? (
            <motion.div
              key="routes-list"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-5"
            >
              {filteredRoutes.map((route) => {
                const isSaved = savedRoutes.some(
                  (saved) => saved.id === route.id
                );

                return (
                  <motion.div
                    key={route.id}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-[#d9c9a8]"
                  >
                    <div className="relative">
                      {/* Color bar at top */}
                      <div
                        className="h-1.5"
                        style={{ backgroundColor: route.color }}
                      ></div>

                      <div
                        className="p-4 cursor-pointer"
                        onClick={() => navigate(`/track/${route.id}`)}
                      >
                        {/* Route number badge with custom color */}
                        <div className="flex justify-between items-start mb-3">
                          <div
                            className="rounded-lg px-3 py-1.5 flex items-center space-x-1.5 text-white"
                            style={{ backgroundColor: route.color }}
                          >
                            <TruckIcon className="h-4 w-4" />
                            <span className="font-medium">{route.number}</span>
                          </div>

                          {/* Save Route Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSaveRoute(route);
                            }}
                            className="p-2 rounded-full hover:bg-[#f0e6d2] transition-all"
                          >
                            <motion.div
                              whileTap={{ scale: 1.3 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                              }}
                            >
                              {isSaved ? (
                                <BookmarkIconSolid className="h-6 w-6 text-blue-500" />
                              ) : (
                                <BookmarkIcon className="h-6 w-6 text-gray-500" />
                              )}
                            </motion.div>
                          </button>
                        </div>

                        {/* Route Info */}
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {route.name}
                            </h3>

                            <div className="flex items-center mt-1 text-gray-600 text-sm space-x-4">
                              <div className="flex items-center">
                                <MapPinIcon className="h-4 w-4 mr-1" />
                                <span>{route.stops.length} stops</span>
                              </div>

                              <div className="flex items-center text-amber-700">
                                <ClockIcon className="h-4 w-4 mr-1" />
                                <span className="font-medium">{route.eta}</span>
                              </div>
                            </div>

                            {/* Popularity rating */}
                            <div className="flex items-center mt-2">
                              {[...Array(5)].map((_, i) => (
                                <span key={i}>
                                  {i < Math.floor(route.popularity) ? (
                                    <StarIconSolid className="h-4 w-4 text-amber-500" />
                                  ) : i < route.popularity ? (
                                    <StarIconSolid className="h-4 w-4 text-amber-500 opacity-50" />
                                  ) : (
                                    <StarIcon className="h-4 w-4 text-gray-400" />
                                  )}
                                </span>
                              ))}
                              <span className="ml-1 text-xs text-gray-600">
                                ({route.popularity})
                              </span>
                            </div>
                          </div>

                          {/* Visual indicator to view details */}
                          <div className="bg-[#f0e6d2] rounded-full p-2 text-gray-600 hover:bg-[#d9c9a8] hover:text-gray-800 transition-colors">
                            <ArrowRightIcon className="h-5 w-5" />
                          </div>
                        </div>

                        {/* Additional route details */}
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="flex flex-col">
                              <span className="text-gray-500">Distance</span>
                              <span className="font-medium text-gray-800">
                                {route.distance}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-gray-500">Fare</span>
                              <span className="font-medium text-gray-800">
                                {route.fare}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-gray-500">Type</span>
                              <span className="font-medium text-gray-800">
                                {route.busType}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="no-routes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-8 text-center border border-[#d9c9a8]"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-[#f0e6d2] rounded-full flex items-center justify-center">
                <MagnifyingGlassIcon className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-gray-800 font-medium mb-2">
                No routes found
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {activeTab === "saved"
                  ? "You haven't saved any routes yet"
                  : "Try adjusting your search criteria"}
              </p>
              {activeTab === "saved" && (
                <button
                  onClick={() => setActiveTab("all")}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
                >
                  Browse all routes
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg border-t border-[#d9c9a8] z-10">
        <div className="flex justify-around items-center py-3 px-6">
          <button
            className="flex flex-col items-center text-blue-500"
            onClick={() => navigate("/routes")}
          >
            <MapIcon className="h-6 w-6" />
            <span className="text-xs mt-1 font-medium">Routes</span>
          </button>
          <button
            className="flex flex-col items-center text-gray-500 hover:text-gray-700"
            onClick={() => navigate("/track/1")}
          >
            <TruckIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Track</span>
          </button>
          <button
            className="flex flex-col items-center text-gray-500 hover:text-gray-700"
            onClick={() => navigate("/notifications")}
          >
            <BellIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Alerts</span>
          </button>
          <button
            className="flex flex-col items-center text-gray-500 hover:text-gray-700"
            onClick={() => navigate("/saved-routes")}
          >
            <BookmarkIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Saved</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoutesPage;
