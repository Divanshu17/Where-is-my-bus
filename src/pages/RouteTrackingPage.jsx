import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Clock, ArrowLeft, Bus, AlertCircle } from "lucide-react";

const RouteDetailsPage = () => {
  const { routeId } = useParams();
  const navigate = useNavigate();
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0); // 0-100 between stops
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <header className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Route Details</h2>
        <div className="w-10"></div>
      </header>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Bus className="h-6 w-6 text-blue-600" />
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
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Route Timeline</h3>
          <div className="flex gap-2">
            {/* <button 
              onClick={() => setIsAnimating(true)} 
              className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
            >
              Restart
            </button> */}
            <button
              onClick={handleViewOnMap}
              className="text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full hover:bg-green-200 transition-colors"
            >
              View on Map
            </button>
          </div>
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
            className="absolute left-4 w-1 bg-blue-500 rounded-full transition-all duration-25"
            style={{
              top: "16px",
              height: `${calculateTotalProgress()}%`,
              maxHeight: `calc(100% - 32px)`,
            }}
          ></div>

          {/* Bus position indicator */}
          <div
            className="absolute left-4 w-8 h-8 transform -translate-x-1/2 transition-all duration-25 z-10"
            style={{
              top: `calc(${calculateTotalProgress()}% + 16px - 16px)`,
              display:
                calculateTotalProgress() > 0 && calculateTotalProgress() < 100
                  ? "block"
                  : "none",
            }}
          >
            <div
              className={`flex items-center justify-center bg-white rounded-full border-2 ${
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
            </div>
          </div>

          {/* Stops */}
          <div className="space-y-8 ml-10">
            {stops.map((stop, index) => {
              const isPassed =
                index < currentStopIndex ||
                (index === currentStopIndex && progressPercent === 100);
              const isCurrent = index === currentStopIndex;

              return (
                <div key={index} className="relative py-2">
                  {/* Stop marker */}
                  <div className="absolute left-[-28px] top-1/2 transform -translate-y-1/2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isPassed
                          ? "bg-blue-500 border-2 border-blue-500"
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
                    </div>
                  </div>

                  {/* Stop content */}
                  <div
                    className={`p-4 rounded-lg ${
                      isCurrent && progressPercent === 0
                        ? "bg-blue-50 border border-blue-100"
                        : "bg-gray-50"
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
                            <span className="text-sm bg-amber-100 text-amber-700 px-2 py-1 rounded-full mt-1">
                              Current
                            </span>
                          )}
                        {isPassed && index !== currentStopIndex && (
                          <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full mt-1">
                            Passed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          <h3 className="text-xl font-bold text-gray-800">Bus Information</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
            <p className="text-sm text-gray-500">Driver</p>
            <p className="font-medium text-base">Rajesh Kumar</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
            <p className="text-sm text-gray-500">Number</p>
            <p className="font-medium text-base">RJ 14 BT 2253</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
            <p className="text-sm text-gray-500">Capacity</p>
            <p className="font-medium text-base">42 Seats</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
            <p className="text-sm text-gray-500">Contact</p>
            <p className="font-medium text-base">+91 9876543210</p>
          </div>
        </div>

        {/* Buy Ticket Button */}
        <button
          onClick={handleBuyTicket}
          className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Buy Ticket
        </button>
      </div>
    </div>
  );
};

export default RouteDetailsPage;
