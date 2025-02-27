import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/Logo2.png";

import {
  XMarkIcon,
  HomeIcon,
  UserIcon,
  BellIcon,
  BookmarkIcon,
  ChatBubbleBottomCenterTextIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

// import logo from '../assets/Logo2.png'; 
const SideNavBar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  return (
    <>
     
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-full w-64 bg-[#D9C9A8] shadow-lg rounded-r-3xl z-50 p-4"
      >

        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="w-16 h-16" />
          <h2 className="text-lg font-semibold text-gray-900 mt-2">
            Where is my Bus ??
          </h2>
        </div>

        {/*side bar routes*/}
        <nav className="space-y-4">
          <SidebarItem icon={HomeIcon} text="Home" onClick={() => navigate("/")} />
          <SidebarItem icon={UserIcon} text="Profile" />
          <SidebarItem icon={BellIcon} text="Notifications" onClick={() => navigate("/notifications")} />
          <SidebarItem icon={BookmarkIcon} text="Saved" />
          <SidebarItem icon={ChatBubbleBottomCenterTextIcon} text="Feedback" />
          <SidebarItem icon={DocumentTextIcon} text="Contact" />
        </nav>

       
        <button
          onClick={() => navigate("/login")}
          className="absolute bottom-6 left-4 right-4 bg-blue-600 text-white text-lg font-semibold py-2 rounded-xl hover:bg-blue-700 transition"
        >
          <ArrowRightOnRectangleIcon className="inline h-5 w-5 mr-2" />
          Logout
        </button>

        
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
        >
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        </button>
      </motion.div>

   
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

//sidebar item component
const SidebarItem = ({ icon: Icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center text-left py-2 px-4 text-gray-900 hover:bg-gray-200 rounded-md"
  >
    <Icon className="h-5 w-5 mr-3 text-gray-700" />
    {text}
  </button>
);

export default SideNavBar;
