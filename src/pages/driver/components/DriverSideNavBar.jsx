import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../../context/AuthContext";
import useTranslation from "../../../hooks/useTranslation";
import LanguageSelector from "../../../components/LanguageSelector";
import {
  XMarkIcon,
  HomeIcon,
  UserIcon,
  BellIcon,
  BookmarkIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  MapIcon,
  TruckIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  UserIcon as UserIconSolid,
  CalendarIcon as CalendarIconSolid,
  ClockIcon as ClockIconSolid,
  MapIcon as MapIconSolid,
} from "@heroicons/react/24/solid";
import logo from "../../../assets/Logo2.png";

const DriverSideNavBar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, currentUser } = useAuth();
  const t = useTranslation();
  const [activeRoute, setActiveRoute] = useState("");
  const [userProfile, setUserProfile] = useState({
    name: "Driver",
    email: "driver@example.com",
    avatar: null,
  });
  const [avatarColor, setAvatarColor] = useState("#3B82F6");

  useEffect(() => {
    // Set user profile from auth context
    if (currentUser) {
      setUserProfile({
        name: currentUser.fullName || "Driver",
        email: currentUser.email || "driver@example.com",
        avatar: currentUser.profileImage || null,
      });

      // Generate avatar color based on name
      if (currentUser.fullName) {
        const hash = currentUser.fullName.split("").reduce((acc, char) => {
          return char.charCodeAt(0) + ((acc << 5) - acc);
        }, 0);
        const hue = Math.abs(hash % 360);
        setAvatarColor(`hsl(${hue}, 70%, 50%)`);
      }
    }
  }, [currentUser, isOpen]); // Reload when sidebar opens or user changes

  useEffect(() => {
    // Set active route based on current path
    const path = location.pathname;
    if (path.includes("/driver/dashboard")) setActiveRoute("dashboard");
    else if (path.includes("/driver/profile")) setActiveRoute("profile");
    else if (path.includes("/driver/schedule")) setActiveRoute("schedule");
    else if (path.includes("/driver/shifts")) setActiveRoute("shifts");
    else if (path.includes("/driver/route")) setActiveRoute("routes");
  }, [location]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/driver-login");
  };

  const getInitials = (name) => {
    if (!name) return "D";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const navItems = [
    {
      id: "dashboard",
      label: t.dashboard || "Dashboard",
      icon: HomeIcon,
      solidIcon: HomeIconSolid,
      path: "/driver/dashboard",
    },
    {
      id: "profile",
      label: t.profile || "Profile",
      icon: UserIcon,
      solidIcon: UserIconSolid,
      path: "/driver/profile",
    },
    {
      id: "schedule",
      label: t.schedule || "Schedule",
      icon: CalendarIcon,
      solidIcon: CalendarIconSolid,
      path: "/driver/schedule",
    },
    {
      id: "shifts",
      label: t.shifts || "Shifts",
      icon: ClockIcon,
      solidIcon: ClockIconSolid,
      path: "/driver/shifts",
    },
    {
      id: "routes",
      label: t.liveMap || "Live Map",
      icon: MapIcon,
      solidIcon: MapIconSolid,
      path: "/driver/route-map",
    },
  ];

  // Animation variants
  const sidebarVariants = {
    closed: {
      x: "-100%",
      boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
    },
    open: {
      x: "0%",
      boxShadow: "10px 0px 50px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  return (
    <>
      {/* Sidebar Overlay with improved animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar with enhanced design */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-[#f0e6d2] to-[#d9c9a8] z-50 rounded-r-2xl flex flex-col overflow-hidden"
      >
        {/* Header with user profile */}
        <motion.div
          variants={itemVariants}
          className="relative p-6 border-b border-[#c4b393]"
        >
          <div className="flex items-center space-x-4">
            <div
              className="h-14 w-14 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: avatarColor }}
            >
              {userProfile.avatar ? (
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                getInitials(userProfile.name)
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 truncate">
                {userProfile.name}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {userProfile.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-gray-700" />
          </button>

          <div className="mt-4 flex justify-center">
            <img src={logo} alt="App Logo" className="h-12" />
          </div>
        </motion.div>

        {/* Navigation Links with improved styling and animations */}
        <div className="flex-grow overflow-y-auto py-4 px-4 custom-scrollbar">
          <motion.div variants={itemVariants} className="mb-2 px-2">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {t.language || "Language"}
            </h4>
          </motion.div>

          {/* Language Selector */}
          <motion.div
            variants={itemVariants}
            className="mb-6 px-2 flex justify-center"
          >
            <LanguageSelector />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-2 px-2">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Main Menu
            </h4>
          </motion.div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = activeRoute === item.id;
              const Icon = isActive ? item.solidIcon : item.icon;

              return (
                <motion.div key={item.id} variants={itemVariants}>
                  <Link
                    to={item.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-blue-500 text-white shadow-md"
                        : "text-gray-700 hover:bg-white/50"
                    }`}
                    onClick={() => {
                      setActiveRoute(item.id);
                      setIsOpen(false); // Close sidebar after navigation on mobile
                    }}
                  >
                    <div className="flex items-center">
                      <Icon className="h-5 w-5 mr-3" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <motion.div variants={itemVariants} className="mt-8 mb-2 px-2">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Support
            </h4>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              to="/help"
              className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-white/50 transition-all"
              onClick={() => setIsOpen(false)}
            >
              <QuestionMarkCircleIcon className="h-5 w-5 mr-3 text-gray-500" />
              <span className="font-medium">
                {t.helpSupport || "Help & Support"}
              </span>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              to="/settings"
              className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-white/50 transition-all"
              onClick={() => setIsOpen(false)}
            >
              <Cog6ToothIcon className="h-5 w-5 mr-3 text-gray-500" />
              <span className="font-medium">{t.settings || "Settings"}</span>
            </Link>
          </motion.div>
        </div>

        {/* Logout Button with enhanced styling */}
        <motion.div
          variants={itemVariants}
          className="p-4 border-t border-[#c4b393]"
        >
          <button
            onClick={handleLogout}
            className="w-full py-3 px-4 bg-white/80 hover:bg-white text-gray-800 font-semibold rounded-xl transition-all flex items-center justify-center space-x-2 shadow-sm"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-700" />
            <span>{t.logout || "Logout"}</span>
          </button>

          <p className="text-xs text-center text-gray-500 mt-4">
            Version 1.0.0
          </p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default DriverSideNavBar;
