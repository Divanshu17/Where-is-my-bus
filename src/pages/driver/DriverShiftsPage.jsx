import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  Bars3Icon,
  ClockIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XMarkIcon,
  UserIcon,
  TruckIcon,
  MapPinIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import useTranslation from "../../hooks/useTranslation";
import DriverSideNavBar from "./components/DriverSideNavBar";

function DriverShiftsPage() {
  const navigate = useNavigate();
  const t = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentShift, setCurrentShift] = useState(null);
  const [shiftHistory, setShiftHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("current");
  const [busNumber, setBusNumber] = useState("");
  const [swipeEndComplete, setSwipeEndComplete] = useState(false);
  const [showEndShiftConfirm, setShowEndShiftConfirm] = useState(false);

  // For ending shift swipe
  const swipeEndX = useMotionValue(0);
  const swipeEndOpacity = useTransform(swipeEndX, [-150, 0, 150], [0, 1, 0]);
  const swipeEndControls = useAnimation();
  const swipeEndContainerRef = useRef(null);

  // For starting shift swipe
  const [swipeStartComplete, setSwipeStartComplete] = useState(false);
  const [showStartShiftConfirm, setShowStartShiftConfirm] = useState(false);
  const swipeStartX = useMotionValue(0);
  const swipeStartOpacity = useTransform(
    swipeStartX,
    [-150, 0, 150],
    [0, 1, 0]
  );
  const swipeStartControls = useAnimation();
  const swipeStartContainerRef = useRef(null);

  // Simulate loading shift data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // For testing, create an active shift or set to null to show start shift UI
      setCurrentShift(null); // Set to null to show the start shift UI first

      setShiftHistory([
        {
          id: "SH-123",
          date: "2023-10-15",
          startTime: "08:30 AM",
          endTime: "05:45 PM",
          duration: "9h 15m",
          routesCompleted: 4,
          status: "completed",
          busNumber: "RT-101",
        },
        {
          id: "SH-122",
          date: "2023-10-14",
          startTime: "09:00 AM",
          endTime: "06:00 PM",
          duration: "9h 00m",
          routesCompleted: 4,
          status: "completed",
          busNumber: "RT-102",
        },
        {
          id: "SH-121",
          date: "2023-10-13",
          startTime: "08:45 AM",
          endTime: "05:30 PM",
          duration: "8h 45m",
          routesCompleted: 3,
          status: "completed",
          busNumber: "RT-101",
        },
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  // Handle end shift swipe
  const handleEndDragEnd = (e, info) => {
    if (info.offset.x > 100) {
      // User has swiped far enough to the right
      setSwipeEndComplete(true);
      swipeEndControls.start({
        x: 300,
        opacity: 0,
        transition: { duration: 0.2 },
      });
      setTimeout(() => {
        setShowEndShiftConfirm(true);
      }, 300);
    } else {
      // Reset position
      swipeEndControls.start({
        x: 0,
        transition: { type: "spring", stiffness: 500, damping: 30 },
      });
    }
  };

  // Handle start shift swipe
  const handleStartDragEnd = (e, info) => {
    if (info.offset.x > 100) {
      // User has swiped far enough to the right
      setSwipeStartComplete(true);
      swipeStartControls.start({
        x: 300,
        opacity: 0,
        transition: { duration: 0.2 },
      });
      setTimeout(() => {
        setShowStartShiftConfirm(true);
      }, 300);
    } else {
      // Reset position
      swipeStartControls.start({
        x: 0,
        transition: { type: "spring", stiffness: 500, damping: 30 },
      });
    }
  };

  // Handle start shift
  const handleStartShift = () => {
    if (!busNumber.trim()) {
      alert("Please enter a bus number");
      setShowStartShiftConfirm(false);
      setSwipeStartComplete(false);
      swipeStartControls.start({ x: 0, opacity: 1 });
      return;
    }

    // Simulate API call to start shift
    setIsLoading(true);
    setTimeout(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      setCurrentShift({
        id: `SH-${Math.floor(Math.random() * 1000)}`,
        date: now.toISOString().split("T")[0],
        startTime: formattedTime,
        status: "active",
        busNumber: busNumber,
        startedAt: now.getTime(),
      });

      setIsLoading(false);
      setShowStartShiftConfirm(false);
      // Clear bus number input
      setBusNumber("");
    }, 1000);
  };

  // Handle end shift
  const handleEndShift = () => {
    if (!currentShift) return;

    // Simulate API call to end shift
    setIsLoading(true);
    setTimeout(() => {
      const now = new Date();
      const formattedEndTime = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      // Calculate duration
      const startTime = new Date(currentShift.startedAt);
      const durationMs = now.getTime() - startTime.getTime();
      const hours = Math.floor(durationMs / (1000 * 60 * 60));
      const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
      const durationFormatted = `${hours}h ${minutes}m`;

      const completedShift = {
        ...currentShift,
        endTime: formattedEndTime,
        duration: durationFormatted,
        routesCompleted: Math.floor(Math.random() * 5) + 1, // Random number for demo
        status: "completed",
      };

      setShiftHistory([completedShift, ...shiftHistory]);
      setCurrentShift(null);
      setIsLoading(false);
      setShowEndShiftConfirm(false);
      setSwipeEndComplete(false);

      // Show success toast or notification
      alert("Shift ended successfully!");
    }, 1000);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
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
            <ClockIcon className="h-6 w-6 mr-2 text-blue-600" />
            {t.shifts || "Shifts"}
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
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6 p-1">
          <div className="grid grid-cols-2">
            <button
              onClick={() => setActiveTab("current")}
              className={`py-3 text-center rounded-lg font-medium transition-colors ${
                activeTab === "current"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {t.currentShift || "Current Shift"}
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`py-3 text-center rounded-lg font-medium transition-colors ${
                activeTab === "history"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {t.shiftHistory || "Shift History"}
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : activeTab === "current" ? (
          <div className="max-w-md mx-auto">
            {currentShift ? (
              /* Current active shift */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-6 mb-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t.activeShift || "Active Shift"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t.startedAt || "Started at"}: {currentShift.startTime}
                    </p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    {t.active || "Active"}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <TruckIcon className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-gray-700 font-medium">
                        {t.busNumber || "Bus Number"}:
                      </span>
                    </div>
                    <span className="text-gray-900 font-semibold">
                      {currentShift.busNumber}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <div className="text-center flex-1">
                    <p className="text-xs text-gray-500 mb-1">
                      {t.date || "Date"}
                    </p>
                    <p className="font-medium">
                      {formatDate(currentShift.date)}
                    </p>
                  </div>
                  <div className="text-center flex-1">
                    <p className="text-xs text-gray-500 mb-1">
                      {t.startTime || "Start Time"}
                    </p>
                    <p className="font-medium">{currentShift.startTime}</p>
                  </div>
                  <div className="text-center flex-1">
                    <p className="text-xs text-gray-500 mb-1">
                      {t.duration || "Duration"}
                    </p>
                    <p className="font-medium" id="duration">
                      {/* Calculate duration in real-time */}
                      {(() => {
                        const start = new Date(currentShift.startedAt);
                        const now = new Date();
                        const durationMs = now.getTime() - start.getTime();
                        const hours = Math.floor(durationMs / (1000 * 60 * 60));
                        const minutes = Math.floor(
                          (durationMs % (1000 * 60 * 60)) / (1000 * 60)
                        );
                        return `${hours}h ${minutes}m`;
                      })()}
                    </p>
                  </div>
                </div>

                {/* End Shift Swiper */}
                <div
                  ref={swipeEndContainerRef}
                  className="relative bg-gray-100 h-16 rounded-lg overflow-hidden mb-4"
                >
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-gray-500 font-medium">
                      Swipe to end shift
                    </span>
                  </div>
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={swipeEndContainerRef}
                    dragElastic={0.1}
                    dragMomentum={false}
                    animate={swipeEndControls}
                    style={{ x: swipeEndX }}
                    onDragEnd={handleEndDragEnd}
                  >
                    <ArrowRightIcon className="h-6 w-6 text-white" />
                  </motion.div>
                </div>

                <div className="text-center text-xs text-gray-500">
                  {t.swipeToEndShift || "Swipe right to end your current shift"}
                </div>
              </motion.div>
            ) : (
              /* Start new shift form with swipe */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-6 mb-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t.startNewShift || "Start New Shift"}
                </h3>

                <div className="mb-4">
                  <label
                    htmlFor="busNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t.enterBusNumber || "Enter Bus Number"}
                  </label>
                  <input
                    type="text"
                    id="busNumber"
                    value={busNumber}
                    onChange={(e) => setBusNumber(e.target.value)}
                    placeholder="RT-101"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Start Shift Swiper */}
                <div
                  ref={swipeStartContainerRef}
                  className="relative bg-gray-100 h-16 rounded-lg overflow-hidden mb-4"
                >
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-gray-500 font-medium">
                      Swipe to start shift
                    </span>
                  </div>
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={swipeStartContainerRef}
                    dragElastic={0.1}
                    dragMomentum={false}
                    animate={swipeStartControls}
                    style={{ x: swipeStartX }}
                    onDragEnd={handleStartDragEnd}
                  >
                    <ArrowRightIcon className="h-6 w-6 text-white" />
                  </motion.div>
                </div>

                <div className="text-center text-xs text-gray-500 mb-4">
                  {t.swipeToStartShift || "Swipe right to start your shift"}
                </div>
              </motion.div>
            )}

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t.quickTips || "Quick Tips"}
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>
                    {t.shiftTip1 ||
                      "Always start your shift before beginning your route"}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>
                    {t.shiftTip2 ||
                      "End your shift only after completing all assigned routes"}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>
                    {t.shiftTip3 ||
                      "Make sure to verify the bus number before starting a shift"}
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        ) : (
          /* Shift History */
          <div className="max-w-md mx-auto">
            {shiftHistory.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                {shiftHistory.map((shift, index) => (
                  <React.Fragment key={shift.id}>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {shift.busNumber}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {formatDate(shift.date)}
                          </p>
                        </div>
                        <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {t.completed || "Completed"}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">
                            {t.startTime || "Start Time"}
                          </p>
                          <p className="text-sm font-medium">
                            {shift.startTime}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">
                            {t.endTime || "End Time"}
                          </p>
                          <p className="text-sm font-medium">{shift.endTime}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">
                            {t.duration || "Duration"}
                          </p>
                          <p className="text-sm font-medium">
                            {shift.duration}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 text-gray-500 mr-1" />
                          <span className="text-sm text-gray-700">
                            {shift.routesCompleted}{" "}
                            {t.routesCompleted || "routes completed"}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            navigate(`/driver/shift-details/${shift.id}`)
                          }
                          className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium"
                        >
                          {t.viewDetails || "View Details"}
                        </button>
                      </div>
                    </div>
                    {index < shiftHistory.length - 1 && (
                      <div className="border-t border-gray-100"></div>
                    )}
                  </React.Fragment>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-6 text-center"
              >
                <div className="mb-4">
                  <ClockIcon className="h-12 w-12 text-gray-400 mx-auto" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  {t.noShiftHistory || "No Shift History"}
                </h4>
                <p className="text-gray-600 mb-4">
                  {t.noShiftHistoryDescription ||
                    "You haven't completed any shifts yet. Start your first shift to see it here."}
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Start Shift Confirmation Modal */}
      {showStartShiftConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 m-4 max-w-sm w-full"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Start New Shift
            </h3>
            <p className="text-gray-600 mb-4">
              You are about to start a shift with bus number:
              <span className="font-semibold">
                {" "}
                {busNumber || "Not specified"}
              </span>
            </p>
            {!busNumber && (
              <p className="text-red-500 text-sm mb-4">
                Please enter a bus number to continue.
              </p>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowStartShiftConfirm(false);
                  setSwipeStartComplete(false);
                  swipeStartControls.start({ x: 0, opacity: 1 });
                }}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-800 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleStartShift}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium"
                disabled={!busNumber}
              >
                Start Shift
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* End Shift Confirmation Modal */}
      {showEndShiftConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 m-4 max-w-sm w-full"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              End Current Shift
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to end your current shift? This action
              cannot be undone.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowEndShiftConfirm(false);
                  setSwipeEndComplete(false);
                  swipeEndControls.start({ x: 0, opacity: 1 });
                }}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-800 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleEndShift}
                className="flex-1 py-3 px-4 bg-red-600 text-white rounded-lg font-medium"
              >
                End Shift
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default DriverShiftsPage;
