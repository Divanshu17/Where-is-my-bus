import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  BookmarkIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import SideNavBar from "./components/SideNavBar.jsx";

function RoutesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [savedRoutes, setSavedRoutes] = useState([]);

  // Load saved routes from localStorage when component mounts
  useEffect(() => {
    const storedRoutes = JSON.parse(localStorage.getItem("savedRoutes")) || [];
    setSavedRoutes(storedRoutes);
  }, []);

  // Routes with stops (waypoints)
  const routes = [
    {
      id: 1,
      number: "101",
      name: "JKLU-Mansarover",
      eta: "5 min",
      destination: [26.891839, 75.743184], // Final destination
      stops: [[26.85117, 75.641325]], // Stop 1
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
    },
  ];

  // Filter routes based on search query
  const filteredRoutes = routes.filter(
    (route) =>
      route.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <div className="min-h-screen bg-[#D9C9A8] relative px-4 py-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        {/* Menu Button */}
        <button onClick={() => setIsSidebarOpen(true)} className="p-2">
          <Bars3Icon className="h-6 w-6 text-gray-900" />
        </button>
        <h2 className="text-[22px] font-extrabold tracking-wider uppercase text-gray-900">
          ROUTES
        </h2>
        <div className="w-10"></div>
      </header>

      {/* Search Box */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-full max-w-md mb-4">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Enter Bus No"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-200 rounded-full focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="w-full max-w-md py-3 bg-blue-600 text-white rounded-lg font-semibold">
          Search
        </button>
      </div>

      {/* Sidebar */}
      <SideNavBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Routes List */}
      <div className="max-w-7xl mx-auto space-y-4">
        {filteredRoutes.map((route) => {
          const isSaved = savedRoutes.some((saved) => saved.id === route.id);

          return (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border-b border-gray-700 flex justify-between items-center cursor-pointer"
              onClick={() => navigate(`/track/${route.id}`)}
            >
              {/* Route Info */}
              <div className="flex flex-col">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="border border-gray-700 rounded-md px-2 py-1 flex items-center space-x-1">
                    <TruckIcon className="h-4 w-4 text-gray-800" />{" "}
                    <span className="text-gray-800 text-sm">
                      {route.number}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">{route.eta}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {route.name}
                </h3>
              </div>

              {/* Save Route Button (Toggle between Outline & Solid) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSaveRoute(route);
                }}
                className="transition-transform hover:scale-110"
              >
                {isSaved ? (
                  <BookmarkIconSolid className="h-6 w-6 text-blue-600" />
                ) : (
                  <BookmarkIcon className="h-6 w-6 text-gray-600" />
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default RoutesPage;
