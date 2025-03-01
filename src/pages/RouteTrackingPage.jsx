import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const stopsData = [
  { id: 1, name: " CT", status: "DEPARTED 2HR" },
  { id: 2, name: "ABX", status: "DEPARTED 2HR" },



  { id: 3, name: "EE", status: "DEPARTED 1.5HR" },
  { id: 4, name: "THE FALLS", status: "DEPARTED 1HR" },
  { id: 5, name: "JAIPUR", status: "ARRIVING IN 5 MIN" },
];

const RouteTrackingPage = () => {
  const navigate = useNavigate();
  const { routeId } = useParams();

  return (
    <div className="min-h-screen bg-[#D9C9A8] px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white shadow-md">
          <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
        </button>
        <h2 className="text-xl font-semibold text-gray-900">Track the Routes</h2>
        <div className="w-10"></div>
      </div>

      <div className="space-y-2">
        {stopsData.map((stop) => (
          <motion.div key={stop.id} className="flex justify-between px-4 py-3 bg-white rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-xl">⚫</span>
              <span className="text-gray-900 font-medium">{stop.name}</span>
            </div>
            <span className="text-gray-600 text-sm">{stop.status}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RouteTrackingPage;
