import React, { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import { motion, AnimatePresence } from "framer-motion";
import "leaflet/dist/leaflet.css";
import busImage from "../assets/location.png";
import {
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  ClockIcon,
  MapPinIcon,
  BellIcon,
  InformationCircleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  UserIcon,
  PhoneIcon,
  StarIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

const GRAPHOPPER_API_KEY = "cd03d788-0fba-4e9f-b52b-a9b2028d45cf";
const START_COORDS = [26.8429192, 75.6557093]; // Jaipur

// Function to create custom icons
const createIcon = (iconUrl) =>
  new L.Icon({
    iconUrl,
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35],
    className: "shadow-lg",
  });

const busIcon = new L.Icon({
  iconUrl: busImage,
  iconSize: [50, 50],
  iconAnchor: [25, 25],
  popupAnchor: [0, -25],
  className: "animate-pulse",
});

// Component to recenter map when bus position changes
const MapFollower = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.panTo(position);
    }
  }, [position, map]);

  return null;
};

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
  const [isFollowingBus, setIsFollowingBus] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(2000);
  const [showDetails, setShowDetails] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [currentStop, setCurrentStop] = useState("Jaipur Central");
  const [nextStop, setNextStop] = useState("Gandhi Nagar");
  const [busInfo, setBusInfo] = useState({
    busNumber: `RT-${id || "105"}`,
    driver: "Rajesh Kumar",
    rating: 4.7,
    capacity: "42 seats",
    occupancy: "28 passengers",
    status: "On Time",
    arrivalTime: "10:45 AM",
    departureTime: "10:50 AM",
  });
  const [searchValue, setSearchValue] = useState("");

  // Generate some sample notifications
  useEffect(() => {
    if (stops.length > 0 && route.length > 0) {
      const sampleNotifications = [
        { name: "Next Stop: Gandhi Nagar", eta: 5, type: "info" },
        { name: "Traffic Alert: Slight Delay", eta: 10, type: "warning" },
      ];
      setNotifications(sampleNotifications);

      // Set estimated arrival time (in minutes)
      setEstimatedTime(Math.floor(15 + Math.random() * 10));
    }
  }, [stops, route]);

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
          const nextIndex = Math.min(prevIndex + 1, route.length - 1);
          setBusPosition(route[nextIndex]);
          return nextIndex;
        });
      }, animationSpeed);

      return () => clearInterval(interval);
    }
  }, [route, busIndex, animationSpeed]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchValue);
  };

  const toggleFollowBus = () => {
    setIsFollowingBus(!isFollowingBus);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Calculate progress percentage
  const progressPercentage =
    route.length > 0 ? (busIndex / (route.length - 1)) * 100 : 0;

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gradient-to-b from-[#f0f0f0] to-[#e0e0e0] px-4 py-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-md mb-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 active:scale-95"
        >
          <ArrowLeftIcon className="h-6 w-6 text-gray-800" />
        </button>
        <h2 className="text-[22px] font-extrabold tracking-wider text-gray-900 flex items-center">
          <span className="bg-blue-500 w-3 h-3 rounded-full mr-2 animate-pulse"></span>
          LIVE TRACKING
        </h2>
        <button
          onClick={() =>
            setNotifications((prev) => [
              ...prev,
              {
                name: "Bus is arriving soon!",
                eta: 2,
                type: "alert",
              },
            ])
          }
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 active:scale-95 relative"
        >
          <BellIcon className="h-6 w-6 text-gray-800" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </button>
      </div>

      {/* Bus Info Card */}
      <div className="w-full max-w-md mb-4">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-blue-500 p-2 rounded-full mr-3">
                <ClockIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  Bus {busInfo.busNumber}
                </h3>
                <div className="flex items-center">
                  <p className="text-gray-600 text-sm">{busInfo.status}</p>
                  <span className="mx-2 text-gray-400">•</span>
                  <p className="text-gray-600 text-sm">
                    ETA: {estimatedTime} min
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={toggleDetails}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
            >
              {showDetails ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-600" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <UserIcon className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        {busInfo.driver}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <StarIcon className="h-4 w-4 text-yellow-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        {busInfo.rating}/5.0
                      </span>
                    </div>
                    <div className="flex items-center">
                      <PhoneIcon className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        Contact Driver
                      </span>
                    </div>
                    <div className="flex items-center">
                      <InformationCircleIcon className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        {busInfo.occupancy}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Journey Progress */}
          <div className="mt-3">
            <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
              <span>{currentStop}</span>
              <span>{nextStop}</span>
              <span>Destination</span>
            </div>
            <div className="relative w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>

              {/* Current position indicator */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-600 rounded-full shadow-md transition-all duration-500 ease-in-out"
                style={{ left: `calc(${progressPercentage}% - 8px)` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Box */}
      <form onSubmit={handleSearch} className="relative w-full max-w-md mb-4">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search stops or locations..."
          className="w-full pl-10 pr-4 py-3 bg-white rounded-full shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
        />
      </form>

      {/* Map Container */}
      <div className="w-full max-w-md h-[50vh] bg-white rounded-2xl overflow-hidden shadow-lg relative">
        <MapContainer
          center={START_COORDS}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Start Marker */}
          <Marker
            position={START_COORDS}
            icon={createIcon(
              "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
            )}
          >
            <Popup>Starting Point: {currentStop}</Popup>
          </Marker>

          {/* Stops Markers */}
          {stops.map((stop, index) => (
            <Marker
              key={index}
              position={stop}
              icon={createIcon(
                "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              )}
            >
              <Popup>
                Stop #{index + 1}:{" "}
                {index === 0 ? nextStop : `Stop ${index + 1}`}
              </Popup>
            </Marker>
          ))}

          {/* Destination Marker */}
          {destination[0] && destination[1] && (
            <Marker
              position={destination}
              icon={createIcon(
                "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
              )}
            >
              <Popup>Destination</Popup>
            </Marker>
          )}

          {/* Route Polyline */}
          {route.length > 0 && (
            <Polyline
              positions={route}
              color="#3B82F6"
              weight={5}
              dashArray={[10, 5]}
              opacity={0.7}
            />
          )}

          {/* Bus Marker */}
          {busPosition && (
            <Marker position={busPosition} icon={busIcon}>
              <Popup>
                <div className="text-center">
                  <p className="font-bold">Bus {busInfo.busNumber}</p>
                  <p className="text-sm">Driver: {busInfo.driver}</p>
                  <p className="text-sm text-blue-600">
                    ETA: {estimatedTime} min
                  </p>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Map follower component */}
          {isFollowingBus && busPosition && (
            <MapFollower position={busPosition} />
          )}
        </MapContainer>

        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <button
            onClick={toggleFollowBus}
            className={`p-3 rounded-full shadow-md transition-all duration-300 ${
              isFollowingBus
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            <MapPinIcon className="h-5 w-5" />
          </button>

          <button
            onClick={() =>
              setAnimationSpeed((prev) => (prev === 2000 ? 500 : 2000))
            }
            className="p-3 bg-white rounded-full shadow-md text-gray-700 hover:bg-gray-100"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Speed indicator */}
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-md">
          {animationSpeed === 2000 ? "Real-time" : "Fast forward"}
        </div>
      </div>

      {/* Upcoming Stops */}
      <div className="w-full max-w-md mt-4">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h3 className="font-bold text-gray-900 mb-2 flex items-center">
            <MapPinIcon className="h-5 w-5 text-blue-500 mr-2" />
            Upcoming Stops
          </h3>
          <div className="space-y-3">
            {[nextStop, "Malviya Nagar", "Jawahar Circle"].map(
              (stop, index) => (
                <div key={index} className="flex items-center">
                  <div className="relative mr-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {index + 1}
                      </span>
                    </div>
                    {index < 2 && (
                      <div className="absolute top-8 left-1/2 w-0.5 h-3 bg-gray-300"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{stop}</p>
                    <p className="text-xs text-gray-500">
                      Arriving in {5 + index * 7} minutes
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(
                        Date.now() + (5 + index * 7) * 60000
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="fixed bottom-6 left-4 right-4 flex flex-col items-center space-y-2 pointer-events-none">
        <AnimatePresence>
          {notifications.map((notification, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`w-full max-w-md backdrop-blur-md shadow-lg rounded-xl px-6 py-4 text-center pointer-events-auto
                ${
                  notification.type === "warning"
                    ? "bg-amber-50/90 border border-amber-200"
                    : notification.type === "alert"
                    ? "bg-red-50/90 border border-red-200"
                    : "bg-white/90 border border-gray-200"
                }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <BellIcon
                  className={`h-5 w-5 ${
                    notification.type === "warning"
                      ? "text-amber-500"
                      : notification.type === "alert"
                      ? "text-red-500"
                      : "text-blue-500"
                  }`}
                />
                <h3 className="text-lg font-semibold text-gray-900">
                  {notification.name}
                </h3>
              </div>
              <p className="text-gray-600">
                {notification.eta > 0
                  ? `Arriving in ${notification.eta} min`
                  : "Arriving now!"}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MapView;
