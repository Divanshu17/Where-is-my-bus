// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   MagnifyingGlassIcon,
//   Bars3Icon,
//   BookmarkIcon,
//   TruckIcon,
// } from "@heroicons/react/24/outline";
// import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
// import SideNavBar from "./components/SideNavBar.jsx";

// function RoutesPage() {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [savedRoutes, setSavedRoutes] = useState([]);

//   // Load saved routes from localStorage when component mounts
//   useEffect(() => {
//     const storedRoutes = JSON.parse(localStorage.getItem("savedRoutes")) || [];
//     setSavedRoutes(storedRoutes);
//   }, []);

//   // Routes with stops (waypoints)
//   const routes = [
//     {
//       id: 1,
//       number: "101",
//       name: "JKLU-Mansarover",
//       eta: "5 min",
//       destination: [26.891839, 75.743184], // Final destination
//       stops: [[26.85117, 75.641325]], // Stop 1
//     },
//     {
//       id: 2,
//       number: "102",
//       name: "JKLU-Tonk Phatak",
//       eta: "10 min",
//       destination: [27.00047, 75.770244],
//       stops: [
//         [26.9012, 75.7556],
//         [26.9208, 75.765],
//       ],
//     },
//     {
//       id: 3,
//       number: "303",
//       name: "Amer Fort",
//       eta: "15 min",
//       destination: [26.988241, 75.962551],
//       stops: [
//         [26.9356, 75.8754],
//         [26.9608, 75.93],
//       ],
//     },
//   ];

//   // Filter routes based on search query
//   const filteredRoutes = routes.filter(
//     (route) =>
//       route.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       route.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Function to toggle saving a route
//   const toggleSaveRoute = (route) => {
//     let updatedSavedRoutes = [...savedRoutes];

//     if (savedRoutes.some((saved) => saved.id === route.id)) {
//       updatedSavedRoutes = savedRoutes.filter((saved) => saved.id !== route.id);
//     } else {
//       updatedSavedRoutes.push(route);
//     }

//     setSavedRoutes(updatedSavedRoutes);
//     localStorage.setItem("savedRoutes", JSON.stringify(updatedSavedRoutes));
//   };

//   return (
//     <div className="min-h-screen bg-[#D9C9A8] relative px-4 py-6">
//       {/* Header */}
//       <header className="flex items-center justify-between mb-4">
//         {/* Menu Button */}
//         <button onClick={() => setIsSidebarOpen(true)} className="p-2">
//           <Bars3Icon className="h-6 w-6 text-gray-900" />
//         </button>
//         <h2 className="text-[22px] font-extrabold tracking-wider uppercase text-gray-900">
//           ROUTES
//         </h2>
//         <div className="w-10"></div>
//       </header>

//       {/* Search Box */}
//       <div className="flex flex-col items-center mb-6">
//         <div className="relative w-full max-w-md mb-4">
//           <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//           <input
//             type="text"
//             placeholder="Enter Bus No"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-10 pr-4 py-3 bg-gray-200 rounded-full focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <button className="w-full max-w-md py-3 bg-blue-600 text-white rounded-lg font-semibold">
//           Search
//         </button>
//       </div>

//       {/* Sidebar */}
//       <SideNavBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

//       {/* Routes List */}
//       <div className="max-w-7xl mx-auto space-y-4">
//         {filteredRoutes.map((route) => {
//           const isSaved = savedRoutes.some((saved) => saved.id === route.id);

//           return (
//             <motion.div
//               key={route.id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="p-4 border-b border-gray-700 flex justify-between items-center cursor-pointer"
//               onClick={() => navigate(`/track/${route.id}`)}
//             >
//               {/* Route Info */}
//               <div className="flex flex-col">
//                 <div className="flex items-center space-x-2 mb-1">
//                   <div className="border border-gray-700 rounded-md px-2 py-1 flex items-center space-x-1">
//                     <TruckIcon className="h-4 w-4 text-gray-800" />{" "}
//                     <span className="text-gray-800 text-sm">
//                       {route.number}
//                     </span>
//                   </div>
//                   <span className="text-sm text-gray-600">{route.eta}</span>
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   {route.name}
//                 </h3>
//               </div>

//               {/* Save Route Button (Toggle between Outline & Solid) */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleSaveRoute(route);
//                 }}
//                 className="transition-transform hover:scale-110"
//               >
//                 {isSaved ? (
//                   <BookmarkIconSolid className="h-6 w-6 text-blue-600" />
//                 ) : (
//                   <BookmarkIcon className="h-6 w-6 text-gray-600" />
//                 )}
//               </button>
//             </motion.div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default RoutesPage;

// Updated ui------------------------------

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  BookmarkIcon,
  TruckIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid, StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import SideNavBar from "./components/SideNavBar.jsx";

function RoutesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // "all" or "saved"

  // Load saved routes from localStorage when component mounts
  useEffect(() => {
    const storedRoutes = JSON.parse(localStorage.getItem("savedRoutes")) || [];
    setSavedRoutes(storedRoutes);
  }, []);

  // Routes with stops (waypoints)
  const routes = [
    {
      id: 1,
      number: "101",
      name: "JKLU-Mansarover",
      eta: "5 min",
      destination: [26.891839, 75.743184], // Final destination
      stops: [[26.85117, 75.641325]], // Stop 1
      color: "#4F46E5", // Indigo
      popularity: 4.8,
    },
    {
      id: 2,
      number: "102",
      name: "JKLU-Tonk Phatak",
      eta: "10 min",
      destination: [27.00047, 75.770244],
      stops: [
        [26.9012, 75.7556],
        [26.9208, 75.765],
      ],
      color: "#0EA5E9", // Sky blue
      popularity: 4.5,
    },
    {
      id: 3,
      number: "303",
      name: "Amer Fort",
      eta: "15 min",
      destination: [26.988241, 75.962551],
      stops: [
        [26.9356, 75.8754],
        [26.9608, 75.93],
      ],
      color: "#10B981", // Emerald
      popularity: 4.2,
    },
  ];

  // Filter routes based on search query and active tab
  const filteredRoutes = routes.filter(
    (route) => {
      const matchesSearch = route.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeTab === "all") return matchesSearch;
      return matchesSearch && savedRoutes.some(saved => saved.id === route.id);
    }
  );

  // Function to toggle saving a route
  const toggleSaveRoute = (route) => {
    let updatedSavedRoutes = [...savedRoutes];

    if (savedRoutes.some((saved) => saved.id === route.id)) {
      updatedSavedRoutes = savedRoutes.filter((saved) => saved.id !== route.id);
    } else {
      updatedSavedRoutes.push(route);
    }

    setSavedRoutes(updatedSavedRoutes);
    localStorage.setItem("savedRoutes", JSON.stringify(updatedSavedRoutes));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#D9C9A8] relative">
      {/* Header with Glassmorphism */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-[#D9C9A8]/90 shadow-sm px-6 py-4 flex items-center justify-between">
        <button 
          onClick={() => setIsSidebarOpen(true)} 
          className="p-2 rounded-full hover:bg-[#C4B393]/50 transition-colors"
        >
          <Bars3Icon className="h-6 w-6 text-gray-800" />
        </button>
        <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Bus Routes
        </h2>
        <div className="w-10"></div>
      </header>

      {/* Search Box with Visual Enhancement */}
      <div className="px-6 pt-5 pb-3">
        <div className="relative w-full mb-4">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 absolute left-4 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by route number or name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-[#E8DCC8] border border-[#C4B393] rounded-xl shadow-sm focus:ring-2 focus:ring-[#A69678] focus:outline-none transition-all"
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-4 border-b border-[#C4B393]">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              activeTab === "all" 
                ? "text-gray-800" 
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            All Routes
            {activeTab === "all" && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              activeTab === "saved" 
                ? "text-gray-800" 
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Saved Routes
            {activeTab === "saved" && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800"
              />
            )}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <SideNavBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Routes List with Enhanced Visuals */}
      <div className="px-6 pb-6">
        <AnimatePresence mode="wait">
          {filteredRoutes.length > 0 ? (
            <motion.div 
              key="routes-list"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {filteredRoutes.map((route) => {
                const isSaved = savedRoutes.some((saved) => saved.id === route.id);

                return (
                  <motion.div
                    key={route.id}
                    variants={itemVariants}
                    className="bg-[#E8DCC8] rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 border border-[#C4B393]"
                  >
                    <div 
                      className="p-4 cursor-pointer"
                      onClick={() => navigate(`/track/${route.id}`)}
                    >
                      {/* Route number badge with custom color */}
                      <div className="flex justify-between items-start mb-3">
                        <div 
                          className="rounded-lg px-3 py-1.5 flex items-center space-x-1.5 text-white"
                          style={{ backgroundColor: route.color }}
                        >
                          <TruckIcon className="h-4 w-4" />
                          <span className="font-medium">
                            {route.number}
                          </span>
                        </div>
                        
                        {/* Save Route Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveRoute(route);
                          }}
                          className="p-2 rounded-full hover:bg-[#D9C9A8] transition-all"
                        >
                          {isSaved ? (
                            <BookmarkIconSolid className="h-6 w-6 text-gray-800" />
                          ) : (
                            <BookmarkIcon className="h-6 w-6 text-gray-600" />
                          )}
                        </button>
                      </div>
                      
                      {/* Route Info */}
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {route.name}
                          </h3>
                          
                          <div className="flex items-center mt-1 text-gray-600 text-sm space-x-4">
                            <div className="flex items-center">
                              <MapPinIcon className="h-4 w-4 mr-1" />
                              <span>{route.stops.length} stops</span>
                            </div>
                            
                            <div className="flex items-center text-amber-700">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              <span className="font-medium">{route.eta}</span>
                            </div>
                          </div>
                          
                          {/* Popularity rating */}
                          <div className="flex items-center mt-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>
                                {i < Math.floor(route.popularity) ? (
                                  <StarIconSolid className="h-4 w-4 text-amber-500" />
                                ) : i < route.popularity ? (
                                  <StarIconSolid className="h-4 w-4 text-amber-500 opacity-50" />
                                ) : (
                                  <StarIcon className="h-4 w-4 text-gray-400" />
                                )}
                              </span>
                            ))}
                            <span className="ml-1 text-xs text-gray-600">
                              ({route.popularity})
                            </span>
                          </div>
                        </div>
                        
                        {/* Visual indicator to view details */}
                        <div className="bg-[#D9C9A8] rounded-full p-2 text-gray-600 hover:bg-[#C4B393] hover:text-gray-800 transition-colors">
                          <ArrowRightIcon className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Visual route indicator */}
                    <div className="h-1.5" style={{ backgroundColor: route.color }}></div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div 
              key="no-routes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-[#E8DCC8] rounded-xl shadow-sm p-8 text-center border border-[#C4B393]"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-[#D9C9A8] rounded-full flex items-center justify-center">
                <MagnifyingGlassIcon className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-gray-800 font-medium mb-2">No routes found</h3>
              <p className="text-sm text-gray-600 mb-4">
                {activeTab === "saved" 
                  ? "You haven't saved any routes yet" 
                  : "Try adjusting your search criteria"}
              </p>
              {activeTab === "saved" && (
                <button 
                  onClick={() => setActiveTab("all")}
                  className="text-sm text-gray-800 font-medium hover:text-gray-900 underline"
                >
                  Browse all routes
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default RoutesPage;


