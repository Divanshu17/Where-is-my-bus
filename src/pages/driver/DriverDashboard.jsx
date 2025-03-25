import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bars3Icon,
  UserIcon,
  ClockIcon,
  MapPinIcon,
  ChartBarIcon,
  TruckIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import useTranslation from "../../hooks/useTranslation";
import DriverSideNavBar from "./components/DriverSideNavBar";

function DriverDashboard() {
  const navigate = useNavigate();
  const t = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [driverInfo, setDriverInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState("");
  const [upcomingRoutes, setUpcomingRoutes] = useState([]);
  const [showStartShiftModal, setShowStartShiftModal] = useState(false);
  const [busNumber, setBusNumber] = useState("");
  const [swipeComplete, setSwipeComplete] = useState(false);
  const swipeControls = { start: () => {} };

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(t.goodMorning || "Good Morning");
    else if (hour < 18) setGreeting(t.goodAfternoon || "Good Afternoon");
    else setGreeting(t.goodEvening || "Good Evening");
  }, [t]);

  // Simulate loading driver data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDriverInfo({
        name: "John Driver",
        status: "offline", // offline, available, on_route
        totalTrips: 758,
        hoursThisMonth: 124,
        distanceThisMonth: 1480,
      });

      setUpcomingRoutes([
        {
          id: "RT101",
          name: "JKLU → Mansarover",
          startTime: "10:15 AM",
          endTime: "11:30 AM",
          date: "Today",
          passengers: 22,
          status: "upcoming",
          stopCount: 5,
        },
        {
          id: "RT102",
          name: "Mansarover → JKLU",
          startTime: "05:30 PM",
          endTime: "06:45 PM",
          date: "Today",
          passengers: 18,
          status: "upcoming",
          stopCount: 4,
        },
        {
          id: "RT103",
          name: "JKLU → Railway Station",
          startTime: "09:00 AM",
          endTime: "10:30 AM",
          date: "Tomorrow",
          passengers: 25,
          status: "scheduled",
          stopCount: 6,
        },
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  // Start a shift
  const handleStartShift = () => {
    navigate("/driver/shifts");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0e6d2] to-[#d9c9a8]">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-[#f0e6d2]/90 shadow-md px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-full hover:bg-[#d9c9a8]/70 transition-colors"
          >
            <Bars3Icon className="h-6 w-6 text-gray-900" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            {t.driverDashboard || "Driver Dashboard"}
          </h2>
          <div className="w-10"></div> {/* Placeholder for alignment */}
        </div>
      </header>

      {/* Sidebar */}
      <DriverSideNavBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="px-6 py-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="max-w-lg mx-auto">
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h3 className="text-2xl font-bold text-gray-900">
                {greeting}, {driverInfo.name.split(" ")[0]}!
              </h3>
              <p className="text-gray-600">
                {t.welcomeBack || "Welcome back to your driving dashboard"}
              </p>
            </motion.div>

            {/* Current Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 mb-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t.currentStatus || "Current Status"}
              </h3>
              <div className="flex items-center mb-4">
                <div
                  className={`h-3 w-3 rounded-full mr-2 ${
                    driverInfo.status === "offline"
                      ? "bg-gray-400"
                      : driverInfo.status === "available"
                      ? "bg-green-500"
                      : "bg-blue-500"
                  }`}
                ></div>
                <span
                  className={`font-medium ${
                    driverInfo.status === "offline"
                      ? "text-gray-600"
                      : driverInfo.status === "available"
                      ? "text-green-600"
                      : "text-blue-600"
                  }`}
                >
                  {driverInfo.status === "offline"
                    ? t.offline || "Offline"
                    : driverInfo.status === "available"
                    ? t.available || "Available"
                    : t.onRoute || "On Route"}
                </span>
              </div>

              {driverInfo.status === "offline" && (
                <button
                  onClick={() => setShowStartShiftModal(true)}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center"
                >
                  <ClockIcon className="h-5 w-5 mr-2" />
                  {t.startShift || "Start Shift"}
                </button>
              )}

              {driverInfo.status === "available" && (
                <div className="text-center py-2 px-4 bg-blue-50 text-blue-700 rounded-lg">
                  {t.readyForAssignment || "Ready for route assignment"}
                </div>
              )}

              {driverInfo.status === "on_route" && (
                <button
                  onClick={() => navigate("/driver/route/current")}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center"
                >
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  {t.viewCurrentRoute || "View Current Route"}
                </button>
              )}
            </motion.div>

            {/* Upcoming Routes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6 mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t.upcomingRoutes || "Upcoming Routes"}
                </h3>
                <button
                  onClick={() => navigate("/driver/schedule")}
                  className="text-blue-600 text-sm font-medium"
                >
                  {t.viewAll || "View All"}
                </button>
              </div>

              {upcomingRoutes.length > 0 ? (
                <div className="space-y-4">
                  {upcomingRoutes.map((route, index) => (
                    <div
                      key={route.id}
                      className={`p-4 rounded-lg border ${
                        route.date === "Today"
                          ? "bg-blue-50 border-blue-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {route.name}
                          </h4>
                          <div className="flex items-center text-sm text-gray-600">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {route.startTime} - {route.endTime}
                          </div>
                        </div>
                        <div className="text-sm font-medium text-gray-700 bg-white px-2 py-1 rounded-full shadow-sm">
                          {route.date}
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <UserIcon className="h-4 w-4 mr-1" />
                          {route.passengers} {t.passengers || "passengers"}
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {route.stopCount} {t.stops || "stops"}
                        </div>
                      </div>

                      {route.date === "Today" && (
                        <button
                          onClick={() => navigate(`/driver/route/${route.id}`)}
                          className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
                        >
                          {t.startRoute || "Start Route"}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {t.noUpcomingRoutes || "No upcoming routes scheduled"}
                </div>
              )}
            </motion.div>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6 mb-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t.statistics || "Statistics"}
              </h3>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="flex justify-center mb-2">
                    <TruckIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    {driverInfo.totalTrips}
                  </p>
                  <p className="text-xs text-gray-600">
                    {t.totalTrips || "Total Trips"}
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="flex justify-center mb-2">
                    <ClockIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    {driverInfo.hoursThisMonth}h
                  </p>
                  <p className="text-xs text-gray-600">
                    {t.hoursThisMonth || "Hours This Month"}
                  </p>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <div className="flex justify-center mb-2">
                    <ChartBarIcon className="h-6 w-6 text-amber-600" />
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    {driverInfo.distanceThisMonth} km
                  </p>
                  <p className="text-xs text-gray-600">
                    {t.distanceThisMonth || "Distance (km)"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/driver/profile")}
                className="w-full mt-4 py-2 px-4 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium flex items-center justify-center"
              >
                <UserIcon className="h-4 w-4 mr-1" />
                {t.viewFullStats || "View Full Statistics"}
              </button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-6 grid grid-cols-2 gap-4"
            >
              <button
                onClick={() => navigate("/driver/schedule")}
                className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center"
              >
                <CalendarIcon className="h-6 w-6 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-gray-800">
                  {t.viewSchedule || "View Schedule"}
                </span>
              </button>

              <button
                onClick={() => navigate("/driver/shifts")}
                className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center"
              >
                <ClockIcon className="h-6 w-6 text-amber-600 mb-2" />
                <span className="text-sm font-medium text-gray-800">
                  {t.manageShifts || "Manage Shifts"}
                </span>
              </button>
            </motion.div>
          </div>
        )}
      </div>

      {/* Start Shift Modal */}
      {showStartShiftModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 m-4 max-w-sm w-full"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Start New Shift
            </h3>

            <div className="mb-4">
              <label
                htmlFor="busNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter Bus Number
              </label>
              <input
                type="text"
                id="busNumber"
                value={busNumber}
                onChange={(e) => setBusNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="RT-101"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowStartShiftModal(false);
                  setSwipeComplete(false);
                  swipeControls.start({ x: 0, opacity: 1 });
                }}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-800 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleStartShift}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium"
              >
                Start Shift
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default DriverDashboard;
