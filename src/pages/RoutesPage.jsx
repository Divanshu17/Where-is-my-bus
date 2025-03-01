import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon, Bars3Icon, BookmarkIcon } from "@heroicons/react/24/outline";
import SideNavBar from "./components/SideNavBar.jsx";

function RoutesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [savedRoutes, setSavedRoutes] = useState([]);

  const routes = [
    {
      id: 1,
      number: "101",
      name: "JKLU-Mansarover",
      eta: "5 min",
      destination: [26.891839, 75.743184],
      stops: [[26.85117, 75.641325]],
    },
    {
      id: 2,
      number: "102",
      name: "JKLU-Tonk Phatak",
      eta: "10 min",
      destination: [27.00047, 75.770244],
      stops: [[26.9012, 75.7556], [26.9208, 75.765]],
    },
    {
      id: 3,
      number: "303",
      name: "Amer Fort",
      eta: "15 min",
      destination: [26.988241, 75.962551],
      stops: [[26.9356, 75.8754], [26.9608, 75.93]],
    },
  ];

  // Load saved routes from localStorage on page load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedRoutes")) || [];
    setSavedRoutes(saved);
  }, []);

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
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Menu Button */}
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-100">
            <Bars3Icon className="h-6 w-6 text-gray-600" />
          </button>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search routes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <SideNavBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Routes List */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {routes.map((route) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow flex justify-between items-center"
            >
              <div onClick={() => navigate(`/map/${route.id}?lat=${route.destination[0]}&lng=${route.destination[1]}&stops=${JSON.stringify(route.stops)}`)}>
                <h3 className="text-lg font-semibold text-gray-900">Bus {route.number}</h3>
                <p className="text-gray-600">{route.name}</p>
              </div>

              {/* Save Route Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSaveRoute(route);
                }}
                className={`p-2 rounded-full ${savedRoutes.some((saved) => saved.id === route.id) ? "text-blue-600" : "text-gray-400"} hover:bg-gray-100`}
              >
                <BookmarkIcon className="h-6 w-6" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoutesPage;
