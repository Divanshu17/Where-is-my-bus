import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
  XMarkIcon,
  HomeIcon,
  UserIcon,
  BellIcon,
  BookmarkIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  MapIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  UserIcon as UserIconSolid,
  BellIcon as BellIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
} from "@heroicons/react/24/solid";
import logo from "../../assets/Logo2.png";

const SideNavBar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, currentUser } = useAuth();
  const [activeRoute, setActiveRoute] = useState("");
  const [userProfile, setUserProfile] = useState({
    name: "User",
    email: "user@example.com",
    avatar: null,
  });
  const [avatarColor, setAvatarColor] = useState("#3B82F6");

  useEffect(() => {
    // Set user profile from auth context
    if (currentUser) {
      setUserProfile({
        name: currentUser.fullName || "User",
        email: currentUser.email || "user@example.com",
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
    if (path.includes("/routes")) setActiveRoute("home");
    else if (path.includes("/profile")) setActiveRoute("profile");
    else if (path.includes("/notifications")) setActiveRoute("notifications");
    else if (path.includes("/saved-routes")) setActiveRoute("saved");
    else if (path.includes("/feedback")) setActiveRoute("feedback");
    else if (path.includes("/contact")) setActiveRoute("contact");
  }, [location]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: HomeIcon,
      solidIcon: HomeIconSolid,
      path: "/routes",
    },
    {
      id: "profile",
      label: "Profile",
      icon: UserIcon,
      solidIcon: UserIconSolid,
      path: "/profile",
    },
    {
      id: "tickets",
      label: "My Tickets",
      icon: DocumentTextIcon,
      solidIcon: DocumentTextIconSolid,
      path: "/tickets",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: BellIcon,
      solidIcon: BellIconSolid,
      path: "/notifications",
      badge: 3,
    },
    {
      id: "saved",
      label: "Saved Routes",
      icon: BookmarkIcon,
      solidIcon: BookmarkIconSolid,
      path: "/saved-routes",
    },
    {
      id: "feedback",
      label: "Feedback",
      icon: ChatBubbleLeftRightIcon,
      solidIcon: ChatBubbleLeftRightIconSolid,
      path: "/feedback",
    },
    {
      id: "contact",
      label: "Contact Us",
      icon: DocumentTextIcon,
      solidIcon: DocumentTextIconSolid,
      path: "/contact",
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

                    {item.badge && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          isActive
                            ? "bg-white text-blue-500"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <motion.div variants={itemVariants} className="mt-8 mb-2 px-2">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Quick Access
            </h4>
          </motion.div>

          <div className="grid grid-cols-2 gap-2 mb-6">
            <motion.div variants={itemVariants}>
              <button
                onClick={() => {
                  navigate("/map-view");
                  setIsOpen(false);
                }}
                className="flex flex-col items-center justify-center p-3 bg-white/50 rounded-xl hover:bg-white/80 transition-all w-full"
              >
                <MapIcon className="h-6 w-6 text-blue-500 mb-1" />
                <span className="text-xs font-medium text-gray-700">
                  Live Map
                </span>
              </button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                onClick={() => {
                  navigate("/track");
                  setIsOpen(false);
                }}
                className="flex flex-col items-center justify-center p-3 bg-white/50 rounded-xl hover:bg-white/80 transition-all w-full"
              >
                <TruckIcon className="h-6 w-6 text-amber-500 mb-1" />
                <span className="text-xs font-medium text-gray-700">
                  Track Bus
                </span>
              </button>
            </motion.div>
          </div>

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
              <span className="font-medium">Help & Support</span>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              to="/settings"
              className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-white/50 transition-all"
              onClick={() => setIsOpen(false)}
            >
              <Cog6ToothIcon className="h-5 w-5 mr-3 text-gray-500" />
              <span className="font-medium">Settings</span>
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
            <span>Logout</span>
          </button>

          <p className="text-xs text-center text-gray-500 mt-4">
            Version 1.0.0
          </p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default SideNavBar;

/* Add this to your global CSS file */
/* 
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}
*/
