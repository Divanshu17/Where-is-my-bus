// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { MapPin, Clock, ArrowLeft, Bus, AlertCircle } from "lucide-react";

// const RouteDetailsPage = () => {
//   const { routeId } = useParams();
//   const navigate = useNavigate();
//   const [currentStopIndex, setCurrentStopIndex] = useState(0);
//   const [progressPercent, setProgressPercent] = useState(0); // 0-100 between stops
//   const [busStatus, setBusStatus] = useState("Moving");
//   const [isAnimating, setIsAnimating] = useState(true);
//   const animationRef = useRef(null);

//   // Stops data with more details
//   const stops = [
//     {
//       name: "JKLU",
//       time: "14:30",
//       distance: "Start",
//       type: "start",
//       status: "completed",
//     },
//     {
//       name: "Bhakrota",
//       time: "14:45",
//       distance: "5 Km",
//       type: "normal",
//       status: "upcoming",
//     },
//     {
//       name: "Keshopura",
//       time: "15:00",
//       distance: "10 Km",
//       type: "normal",
//       status: "upcoming",
//     },
//     {
//       name: "Kamla Nehru Nagar",
//       time: "15:15",
//       distance: "15 Km",
//       type: "normal",
//       status: "upcoming",
//     },
//     {
//       name: "Gajsinghpur",
//       time: "15:30",
//       distance: "20 Km",
//       type: "normal",
//       status: "upcoming",
//     },
//     {
//       name: "RSEB Colony",
//       time: "15:45",
//       distance: "25 Km",
//       type: "normal",
//       status: "upcoming",
//     },
//     {
//       name: "Vardhman Nagar",
//       time: "16:00",
//       distance: "30 Km",
//       type: "normal",
//       status: "upcoming",
//     },
//     {
//       name: "200ft Bus Stand",
//       time: "16:15",
//       distance: "35 Km",
//       type: "normal",
//       status: "upcoming",
//     },
//     {
//       name: "Element Mall",
//       time: "16:30",
//       distance: "40 Km",
//       type: "normal",
//       status: "upcoming",
//     },
//     {
//       name: "Vidyut Nagar",
//       time: "16:45",
//       distance: "45 Km",
//       type: "normal",
//       status: "upcoming",
//     },
//     {
//       name: "Mansarover",
//       time: "17:00",
//       distance: "50 Km",
//       type: "destination",
//       status: "upcoming",
//     },
//   ];

//   // Calculate total progress percentage across the entire route
//   const calculateTotalProgress = () => {
//     if (currentStopIndex >= stops.length - 1) return 100;
//     const segmentSize = 100 / (stops.length - 1);
//     return (
//       currentStopIndex * segmentSize + (progressPercent / 100) * segmentSize
//     );
//   };

//   useEffect(() => {
//     const startAnimation = async () => {
//       setCurrentStopIndex(0);
//       setProgressPercent(0);
//       setBusStatus("Moving to " + stops[0].name);

//       const animateBusMovement = async () => {
//         for (let i = 0; i < stops.length - 1; i++) {
//           setCurrentStopIndex(i);
//           setBusStatus(`Moving to ${stops[i + 1].name}`);

//           for (let p = 0; p <= 100; p += 1) {
//             if (!isAnimating) return; // Stop if animation is cancelled
//             setProgressPercent(p);
//             await new Promise((resolve) => setTimeout(resolve, 250)); // 25ms per step = ~2.5 seconds total
//           }

//           setCurrentStopIndex(i + 1);
//           setProgressPercent(0);
//           setBusStatus(`Halted at ${stops[i + 1].name}`);
//           await new Promise((resolve) => setTimeout(resolve, 4500));
//         }

//         setBusStatus("Reached Destination");
//       };

//       animationRef.current = animateBusMovement();
//       await animationRef.current;
//     };

//     if (isAnimating) {
//       startAnimation();
//     }

//     return () => {
//       setIsAnimating(false);
//       animationRef.current = null;
//     };
//   }, [isAnimating]);

//   // Function to handle "View on Map" button click
//   const handleViewOnMap = () => {
//     const destination = [26.891839, 75.743184]; // Example destination coordinates
//     const routeStops = [
//       [26.85117, 75.641325], // Example stop coordinates
//       [26.9012, 75.7556],
//       [26.9208, 75.765],
//     ];

//     navigate(
//       `/map/${routeId}?lat=${destination[0]}&lng=${
//         destination[1]
//       }&stops=${JSON.stringify(routeStops)}`
//     );
//   };

//   // Function to handle "Buy Ticket" button click
//   const handleBuyTicket = () => {
//     navigate("/payment"); // Navigate to the payment page
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
//       <header className="flex items-center justify-between mb-8">
//         <button
//           onClick={() => navigate(-1)}
//           className="p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors"
//         >
//           <ArrowLeft className="h-5 w-5" />
//         </button>
//         <h2 className="text-2xl font-bold text-gray-800">Route Details</h2>
//         <div className="w-10"></div>
//       </header>

//       <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="flex items-center gap-2 mb-2">
//               <Bus className="h-6 w-6 text-blue-600" />
//               <h3 className="text-xl font-bold text-gray-800">
//                 Bus #{routeId}
//               </h3>
//             </div>
//             <div className="flex items-center text-gray-600 text-sm">
//               <MapPin className="h-4 w-4 mr-1" />
//               <span>
//                 {stops[0].name} → {stops[stops.length - 1].name}
//               </span>
//             </div>
//           </div>
//           <div className="flex flex-col items-end">
//             <div
//               className={`flex items-center ${
//                 busStatus.includes("Halted")
//                   ? "text-amber-500"
//                   : busStatus.includes("Reached")
//                   ? "text-green-500"
//                   : "text-blue-500"
//               } font-medium text-base mb-1`}
//             >
//               <Clock className="h-5 w-5 mr-1" />
//               <span>{busStatus}</span>
//             </div>
//             <div className="text-sm text-gray-500">
//               ETA: {stops[stops.length - 1].time}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-xl font-bold text-gray-800">Route Timeline</h3>
//           <div className="flex gap-2">
//             {/* <button 
//               onClick={() => setIsAnimating(true)} 
//               className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
//             >
//               Restart
//             </button> */}
//             <button
//               onClick={handleViewOnMap}
//               className="text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full hover:bg-green-200 transition-colors"
//             >
//               View on Map
//             </button>
//           </div>
//         </div>

//         {/* Timeline container */}
//         <div className="relative pb-2">
//           {/* Timeline track (background) */}
//           <div
//             className="absolute left-4 w-1 bg-gray-200 rounded-full"
//             style={{ top: "16px", bottom: "16px" }}
//           ></div>

//           {/* Progress track (blue fill) */}
//           <div
//             className="absolute left-4 w-1 bg-blue-500 rounded-full transition-all duration-25"
//             style={{
//               top: "16px",
//               height: `${calculateTotalProgress()}%`,
//               maxHeight: `calc(100% - 32px)`,
//             }}
//           ></div>

//           {/* Bus position indicator */}
//           <div
//             className="absolute left-4 w-8 h-8 transform -translate-x-1/2 transition-all duration-25 z-10"
//             style={{
//               top: `calc(${calculateTotalProgress()}% + 16px - 16px)`,
//               display:
//                 calculateTotalProgress() > 0 && calculateTotalProgress() < 100
//                   ? "block"
//                   : "none",
//             }}
//           >
//             <div
//               className={`flex items-center justify-center bg-white rounded-full border-2 ${
//                 busStatus.includes("Halted")
//                   ? "border-amber-500"
//                   : "border-blue-500"
//               }`}
//             >
//               <Bus
//                 className={`h-5 w-5 ${
//                   busStatus.includes("Halted")
//                     ? "text-amber-500"
//                     : busStatus.includes("Reached")
//                     ? "text-green-500"
//                     : "text-blue-500"
//                 }`}
//               />
//             </div>
//           </div>

//           {/* Stops */}
//           <div className="space-y-8 ml-10">
//             {stops.map((stop, index) => {
//               const isPassed =
//                 index < currentStopIndex ||
//                 (index === currentStopIndex && progressPercent === 100);
//               const isCurrent = index === currentStopIndex;

//               return (
//                 <div key={index} className="relative py-2">
//                   {/* Stop marker */}
//                   <div className="absolute left-[-28px] top-1/2 transform -translate-y-1/2">
//                     <div
//                       className={`w-6 h-6 rounded-full flex items-center justify-center ${
//                         isPassed
//                           ? "bg-blue-500 border-2 border-blue-500"
//                           : isCurrent &&
//                             progressPercent === 0 &&
//                             busStatus.includes("Halted")
//                           ? "bg-amber-100 border-2 border-amber-500"
//                           : "bg-white border-2 border-gray-300"
//                       }`}
//                     >
//                       {index === stops.length - 1 && isPassed && (
//                         <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Stop content */}
//                   <div
//                     className={`p-4 rounded-lg ${
//                       isCurrent && progressPercent === 0
//                         ? "bg-blue-50 border border-blue-100"
//                         : "bg-gray-50"
//                     }`}
//                   >
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h4 className="font-medium text-base text-gray-900">
//                           {stop.name}
//                         </h4>
//                         <p className="text-sm text-gray-600 mt-1">
//                           {stop.distance}
//                         </p>
//                       </div>
//                       <div className="flex flex-col items-end">
//                         <span className="text-sm font-medium text-gray-800">
//                           {stop.time}
//                         </span>
//                         {isCurrent &&
//                           progressPercent === 0 &&
//                           busStatus.includes("Halted") && (
//                             <span className="text-sm bg-amber-100 text-amber-700 px-2 py-1 rounded-full mt-1">
//                               Current
//                             </span>
//                           )}
//                         {isPassed && index !== currentStopIndex && (
//                           <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full mt-1">
//                             Passed
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
//         <div className="flex items-center gap-2 mb-4">
//           <AlertCircle className="h-5 w-5 text-amber-500" />
//           <h3 className="text-xl font-bold text-gray-800">Bus Information</h3>
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <div className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
//             <p className="text-sm text-gray-500">Driver</p>
//             <p className="font-medium text-base">Rajesh Kumar</p>
//           </div>
//           <div className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
//             <p className="text-sm text-gray-500">Number</p>
//             <p className="font-medium text-base">RJ 14 BT 2253</p>
//           </div>
//           <div className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
//             <p className="text-sm text-gray-500">Capacity</p>
//             <p className="font-medium text-base">42 Seats</p>
//           </div>
//           <div className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
//             <p className="text-sm text-gray-500">Contact</p>
//             <p className="font-medium text-base">+91 9876543210</p>
//           </div>
//         </div>

//         {/* Buy Ticket Button */}
//         <button
//           onClick={handleBuyTicket}
//           className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//         >
//           Buy Ticket
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RouteDetailsPage;


// Updated UI with improved aesthetics while maintaining the same functionality
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Clock, ArrowLeft, Bus, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const RouteDetailsPage = () => {
  const { routeId } = useParams();
  const navigate = useNavigate();
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [busStatus, setBusStatus] = useState("Moving");
  const [isAnimating, setIsAnimating] = useState(true);
  const animationRef = useRef(null);

  // Stops data with more details
  const stops = [
    {
      name: "JKLU",
      time: "14:30",
      distance: "Start",
      type: "start",
      status: "completed",
    },
    {
      name: "Bhakrota",
      time: "14:45",
      distance: "5 Km",
      type: "normal",
      status: "upcoming",
    },
    {
      name: "Keshopura",
      time: "15:00",
      distance: "10 Km",
      type: "normal",
      status: "upcoming",
    },
    {
      name: "Kamla Nehru Nagar",
      time: "15:15",
      distance: "15 Km",
      type: "normal",
      status: "upcoming",
    },
    {
      name: "Gajsinghpur",
      time: "15:30",
      distance: "20 Km",
      type: "normal",
      status: "upcoming",
    },
    {
      name: "RSEB Colony",
      time: "15:45",
      distance: "25 Km",
      type: "normal",
      status: "upcoming",
    },
    {
      name: "Vardhman Nagar",
      time: "16:00",
      distance: "30 Km",
      type: "normal",
      status: "upcoming",
    },
    {
      name: "200ft Bus Stand",
      time: "16:15",
      distance: "35 Km",
      type: "normal",
      status: "upcoming",
    },
    {
      name: "Element Mall",
      time: "16:30",
      distance: "40 Km",
      type: "normal",
      status: "upcoming",
    },
    {
      name: "Vidyut Nagar",
      time: "16:45",
      distance: "45 Km",
      type: "normal",
      status: "upcoming",
    },
    {
      name: "Mansarover",
      time: "17:00",
      distance: "50 Km",
      type: "destination",
      status: "upcoming",
    },
  ];

  // Calculate total progress percentage across the entire route
  const calculateTotalProgress = () => {
    if (currentStopIndex >= stops.length - 1) return 100;
    const segmentSize = 100 / (stops.length - 1);
    return (
      currentStopIndex * segmentSize + (progressPercent / 100) * segmentSize
    );
  };

  useEffect(() => {
    const startAnimation = async () => {
      setCurrentStopIndex(0);
      setProgressPercent(0);
      setBusStatus("Moving to " + stops[0].name);

      const animateBusMovement = async () => {
        for (let i = 0; i < stops.length - 1; i++) {
          setCurrentStopIndex(i);
          setBusStatus(`Moving to ${stops[i + 1].name}`);

          for (let p = 0; p <= 100; p += 1) {
            if (!isAnimating) return; // Stop if animation is cancelled
            setProgressPercent(p);
            await new Promise((resolve) => setTimeout(resolve, 250)); // 25ms per step = ~2.5 seconds total
          }

          setCurrentStopIndex(i + 1);
          setProgressPercent(0);
          setBusStatus(`Halted at ${stops[i + 1].name}`);
          await new Promise((resolve) => setTimeout(resolve, 4500));
        }

        setBusStatus("Reached Destination");
      };

      animationRef.current = animateBusMovement();
      await animationRef.current;
    };

    if (isAnimating) {
      startAnimation();
    }

    return () => {
      setIsAnimating(false);
      animationRef.current = null;
    };
  }, [isAnimating]);

  // Function to handle "View on Map" button click
  const handleViewOnMap = () => {
    const destination = [26.891839, 75.743184]; // Example destination coordinates
    const routeStops = [
      [26.85117, 75.641325], // Example stop coordinates
      [26.9012, 75.7556],
      [26.9208, 75.765],
    ];

    navigate(
      `/map/${routeId}?lat=${destination[0]}&lng=${
        destination[1]
      }&stops=${JSON.stringify(routeStops)}`
    );
  };

  // Function to handle "Buy Ticket" button click
  const handleBuyTicket = () => {
    navigate("/payment"); // Navigate to the payment page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      {/* Header with glass effect */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-10 backdrop-blur-md bg-white/70 px-6 py-4 shadow-sm flex items-center justify-between"
      >
        <button
          onClick={() => navigate(-1)}
          className="p-2.5 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Route Details
        </h2>
        <div className="w-10"></div>
      </motion.header>

      <div className="container mx-auto max-w-md px-4 py-6 space-y-6">
        {/* Bus Info Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Bus className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Bus #{routeId}
                </h3>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                <span>
                  {stops[0].name} → {stops[stops.length - 1].name}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div
                className={`flex items-center ${
                  busStatus.includes("Halted")
                    ? "text-amber-500"
                    : busStatus.includes("Reached")
                    ? "text-green-500"
                    : "text-blue-500"
                } font-medium text-base mb-1`}
              >
                <Clock className="h-5 w-5 mr-1" />
                <span>{busStatus}</span>
              </div>
              <div className="text-sm text-gray-500">
                ETA: {stops[stops.length - 1].time}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 pt-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{stops[0].name}</span>
              <span>{Math.round(calculateTotalProgress())}%</span>
              <span>{stops[stops.length - 1].name}</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${calculateTotalProgress()}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        {/* Route Timeline Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Route Timeline
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewOnMap}
              className="text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              View on Map
            </motion.button>
          </div>

          {/* Timeline container */}
          <div className="relative pb-2">
            {/* Timeline track (background) */}
            <div
              className="absolute left-4 w-1 bg-gray-200 rounded-full"
              style={{ top: "16px", bottom: "16px" }}
            ></div>

            {/* Progress track (blue fill) */}
            <div
              className="absolute left-4 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full transition-all duration-300"
              style={{
                top: "16px",
                height: `${calculateTotalProgress()}%`,
                maxHeight: `calc(100% - 32px)`,
              }}
            ></div>

            {/* Bus position indicator */}
            <div
              className="absolute left-4 w-8 h-8 transform -translate-x-1/2 transition-all duration-300 z-10"
              style={{
                top: `calc(${calculateTotalProgress()}% + 16px - 16px)`,
                display:
                  calculateTotalProgress() > 0 && calculateTotalProgress() < 100
                    ? "block"
                    : "none",
              }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: busStatus.includes("Moving") ? [0, 5, -5, 0] : 0
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: busStatus.includes("Moving") ? 1.5 : 2,
                  ease: "easeInOut"
                }}
                className={`flex items-center justify-center bg-white rounded-full border-2 shadow-md ${
                  busStatus.includes("Halted")
                    ? "border-amber-500"
                    : "border-blue-500"
                }`}
              >
                <Bus
                  className={`h-5 w-5 ${
                    busStatus.includes("Halted")
                      ? "text-amber-500"
                      : busStatus.includes("Reached")
                      ? "text-green-500"
                      : "text-blue-500"
                  }`}
                />
              </motion.div>
            </div>

            {/* Stops */}
            <div className="space-y-4 ml-10">
              {stops.map((stop, index) => {
                const isPassed =
                  index < currentStopIndex ||
                  (index === currentStopIndex && progressPercent === 100);
                const isCurrent = index === currentStopIndex;

                return (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="relative py-2"
                  >
                    {/* Stop marker */}
                    <div className="absolute left-[-28px] top-1/2 transform -translate-y-1/2">
                      <motion.div
                        animate={isCurrent && progressPercent === 0 ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md ${
                          isPassed
                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 border-2 border-blue-500"
                            : isCurrent &&
                              progressPercent === 0 &&
                              busStatus.includes("Halted")
                            ? "bg-amber-100 border-2 border-amber-500"
                            : "bg-white border-2 border-gray-300"
                        }`}
                      >
                        {index === stops.length - 1 && isPassed && (
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        )}
                      </motion.div>
                    </div>

                    {/* Stop content */}
                    <div
                      className={`p-4 rounded-lg transition-all duration-300 ${
                        isCurrent && progressPercent === 0
                          ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-md"
                          : isPassed
                          ? "bg-gray-50 border border-gray-100"
                          : "bg-white border border-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-base text-gray-900">
                            {stop.name}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {stop.distance}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-medium text-gray-800">
                            {stop.time}
                          </span>
                          {isCurrent &&
                            progressPercent === 0 &&
                            busStatus.includes("Halted") && (
                              <span className="text-sm bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full mt-1 font-medium">
                                Current
                              </span>
                            )}
                          {isPassed && index !== currentStopIndex && (
                            <span className="text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1 font-medium">
                              Passed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Bus Information Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-amber-100 p-2 rounded-full">
              <AlertCircle className="h-5 w-5 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Bus Information
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-all duration-300"
            >
              <p className="text-sm text-gray-500">Driver</p>
              <p className="font-medium text-base">Rajesh Kumar</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-all duration-300"
            >
              <p className="text-sm text-gray-500">Number</p>
              <p className="font-medium text-base">RJ 14 BT 2253</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-all duration-300"
            >
              <p className="text-sm text-gray-500">Capacity</p>
              <p className="font-medium text-base">42 Seats</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-all duration-300"
            >
              <p className="text-sm text-gray-500">Contact</p>
              <p className="font-medium text-base">+91 9876543210</p>
            </motion.div>
          </div>

          {/* Buy Ticket Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleBuyTicket}
            className="w-full mt-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Buy Ticket
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default RouteDetailsPage;
