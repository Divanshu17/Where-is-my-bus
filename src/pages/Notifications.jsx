import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftIcon,
  Bars3Icon,
  BellAlertIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import SideNavBar from "./components/SideNavBar";

function Notifications() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all"); // all, unread, alerts
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications([
    {
      id: 1,
      title: "Bus 101 Delayed",
          message:
            "Your bus is running 5 minutes late due to traffic congestion on Main Street. Please plan accordingly.",
      time: "5 min ago",
          type: "alert",
          read: false,
          icon: <ExclamationTriangleIcon className="h-5 w-5" />,
          color: "#EF4444", 
          route: "101",
          actionable: true,
    },
    {
      id: 2,
      title: "Route Change",
          message:
            "Route 202 has been temporarily modified due to road work on Park Avenue. The bus will detour via Oak Street until further notice.",
      time: "1 hour ago",
          type: "info",
          read: false,
          icon: <InformationCircleIcon className="h-5 w-5" />,
          color: "#3B82F6", 
          route: "202",
          actionable: false,
    },
    {
      id: 3,
      title: "Service Update",
          message:
            "Normal service has resumed on all routes following the earlier disruption. Thank you for your patience.",
      time: "2 hours ago",
          type: "success",
          read: true,
          icon: <CheckCircleIcon className="h-5 w-5" />,
          color: "#10B981", // green
          route: "All",
          actionable: false,
        },
        {
          id: 4,
          title: "Weekend Schedule",
          message:
            "Reminder: This weekend all buses will operate on a reduced frequency schedule due to the holiday.",
          time: "1 day ago",
          type: "info",
          read: true,
          icon: <InformationCircleIcon className="h-5 w-5" />,
          color: "#3B82F6", // blue
          route: "All",
          actionable: false,
        },
        {
          id: 5,
          title: "Bus 303 Arriving Soon",
          message:
            "Your tracked bus (Route 303) will arrive at your stop in approximately 3 minutes.",
          time: "2 days ago",
          type: "alert",
          read: true,
          icon: <BellAlertIcon className="h-5 w-5" />,
          color: "#F59E0B", 
          route: "303",
          actionable: true,
        },
      ]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter notifications based on active filter
  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !notification.read;
    if (activeFilter === "alerts") return notification.type === "alert";
    return true;
  });

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Delete notification
  const deleteNotification = (id, e) => {
    e.stopPropagation();
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
    setShowFilterMenu(false);
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    setShowFilterMenu(false);
  };

  // View notification details
  const viewNotificationDetails = (notification) => {
    markAsRead(notification.id);
    setSelectedNotification(notification);
  };

  // Close notification details
  const closeNotificationDetails = () => {
    setSelectedNotification(null);
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

  const filterMenuVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const detailsVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.2,
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
      <header className="sticky top-0 z-10 backdrop-blur-md bg-[#f0e6d2]/80 shadow-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-full hover:bg-[#d9c9a8]/50 transition-colors"
          >
            <Bars3Icon className="h-6 w-6 text-gray-800" />
        </button>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent flex items-center">
            <BellAlertIcon className="h-6 w-6 mr-2 text-gray-800" />
          Notifications
        </h2>
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`p-2 rounded-full transition-colors ${
                showFilterMenu
                  ? "bg-blue-500 text-white"
                  : "hover:bg-[#d9c9a8]/50 text-gray-800"
              }`}
            >
              <AdjustmentsHorizontalIcon className="h-6 w-6" />
            </button>

            {/* Filter dropdown menu */}
            <AnimatePresence>
              {showFilterMenu && (
                <motion.div
                  variants={filterMenuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-20 border border-gray-200"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Filter Notifications
                    </h3>
                  </div>
                  <div className="py-1">
                    {["all", "unread", "alerts"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => {
                          setActiveFilter(filter);
                          setShowFilterMenu(false);
                        }}
                        className={`px-4 py-2 text-sm w-full text-left flex items-center ${
                          activeFilter === filter
                            ? "text-blue-500 bg-blue-50"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {activeFilter === filter && (
                          <CheckIcon className="h-4 w-4 mr-2" />
                        )}
                        <span
                          className={
                            activeFilter === filter ? "font-medium" : ""
                          }
                        >
                          {filter === "all"
                            ? "All Notifications"
                            : filter === "unread"
                            ? "Unread Only"
                            : "Alerts Only"}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 py-1">
                    <button
                      onClick={markAllAsRead}
                      className="px-4 py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <CheckCircleIcon className="h-4 w-4 mr-2 text-blue-500" />
                      Mark all as read
                    </button>
                    <button
                      onClick={clearAllNotifications}
                      className="px-4 py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <TrashIcon className="h-4 w-4 mr-2 text-red-500" />
                      Clear all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex space-x-2 mt-4 border-b border-[#d9c9a8]">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              activeFilter === "all"
                ? "text-gray-900"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            All
            {activeFilter === "all" && (
              <motion.div
                layoutId="activeFilterTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
              />
            )}
          </button>
          <button
            onClick={() => setActiveFilter("unread")}
            className={`px-4 py-2 font-medium text-sm transition-colors relative flex items-center ${
              activeFilter === "unread"
                ? "text-gray-900"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Unread
            {notifications.filter((n) => !n.read).length > 0 && (
              <span className="ml-1.5 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.filter((n) => !n.read).length}
              </span>
            )}
            {activeFilter === "unread" && (
              <motion.div
                layoutId="activeFilterTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
              />
            )}
          </button>
          <button
            onClick={() => setActiveFilter("alerts")}
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              activeFilter === "alerts"
                ? "text-gray-900"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Alerts
            {activeFilter === "alerts" && (
              <motion.div
                layoutId="activeFilterTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
              />
            )}
        </button>
      </div>
      </header>

      {/* Sidebar */}
      <SideNavBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Notification List */}
      <div className="px-6 py-4">
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
                <BellAlertIcon className="h-10 w-10 text-blue-500" />
              </motion.div>
              <p className="text-gray-600">Loading notifications...</p>
            </motion.div>
          ) : filteredNotifications.length > 0 ? (
            <motion.div
              key="notification-list"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {filteredNotifications.map((notification) => (
          <motion.div
            key={notification.id}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  onClick={() => viewNotificationDetails(notification)}
                  className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border transition-all duration-300 cursor-pointer ${
                    notification.read
                      ? "border-gray-200"
                      : "border-blue-300 shadow-md"
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-start">
                      {/* Notification icon */}
                      <div
                        className="rounded-full p-2 mr-3 flex-shrink-0"
                        style={{ backgroundColor: `${notification.color}20` }}
                      >
                        <div
                          className="text-center"
                          style={{ color: notification.color }}
                        >
                          {notification.icon}
                        </div>
                      </div>

                      {/* Notification content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span
                            className="font-medium px-2 py-0.5 rounded-full text-xs"
                            style={{
                              backgroundColor: `${notification.color}15`,
                              color: notification.color,
                            }}
                          >
                            Route {notification.route}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {notification.time}
                          </span>
                        </div>
                        <h3
                          className={`text-base font-semibold ${
                            notification.read
                              ? "text-gray-700"
                              : "text-gray-900"
                          }`}
                        >
                          {notification.title}
                          {!notification.read && (
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full ml-2 align-middle"></span>
                          )}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                          {notification.message}
                        </p>
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={(e) => deleteNotification(notification.id, e)}
                        className="ml-2 p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Color indicator at bottom */}
                  <div
                    className="h-1"
                    style={{ backgroundColor: notification.color }}
                  ></div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-8 text-center border border-gray-200 mt-4"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <BellAlertIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-gray-800 font-medium mb-2">
                No notifications
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {activeFilter === "all"
                  ? "You don't have any notifications yet"
                  : activeFilter === "unread"
                  ? "You don't have any unread notifications"
                  : "You don't have any alerts"}
              </p>
              {activeFilter !== "all" && (
                <button
                  onClick={() => setActiveFilter("all")}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
                >
                  View all notifications
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Notification Details Modal */}
      <AnimatePresence>
        {selectedNotification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeNotificationDetails}
          >
            <motion.div
              variants={detailsVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div
                className="py-3 px-4 flex justify-between items-center"
                style={{ backgroundColor: selectedNotification.color }}
              >
                <h3 className="font-bold text-white">
                  {selectedNotification.title}
                </h3>
                <button
                  onClick={closeNotificationDetails}
                  className="text-white/80 hover:text-white"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Modal content */}
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <div
                    className="rounded-full p-2 mr-3"
                    style={{
                      backgroundColor: `${selectedNotification.color}20`,
                    }}
                  >
                    <div style={{ color: selectedNotification.color }}>
                      {selectedNotification.icon}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">
                      {selectedNotification.time}
                    </span>
                    <div
                      className="font-medium px-2 py-0.5 rounded-full text-xs inline-block ml-2"
                      style={{
                        backgroundColor: `${selectedNotification.color}15`,
                        color: selectedNotification.color,
                      }}
                    >
                      Route {selectedNotification.route}
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">
                  {selectedNotification.message}
                </p>

                {/* Action buttons */}
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={closeNotificationDetails}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>

                  {selectedNotification.actionable && (
                    <button
                      onClick={() => {
                        closeNotificationDetails();
                        navigate(`/track/${selectedNotification.route}`);
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      View Route
                    </button>
                  )}
                </div>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Notifications;
