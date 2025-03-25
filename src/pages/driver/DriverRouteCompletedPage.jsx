import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  UsersIcon,
  HomeIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import useTranslation from "../../hooks/useTranslation";

function DriverRouteCompletedPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslation();
  const routeId = location.state?.routeId;
  const [routeData, setRouteData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load route data (simulated)
  useEffect(() => {
    if (!routeId) {
      navigate("/driver/dashboard");
      return;
    }

    // Simulate API call to get route data
    setTimeout(() => {
      const mockRouteData = {
        id: routeId,
        name: "JKLU → Mansarover",
        startTime: "10:15 AM",
        endTime: "11:30 AM",
        duration: "1h 15m",
        busNumber: "RT-101",
        totalPassengers: 22,
        passengersPicked: 20,
        passengersDropped: 18,
        completed: true,
        completedAt: new Date().toLocaleString(),
      };

      setRouteData(mockRouteData);
      setIsLoading(false);
    }, 1000);
  }, [routeId, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0e6d2] to-[#d9c9a8]">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-[#f0e6d2]/90 shadow-md px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-[#d9c9a8]/70 transition-colors"
          >
            <ArrowLeftIcon className="h-6 w-6 text-gray-900" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">
            {t.routeCompleted}
          </h2>
          <div className="w-10"></div> {/* Empty div for alignment */}
        </div>
      </header>

      {/* Main Content */}
      <div className="px-6 py-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            {/* Success Animation */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.2,
                }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <CheckCircleIcon className="h-12 w-12 text-green-600" />
                </motion.div>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-bold text-gray-900 mb-2"
              >
                {t.routeCompletedSuccessfully}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-600"
              >
                {routeData.name}
              </motion.p>
            </div>

            {/* Route Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl shadow-md p-6 mb-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t.routeSummary}
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">{t.busNumber}</p>
                  <p className="text-gray-900 font-semibold">
                    {routeData.busNumber}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">{t.duration}</p>
                  <p className="text-gray-900 font-semibold">
                    {routeData.duration}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">{t.startTime}</p>
                  <p className="text-gray-900 font-semibold">
                    {routeData.startTime}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">{t.endTime}</p>
                  <p className="text-gray-900 font-semibold">
                    {routeData.endTime}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Passenger Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-xl shadow-md p-6 mb-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t.passengerStatistics}
              </h3>

              <div className="flex space-x-4 mb-4">
                <div className="flex-1 bg-blue-50 p-4 rounded-lg text-center">
                  <div className="flex justify-center mb-2">
                    <UsersIcon className="h-5 w-5 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {routeData.totalPassengers}
                  </p>
                  <p className="text-xs text-gray-600">{t.totalPassengers}</p>
                </div>
                <div className="flex-1 bg-green-50 p-4 rounded-lg text-center">
                  <div className="flex justify-center mb-2">
                    <UsersIcon className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {routeData.passengersPicked}
                  </p>
                  <p className="text-xs text-gray-600">{t.passengersPicked}</p>
                </div>
                <div className="flex-1 bg-amber-50 p-4 rounded-lg text-center">
                  <div className="flex justify-center mb-2">
                    <UsersIcon className="h-5 w-5 text-amber-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {routeData.passengersDropped}
                  </p>
                  <p className="text-xs text-gray-600">{t.passengersDropped}</p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col space-y-3"
            >
              <button
                onClick={() => navigate("/driver/dashboard")}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center"
              >
                <HomeIcon className="h-5 w-5 mr-2" />
                {t.returnToDashboard || "Return to Dashboard"}
              </button>
              <button
                onClick={() => navigate("/driver/shifts")}
                className="w-full py-3 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium flex items-center justify-center"
              >
                <ClockIcon className="h-5 w-5 mr-2" />
                {t.viewCurrentShift || "View Current Shift"}
              </button>
              <button
                onClick={() => navigate("/driver/schedule")}
                className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-800 rounded-lg font-medium flex items-center justify-center"
              >
                <CalendarIcon className="h-5 w-5 mr-2" />
                {t.viewSchedule || "View Schedule"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default DriverRouteCompletedPage;
