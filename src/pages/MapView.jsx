import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import { motion } from "framer-motion";







import "leaflet/dist/leaflet.css";
import busImage from "../assets/location.png"; 



import { MagnifyingGlassIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const API_KEY = "5b3ce3597851110001cf624824c51333a9f64c12b40c264a4665395c";
const START_COORDS = [26.8429192, 75.6557093]; // Jaipur

const createIcon = (iconUrl) =>
  new L.Icon({
    iconUrl,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

const busIcon = new L.Icon({
  iconUrl:busImage,



  iconSize: [50, 50],
  iconAnchor: [25, 25],
});

const getDistance = (coord1, coord2) => {
  const R = 6371e3; 
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;

  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const MapView = () => {
  const navigate = useNavigate();
  const { id } = useParams();



  const [searchParams] = useSearchParams();
  const destination = [parseFloat(searchParams.get("lat")), parseFloat(searchParams.get("lng"))];
  const stops = JSON.parse(searchParams.get("stops")) || [];
  const [route, setRoute] = useState([]);


  // const [searchParams] = useSearchParams();
  const [busPosition, setBusPosition] = useState(null);
  const [busIndex, setBusIndex] = useState(0);


  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!destination[0] || !destination[1]) return;

    const fetchRoute = async () => {
      let waypoints = stops.map(stop => `${stop[1]},${stop[0]}`).join("|");
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${START_COORDS[1]},${START_COORDS[0]}&end=${destination[1]},${destination[0]}&intermediate=${waypoints}`;

      try {
        const response = await fetch(url);





        const data = await response.json();

        if (data.features?.length > 0) {









          const coordinates = data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
          setRoute(coordinates);
          setBusPosition(coordinates[0]);
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();
  }, [destination, stops]);

  useEffect(() => {
    if (route.length > 0 && busIndex < route.length - 1) {
      const interval = setInterval(() => {
        setBusIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          setBusPosition(route[nextIndex]);

          stops.forEach((stop, index) => {
            let distance = getDistance(route[nextIndex], stop);

            if (distance < 800) {
              const eta = Math.floor(distance / 200); 


              
              setNotifications(prev => [
                ...prev.filter(n => n.stopIndex !== index), 
                { stopIndex: index, name: `Stop ${index + 1}`, eta },
              ]);

              setTimeout(() => {
                setNotifications(prev => prev.filter(n => n.stopIndex !== index));
              }, 5000); 
            }
          });

          return nextIndex;
        });
      }, 500);

      return () => 
        clearInterval(interval);
    }
  }, [route, busIndex, stops]);


  //navbar, map container

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-600 to-indigo-900 px-4 py-6 relative">
      
      <div className="absolute top-6 left-4 right-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
        </button>
        <h2 className="text-white text-lg font-semibold">Bus Route Map</h2>
        <div className="w-10 h-10 bg-white rounded-full shadow-md"></div>
      </div>

     
      <div className="relative w-full max-w-md mt-16 mb-4">
        <input
          type="text"
          placeholder="Search location..."
          className="w-full pl-12 pr-4 py-3 rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
      </div>

      
      <div className="w-full max-w-md h-[55vh] bg-white rounded-2xl overflow-hidden shadow-lg">
        <MapContainer center={START_COORDS} zoom={12} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

     
          <Marker position={START_COORDS} icon={createIcon("https://maps.google.com/mapfiles/ms/icons/green-dot.png")} />

        











          {stops.map((stop, index) => (
            <Marker key={index} position={stop} icon={createIcon("https://maps.google.com/mapfiles/ms/icons/blue-dot.png")} />
          ))}



          {destination[0] && destination[1] && (
            <Marker position={destination} icon={createIcon("https://maps.google.com/mapfiles/ms/icons/red-dot.png")} />
          )}

         
          {route.length > 0 && <Polyline positions={route} color="blue" weight={5} />}
          {busPosition && <Marker position={busPosition} icon={busIcon} />}
        </MapContainer>
      </div>







      
      <div className="absolute bottom-10 left-4 right-4 flex flex-col space-y-2">
        {notifications.map((notification, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md backdrop-blur-lg bg-white/30 shadow-lg rounded-xl px-6 py-3 text-center"
          >
            <h3 className="text-lg font-semibold text-white">{notification.name}</h3>
            <p className="text-gray-200">Arriving in {notification.eta} min</p>
          </motion.div>
        ))}
      </div>







    </div>
  );
};

export default MapView;
