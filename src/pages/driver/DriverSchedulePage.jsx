import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bars3Icon,
  CalendarIcon,
  ArrowLeftIcon,
  MapPinIcon,
  ClockIcon,
  TruckIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import useTranslation from "../../hooks/useTranslation";
import DriverSideNavBar from "./components/DriverSideNavBar";

function DriverSchedulePage() {
  const navigate = useNavigate();
  const t = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [weekDates, setWeekDates] = useState([]);

  // Generate week dates
  useEffect(() => {
    const dates = [];
    const currentDate = new Date(selectedDate);

    // Set to start of the week (Sunday)
    const day = currentDate.getDay();
    currentDate.setDate(currentDate.getDate() - day);

    for (let i = 0; i < 7; i++) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setWeekDates(dates);
  }, [selectedDate]);

  // Load schedule data (simulated)
  useEffect(() => {
    setIsLoading(true);

    // Simulate API call to get schedule data
    setTimeout(() => {
      // Example schedule data for the selected date
      const today = new Date();
      const formattedSelectedDate = selectedDate.toDateString();
      const formattedToday = today.toDateString();
      const isSameDay = formattedSelectedDate === formattedToday;
      const isInPast = selectedDate < today && !isSameDay;
      const isFuture = selectedDate > today && !isSameDay;

      // Create different mock data based on if the selected date is today, past, or future
      let mockData = [];

      if (isInPast) {
        // Past days have completed rides
        mockData = [
          {
            id: "RT101",
            name: "JKLU → Mansarover",
            startTime: "10:15 AM",
            endTime: "11:30 AM",
            busNumber: "RT-101",
            status: "completed",
          },
          {
            id: "RT102",
            name: "Mansarover → JKLU",
            startTime: "05:30 PM",
            endTime: "06:45 PM",
            busNumber: "RT-101",
            status: "completed",
          },
        ];
      } else if (isSameDay) {
        // Today may have a mix of completed, active, and upcoming rides
        mockData = [
          {
            id: "RT101",
            name: "JKLU → Mansarover",
            startTime: "10:15 AM",
            endTime: "11:30 AM",
            busNumber: "RT-101",
            status: "completed",
          },
          {
            id: "RT102",
            name: "Mansarover → JKLU",
            startTime: "05:30 PM",
            endTime: "06:45 PM",
            busNumber: "RT-101",
            status: "upcoming",
          },
        ];
      } else if (isFuture) {
        // Future days have scheduled rides
        mockData = [
          {
            id: "RT101",
            name: "JKLU → Mansarover",
            startTime: "10:15 AM",
            endTime: "11:30 AM",
            busNumber: "RT-101",
            status: "scheduled",
          },
          {
            id: "RT102",
            name: "Mansarover → JKLU",
            startTime: "05:30 PM",
            endTime: "06:45 PM",
            busNumber: "RT-101",
            status: "scheduled",
          },
        ];
      }

      setScheduleData(mockData);
      setIsLoading(false);
    }, 800);
  }, [selectedDate]);

  // Navigate to previous/next week
  const navigateWeek = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction * 7);
    setSelectedDate(newDate);
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Check if a date is selected
  const isSelected = (date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      case "upcoming":
        return "bg-amber-100 text-amber-800";
      case "scheduled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
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
            <CalendarIcon className="h-6 w-6 mr-2 text-blue-600" />
            {t.schedule || "Schedule"}
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
        {/* Week Selector */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => navigateWeek(-1)}
              className="p-2 rounded-full hover:bg-[#d9c9a8]/70 transition-colors"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-900" />
            </button>
            <h3 className="text-lg font-semibold text-gray-900">
              {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
            </h3>
            <button
              onClick={() => navigateWeek(1)}
              className="p-2 rounded-full hover:bg-[#d9c9a8]/70 transition-colors"
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-900" />
            </button>
          </div>

          <div className="flex overflow-x-auto pb-2 space-x-2">
            {weekDates.map((date, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 w-14 rounded-lg p-2 ${
                  isSelected(date)
                    ? "bg-blue-500 text-white"
                    : isToday(date)
                    ? "bg-blue-100 border border-blue-300 text-blue-800"
                    : "bg-white border border-gray-200"
                }`}
              >
                <div className="text-center">
                  <p className="text-xs font-medium">
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </p>
                  <p className="text-lg font-bold">{date.getDate()}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Schedule List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h3>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : scheduleData.length > 0 ? (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {scheduleData.map((schedule, index) => (
                <React.Fragment key={schedule.id}>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {schedule.name}
                        </h4>
                        <div className="flex items-center text-sm text-gray-600">
                          <ClockIcon className="h-4 w-4 mr-1 text-gray-500" />
                          {schedule.startTime} - {schedule.endTime}
                        </div>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          schedule.status
                        )}`}
                      >
                        {t[schedule.status] || schedule.status}
                      </div>
                    </div>

                    <div className="flex items-center mb-3">
                      <TruckIcon className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm text-gray-600">
                        {schedule.busNumber}
                      </span>
                    </div>

                    <div className="flex space-x-3">
                      {schedule.status === "scheduled" && (
                        <button
                          onClick={() =>
                            navigate(`/driver/route/${schedule.id}`)
                          }
                          className="flex-1 py-2 px-3 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium flex items-center justify-center border border-blue-200"
                        >
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {t.viewRoute || "View Route"}
                        </button>
                      )}

                      {schedule.status === "upcoming" && (
                        <button
                          onClick={() =>
                            navigate(`/driver/route/${schedule.id}`)
                          }
                          className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center justify-center"
                        >
                          <ArrowRightIcon className="h-4 w-4 mr-1" />
                          {t.startRoute || "Start Route"}
                        </button>
                      )}

                      {schedule.status === "completed" && (
                        <button
                          onClick={() =>
                            navigate(`/driver/route-summary/${schedule.id}`)
                          }
                          className="flex-1 py-2 px-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium flex items-center justify-center border border-green-200"
                        >
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          {t.viewSummary || "View Summary"}
                        </button>
                      )}
                    </div>
                  </div>

                  {index < scheduleData.length - 1 && (
                    <div className="border-t border-gray-100"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="mb-4">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                {t.noScheduledRoutes || "No Scheduled Routes"}
              </h4>
              <p className="text-gray-600 mb-4">
                {t.noScheduledRoutesDescription ||
                  "There are no routes scheduled for this day."}
              </p>
              <button
                onClick={() => navigate("/driver/dashboard")}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium inline-flex items-center"
              >
                <HomeIcon className="h-4 w-4 mr-1" />
                {t.returnToDashboard || "Return to Dashboard"}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default DriverSchedulePage;
