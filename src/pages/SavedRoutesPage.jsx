import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftIcon,
  BookmarkIcon,
  Bars3Icon,
  TrashIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
  StarIcon,
  TruckIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  BookmarkIcon as BookmarkIconSolid,
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";
import SideNavBar from "./components/SideNavBar";

function SavedRoutesPage() {
  const navigate = useNavigate();
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchClear, setShowSearchClear] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState(null);

  // Load saved routes from localStorage with a simulated delay
  useEffect(() => {
    const timer = setTimeout(() => {
    const saved = JSON.parse(localStorage.getItem("savedRoutes")) || [];
    setSavedRoutes(saved);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Update showSearchClear based on searchQuery
  useEffect(() => {
    setShowSearchClear(searchQuery.length > 0);
  }, [searchQuery]);

  const removeSavedRoute = (routeId) => {
    const updatedRoutes = savedRoutes.filter((route) => route.id !== routeId);
    setSavedRoutes(updatedRoutes);
    localStorage.setItem("savedRoutes", JSON.stringify(updatedRoutes));
    setShowDeleteConfirm(false);
    setRouteToDelete(null);
  };

  const confirmDelete = (route, e) => {
    e.stopPropagation();
    setRouteToDelete(route);
    setShowDeleteConfirm(true);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const viewRouteDetails = (route) => {
    setSelectedRoute(route);
  };

  const closeRouteDetails = () => {
    setSelectedRoute(null);
  };

  // Filter routes based on search query
  const filteredRoutes = savedRoutes.filter(
    (route) =>
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.number.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      transition: { duration: 0.2 },
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
            <BookmarkIconSolid className="h-6 w-6 mr-2 text-blue-500" />
            Saved Routes
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

      {/* Search Box */}
      <div className="px-6 pt-4">
        <div className="relative w-full mb-6">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 absolute left-4 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search saved routes"
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
      </div>

      {/* Saved Routes List */}
      <div className="px-6 pb-6">
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
                <BookmarkIconSolid className="h-10 w-10 text-blue-500" />
              </motion.div>
              <p className="text-gray-600">Loading saved routes...</p>
            </motion.div>
          ) : filteredRoutes.length > 0 ? (
            <motion.div
              key="routes-list"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {filteredRoutes.map((route) => (
            <motion.div
              key={route.id}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  onClick={() => viewRouteDetails(route)}
                  className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-[#d9c9a8] cursor-pointer transition-all duration-300"
                >
                  <div className="relative">
                    {/* Color bar at top */}
                    <div
                      className="h-1.5"
                      style={{ backgroundColor: route.color || "#3B82F6" }}
                    ></div>

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div
                          className="rounded-lg px-3 py-1.5 flex items-center space-x-1.5 text-white"
                          style={{ backgroundColor: route.color || "#3B82F6" }}
                        >
                          <TruckIcon className="h-4 w-4" />
                          <span className="font-medium">{route.number}</span>
                        </div>

                        {/* Delete button */}
                        <button
                          onClick={(e) => confirmDelete(route, e)}
                          className="p-2 rounded-full hover:bg-red-50 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {route.name}
                          </h3>

                          <div className="flex items-center mt-1 text-gray-600 text-sm space-x-4">
                            {route.stops && (
                              <div className="flex items-center">
                                <MapPinIcon className="h-4 w-4 mr-1" />
                                <span>{route.stops.length} stops</span>
                              </div>
                            )}

                            {route.eta && (
                              <div className="flex items-center text-amber-700">
                                <ClockIcon className="h-4 w-4 mr-1" />
                                <span className="font-medium">{route.eta}</span>
                              </div>
                            )}
                          </div>

                          {/* Popularity rating */}
                          {route.popularity && (
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
                          )}
                        </div>

                        {/* Visual indicator to view details */}
                        <div className="bg-[#f0e6d2] rounded-full p-2 text-gray-600 hover:bg-[#d9c9a8] hover:text-gray-800 transition-colors">
                          <ArrowRightIcon className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-8 text-center border border-[#d9c9a8] mt-4"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-[#f0e6d2] rounded-full flex items-center justify-center">
                <BookmarkIcon className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-gray-800 font-medium mb-2">
                No saved routes
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {searchQuery
                  ? "No routes match your search criteria"
                  : "You haven't saved any routes yet"}
              </p>
              <button
                onClick={() => navigate("/routes")}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
              >
                Browse routes
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Route Details Modal */}
      <AnimatePresence>
        {selectedRoute && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeRouteDetails}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div
                className="py-3 px-4 flex justify-between items-center"
                style={{ backgroundColor: selectedRoute.color || "#3B82F6" }}
              >
                <h3 className="font-bold text-white flex items-center">
                  <TruckIcon className="h-5 w-5 mr-2" />
                  Route {selectedRoute.number}
                </h3>
                <button
                  onClick={closeRouteDetails}
                  className="text-white/80 hover:text-white"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Modal content */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {selectedRoute.name}
                </h2>

                <div className="space-y-4">
                  {selectedRoute.stops && selectedRoute.stops.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Stops
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Total stops:</span>
                          <span className="font-medium">
                            {selectedRoute.stops.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedRoute.eta && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Estimated Time
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">ETA:</span>
                          <span className="font-medium text-amber-700">
                            {selectedRoute.eta}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedRoute.distance && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Distance
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Total distance:</span>
                          <span className="font-medium">
                            {selectedRoute.distance}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={(e) => {
                      confirmDelete(selectedRoute, e);
                      closeRouteDetails();
                    }}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Remove
                  </button>

                  <button
                    onClick={() => {
                      closeRouteDetails();
                      navigate(`/track/${selectedRoute.id}`);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Track Route
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl shadow-xl max-w-sm w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Remove Saved Route
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to remove "{routeToDelete?.name}" from
                  your saved routes?
                </p>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => removeSavedRoute(routeToDelete?.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
        </div>
            </motion.div>
          </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}

export default SavedRoutesPage;
