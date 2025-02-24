import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/outline";

function RoutesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Routes with stops (waypoints)
  const routes = [
    {
      id: 1,
      number: "101",
      name: "JKLU-Mansarover",
      eta: "5 min",
      destination: [26.891839, 75.743184], // Final destination
      stops: [
        [26.85117, 75.641325], // Stop 1
        // [26.876757, 75.713383], // Stop 2
      ],
    },
    {
      id: 2,
      number: "102",
      name: "JKLU-Tonk Phatak",
      eta: "10 min",
      destination: [27.00047, 75.770244],
      stops: [
        [26.9012, 75.7556], // Stop 1
        [26.9208, 75.765], // Stop 2
      ],
    },
    {
      id: 3,
      number: "303",
      name: "Amer Fort",
      eta: "15 min",
      destination: [26.988241, 75.962551],
      stops: [
        [26.9356, 75.8754], // Stop 1
        [26.9608, 75.93], // Stop 2
      ],
    },
  ];

  const filteredRoutes = routes.filter(
    (route) =>
      route.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
   





      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">









          
          
          
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Bars3Icon className="h-6 w-6 text-gray-600" />
          </button>
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search routes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
               
               
               
               
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {filteredRoutes.map((route) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() =>
                navigate(
                  `/map/${route.id}?lat=${route.destination[0]}&lng=${
                    route.destination[1]
                  }&stops=${JSON.stringify(route.stops)}`
                )
              }
            >



              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Bus {route.number}
                  </h3>
                  <p className="text-gray-600">{route.name}</p>
                </div>
                <div className="text-blue-600 font-semibold">{route.eta}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoutesPage;
