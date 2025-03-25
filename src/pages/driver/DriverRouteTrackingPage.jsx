import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  ArrowLeftIcon,
  MapPinIcon,
  ClockIcon,
  BellIcon,
  PhoneIcon,
  CheckCircleIcon,
  PauseIcon,
  PlayIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import useTranslation from "../../hooks/useTranslation";
import DriverSideNavBar from "./components/DriverSideNavBar";

function DriverRouteTrackingPage() {
  const navigate = useNavigate();
  const { routeId } = useParams();
  const t = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [routeData, setRouteData] = useState(null);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [routeStatus, setRouteStatus] = useState("active"); // active, paused, completed
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmationType, setConfirmationType] = useState(null); // pause, resume, complete

  useEffect(() => {
    // Simulate API call to get route data
    setTimeout(() => {
      const mockRouteData = {
        id: routeId,
        name: "JKLU → Mansarover",
        startTime: "10:15 AM",
        endTime: "11:30 AM",
        busNumber: "RT-101",
        totalPassengers: 22,
        status: "active",
        progress: 35,
        stops: [
          {
            id: "stop1",
            name: "JKLU Campus",
            time: "10:15 AM",
            completed: true,
            passengers: 22,
          },
          {
            id: "stop2",
            name: "Mahindra SEZ",
            time: "10:30 AM",
            completed: true,
            passengers: 5,
          },
          {
            id: "stop3",
            name: "Jagatpura",
            time: "10:45 AM",
            completed: false,
            passengers: 8,
          },
          {
            id: "stop4",
            name: "Malviya Nagar",
            time: "11:00 AM",
            completed: false,
            passengers: 6,
          },
          {
            id: "stop5",
            name: "Mansarover Metro",
            time: "11:20 AM",
            completed: false,
            passengers: 3,
          },
        ],
      };

      setRouteData(mockRouteData);
      setCurrentStopIndex(2); // Assuming we're at the 3rd stop
      setIsLoading(false);
    }, 1000);
  }, [routeId]);

  // Timing effect
  useEffect(() => {
    let timer;
    if (routeStatus === "active") {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [routeStatus]);

  // Format elapsed time
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle route status changes
  const handleRouteStatusChange = (status) => {
    setConfirmationType(status);
    setShowConfirmModal(true);
  };

  // Confirm action
  const confirmAction = () => {
    if (confirmationType === "pause") {
      setRouteStatus("paused");
    } else if (confirmationType === "resume") {
      setRouteStatus("active");
    } else if (confirmationType === "complete") {
      navigate("/driver/route-completed", { state: { routeId } });
    }
    setShowConfirmModal(false);
  };

  // Mark a stop as completed
  const markStopCompleted = (index) => {
    const updatedStops = [...routeData.stops];

    // Mark the current stop and all previous stops as completed
    for (let i = 0; i <= index; i++) {
      updatedStops[i] = { ...updatedStops[i], completed: true };
    }

    setRouteData({ ...routeData, stops: updatedStops });
    setCurrentStopIndex(index + 1 >= updatedStops.length ? index : index + 1);

    // If last stop, prompt to complete the route
    if (index === updatedStops.length - 1) {
      handleRouteStatusChange("complete");
    }
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
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <MapPinIcon className="h-6 w-6 mr-2 text-blue-600" />
            {t.routeTracking || "Route Tracking"}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-[#d9c9a8]/70 transition-colors"
          >
            <ArrowLeftIcon className="h-6 w-6 text-gray-900" />
          </button>
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
          <>
            {/* Route Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-6 mb-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {routeData.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <ClockIcon className="h-4 w-4 mr-1 text-gray-500" />
                    {routeData.startTime} - {routeData.endTime}
                  </div>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${
                    routeStatus === "active"
                      ? "bg-green-100 text-green-800"
                      : routeStatus === "paused"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  <div
                    className={`h-2 w-2 rounded-full mr-1 ${
                      routeStatus === "active"
                        ? "bg-green-500 animate-pulse"
                        : routeStatus === "paused"
                        ? "bg-amber-500"
                        : "bg-blue-500"
                    }`}
                  ></div>
                  {routeStatus === "active"
                    ? t.active || "Active"
                    : routeStatus === "paused"
                    ? t.paused || "Paused"
                    : t.completed || "Completed"}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <UsersIcon className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {routeData.totalPassengers} {t.passengers || "Passengers"}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {routeData.progress}% {t.completed || "Completed"}
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${routeData.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">
                    {t.elapsedTime || "Elapsed Time"}
                  </p>
                  <p className="text-gray-900 font-semibold">
                    {formatTime(elapsedTime)}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">
                    {t.busNumber || "Bus Number"}
                  </p>
                  <p className="text-gray-900 font-semibold">
                    {routeData.busNumber}
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                {routeStatus === "active" ? (
                  <button
                    onClick={() => handleRouteStatusChange("pause")}
                    className="flex-1 py-3 px-4 bg-amber-500 text-white rounded-lg font-medium flex items-center justify-center"
                  >
                    <PauseIcon className="h-5 w-5 mr-2" />
                    {t.pauseRoute || "Pause Route"}
                  </button>
                ) : (
                  <button
                    onClick={() => handleRouteStatusChange("resume")}
                    className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg font-medium flex items-center justify-center"
                  >
                    <PlayIcon className="h-5 w-5 mr-2" />
                    {t.resumeRoute || "Resume Route"}
                  </button>
                )}

                {routeStatus !== "completed" && (
                  <button
                    onClick={() => handleRouteStatusChange("complete")}
                    className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center"
                  >
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    {t.completeRoute || "Complete Route"}
                  </button>
                )}
              </div>
            </motion.div>

            {/* Route Stops */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 mb-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t.stops || "Stops"}
              </h3>

              <div className="space-y-4">
                {routeData.stops.map((stop, index) => (
                  <div
                    key={stop.id}
                    className={`relative border-l-2 pl-4 pb-5 ${
                      index === routeData.stops.length - 1
                        ? "border-transparent"
                        : ""
                    } ${
                      stop.completed
                        ? "border-green-500"
                        : index === currentStopIndex
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {/* Stop indicator */}
                    <div
                      className={`absolute left-0 top-0 transform -translate-x-1/2 h-6 w-6 rounded-full flex items-center justify-center ${
                        stop.completed
                          ? "bg-green-500 text-white"
                          : index === currentStopIndex
                          ? "bg-blue-500 text-white"
                          : "bg-white border-2 border-gray-300"
                      }`}
                    >
                      {stop.completed ? (
                        <CheckCircleIcon className="h-4 w-4" />
                      ) : (
                        <span className="text-xs">{index + 1}</span>
                      )}
                    </div>

                    <div
                      className={`bg-gray-50 p-4 rounded-lg transition-all ${
                        index === currentStopIndex ? "ring-2 ring-blue-300" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {stop.name}
                          </h4>
                          <p className="text-sm text-gray-600">{stop.time}</p>
                        </div>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            stop.completed
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {stop.completed
                            ? t.completed || "Completed"
                            : t.upcoming || "Upcoming"}
                        </div>
                      </div>

                      <div className="flex items-center mt-2">
                        <UserIcon className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-700">
                          {stop.passengers} {t.passengers || "passengers"}
                        </span>
                      </div>

                      {!stop.completed && index === currentStopIndex && (
                        <button
                          onClick={() => markStopCompleted(index)}
                          className="mt-3 w-full py-2 bg-blue-500 text-white rounded-lg text-sm font-medium"
                        >
                          {t.arrivedAtStop || "Arrived at Stop"}
                        </button>
                      )}

                      {!stop.completed && index > currentStopIndex && (
                        <button
                          onClick={() => markStopCompleted(index)}
                          className="mt-3 w-full py-2 bg-green-500 text-white rounded-lg text-sm font-medium"
                        >
                          {t.skipToThisStop || "Skip to this Stop"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Route Map Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6 mb-6"
            >
              <button
                onClick={() => navigate(`/driver/route-map/${routeId}`)}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center"
              >
                <MapPinIcon className="h-5 w-5 mr-2" />
                {t.viewRouteMap || "View Route Map"}
              </button>
            </motion.div>

            {/* Emergency Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t.emergencyContact || "Emergency Contact"}
              </h3>
              <div className="flex space-x-3">
                <button
                  onClick={() => {}}
                  className="flex-1 py-3 px-4 bg-amber-500 text-white rounded-lg font-medium flex items-center justify-center"
                >
                  <BellIcon className="h-5 w-5 mr-2" />
                  {t.reportIssue || "Report Issue"}
                </button>
                <button
                  onClick={() => {}}
                  className="flex-1 py-3 px-4 bg-red-600 text-white rounded-lg font-medium flex items-center justify-center"
                >
                  <PhoneIcon className="h-5 w-5 mr-2" />
                  {t.emergencyCall || "Emergency Call"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl p-6 m-4 max-w-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {confirmationType === "pause"
                  ? t.confirmPauseRoute || "Confirm Pause Route"
                  : confirmationType === "resume"
                  ? t.confirmResumeRoute || "Confirm Resume Route"
                  : t.confirmCompleteRoute || "Confirm Complete Route"}
              </h3>
              <p className="text-gray-600 mb-6">
                {confirmationType === "pause"
                  ? t.pauseRouteDescription ||
                    "Are you sure you want to pause this route?"
                  : confirmationType === "resume"
                  ? t.resumeRouteDescription ||
                    "Are you sure you want to resume this route?"
                  : t.completeRouteDescription ||
                    "Are you sure you want to mark this route as completed?"}
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
                >
                  {t.cancel || "Cancel"}
                </button>
                <button
                  onClick={confirmAction}
                  className={`flex-1 py-2 px-4 text-white rounded-lg font-medium ${
                    confirmationType === "pause"
                      ? "bg-amber-500"
                      : confirmationType === "resume"
                      ? "bg-green-600"
                      : "bg-blue-600"
                  }`}
                >
                  {t.confirm || "Confirm"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DriverRouteTrackingPage;
