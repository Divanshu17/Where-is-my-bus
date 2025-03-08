import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  HomeIcon,
  UserIcon,
  BellIcon,
  BookmarkIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/Logo2.png";   

const SideNavBar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-full w-64 bg-[#D9C9A8] shadow-xl z-50 rounded-r-xl flex flex-col"
      >
        <div className="p-5 flex flex-col items-center border-b">
          <img src={logo} alt="App Logo" className="h-16 mb-0" />
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4"
          >
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Navigation Links */}

        <nav className="p-5 flex-grow space-y-4">
          <Link
            to="/routes"
            className="flex items-center space-x-3 text-gray-900 hover:bg-gray-300 px-4 py-2 rounded-lg"
          >
            <HomeIcon className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center space-x-3 text-gray-900 hover:bg-gray-300 px-4 py-2 rounded-lg"
          >
            <UserIcon className="h-5 w-5" />
            <span>Profile</span>
          </Link>
          <Link
            to="/notifications"
            className="flex items-center space-x-3 text-gray-900 hover:bg-gray-300 px-4 py-2 rounded-lg"
          >
            <BellIcon className="h-5 w-5" />
            <span>Notifications</span>
          </Link>
          <Link
            to="/saved-routes"
            className="flex items-center space-x-3 text-gray-900 hover:bg-gray-300 px-4 py-2 rounded-lg"
          >
            <BookmarkIcon className="h-5 w-5" />
            <span>Saved</span>
          </Link>
          <Link
            to="/feedback"
            className="flex items-center space-x-3 text-gray-900 hover:bg-gray-300 px-4 py-2 rounded-lg"
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
            <span>Feedback</span>
          </Link>
          <Link
            to="/contact"
            className="flex items-center space-x-3 text-gray-900 hover:bg-gray-300 px-4 py-2 rounded-lg"
          >
            <DocumentTextIcon className="h-5 w-5" />
            <span>Contact</span>
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="p-5">
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md"
          >
            LOGOUT
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default SideNavBar;
