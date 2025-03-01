import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon, BookmarkIcon } from "@heroicons/react/24/outline";

function SavedRoutesPage() {
  const navigate = useNavigate();
  const [savedRoutes, setSavedRoutes] = useState([]);

  // Load saved routes from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedRoutes")) || [];
    setSavedRoutes(saved);
  }, []);

  const removeSavedRoute = (routeId) => {
    const updatedRoutes = savedRoutes.filter((route) => route.id !== routeId);
    setSavedRoutes(updatedRoutes);
    localStorage.setItem("savedRoutes", JSON.stringify(updatedRoutes));
  };

  return (
    <div className="min-h-screen bg-[#D9C9A8] px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white shadow-md">
          <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
        </button>
        <h2 className="text-xl font-semibold text-gray-900">Saved Routes</h2>
        <div className="w-10"></div>
      </div>

      {/* Saved Routes List */}
      {savedRoutes.length > 0 ? (
        <div className="space-y-4">
          {savedRoutes.map((route) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
            >
              <div onClick={() => navigate(`/map/${route.id}?lat=${route.destination[0]}&lng=${route.destination[1]}&stops=${JSON.stringify(route.stops)}`)}>
                <h3 className="text-lg font-semibold text-gray-900">Bus {route.number}</h3>
                <p className="text-gray-600">{route.name}</p>
              </div>

              {/* Remove Saved Route */}
              <button onClick={() => removeSavedRoute(route.id)} className="text-red-600 p-2 rounded-full hover:bg-gray-100">
                <BookmarkIcon className="h-6 w-6" />
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No saved routes yet.</p>
      )}
    </div>
  );
}

export default SavedRoutesPage;
