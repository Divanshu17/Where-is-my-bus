import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";
import busImage from "../assets/location.png";
import { MagnifyingGlassIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const GRAPHOPPER_API_KEY = "cd03d788-0fba-4e9f-b52b-a9b2028d45cf"; 
const START_COORDS = [26.8429192, 75.6557093]; // Jaipur

// Function to create marker icons
const createIcon = (iconUrl) =>
  new L.Icon({
    iconUrl,
    iconSize: [35, 35],
    iconAnchor: [17, 35],
  });

const busIcon = new L.Icon({
  iconUrl: busImage,
  iconSize: [50, 50],
  iconAnchor: [25, 25],
});

const MapView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const destination = [
    parseFloat(searchParams.get("lat")),
    parseFloat(searchParams.get("lng")),
  ];
  const stops = JSON.parse(searchParams.get("stops")) || [];
  const [route, setRoute] = useState([]);
  const [busPosition, setBusPosition] = useState(null);
  const [busIndex, setBusIndex] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!destination[0] || !destination[1]) return;

    const fetchRoute = async () => {
      try {
        let waypoints = stops
          .map((stop) => `&point=${stop[0]},${stop[1]}`)
          .join("");

        const url = `https://graphhopper.com/api/1/route?point=${START_COORDS[0]},${START_COORDS[1]}&point=${destination[0]},${destination[1]}${waypoints}&vehicle=car&points_encoded=false&key=${GRAPHOPPER_API_KEY}`;

        console.log("Fetching route from:", url);

        const response = await fetch(url);
        const data = await response.json();

        if (!data.paths || data.paths.length === 0) {
          console.error("No route data found:", data);
          return;
        }

        // Extract route coordinates
        const routePath = data.paths[0].points.coordinates.map(([lng, lat]) => [
          lat,
          lng,
        ]);

        setRoute(routePath);
        setBusPosition(routePath[0]);
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();
  }, [destination, stops]);

  useEffect(() => {
    if (route.length > 0 && busIndex < route.length - 1) {
      const interval = setInterval(() => {
        setBusIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          setBusPosition(route[nextIndex]);
          return nextIndex;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [route, busIndex]);

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-[#D9C9A8] px-4 py-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-md mb-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <ArrowLeftIcon className="h-6 w-6 text-gray-800" />
        </button>
        <h2 className="text-[22px] font-extrabold tracking-wider uppercase text-gray-900">
          Bus Route
        </h2>
        <div className="w-10"></div>
      </div>

      {/* Search Box */}
      <div className="relative w-full max-w-md mb-4">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search location..."
          className="w-full pl-10 pr-4 py-3 bg-gray-200 rounded-full shadow-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Map Container */}
      <div className="w-full max-w-md h-[60vh] bg-white rounded-2xl overflow-hidden shadow-lg">
        <MapContainer
          center={START_COORDS}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Start Marker */}
          <Marker
            position={START_COORDS}
            icon={createIcon(
              "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
            )}
          />

          {/* Stops Markers */}
          {stops.map((stop, index) => (
            <Marker
              key={index}
              position={stop}
              icon={createIcon(
                "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              )}
            />
          ))}

          {/* Destination Marker */}
          {destination[0] && destination[1] && (
            <Marker
              position={destination}
              icon={createIcon(
                "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
              )}
            />
          )}

          {/* Route Polyline */}
          {route.length > 0 && (
            <Polyline positions={route} color="blue" weight={5} />
          )}

          {/* Bus Marker */}
          {busPosition && <Marker position={busPosition} icon={busIcon} />}
        </MapContainer>
      </div>

      {/* Notifications */}
      <div className="absolute bottom-10 left-4 right-4 flex flex-col space-y-2">
        {notifications.map((notification, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md bg-white/30 shadow-lg rounded-xl px-6 py-3 text-center"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {notification.name}
            </h3>
            <p className="text-gray-600">Arriving in {notification.eta} min</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MapView;
