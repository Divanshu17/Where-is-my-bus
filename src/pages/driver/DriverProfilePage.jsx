import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  UserCircleIcon,
  ArrowLeftIcon,
  CameraIcon,
  PencilIcon,
  CheckIcon,
  StarIcon,
  TruckIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  CreditCardIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import useTranslation from "../../hooks/useTranslation";
import { useAuth } from "../../context/AuthContext";
import DriverSideNavBar from "./components/DriverSideNavBar";

function DriverProfilePage() {
  const navigate = useNavigate();
  const t = useTranslation();
  const { currentUser, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  // Load profile data (simulated)
  useEffect(() => {
    // Simulate API call to get profile data
    setTimeout(() => {
      const mockProfileData = {
        id: "D123456",
        fullName: currentUser?.fullName || "John Driver",
        email: currentUser?.email || "john.driver@example.com",
        phoneNumber: currentUser?.phoneNumber || "+91 98765 43210",
        profileImage: null,
        licenseNumber: "DL-98765432100",
        experience: "5 years",
        rating: 4.8,
        totalTrips: 758,
        address: "123 Driver Street, Jaipur, Rajasthan",
        busAssigned: "RT-101",
        joinedDate: "12 Mar 2019",
        status: "active",
      };

      setProfileData(mockProfileData);
      setEditForm({
        fullName: mockProfileData.fullName,
        phoneNumber: mockProfileData.phoneNumber,
        email: mockProfileData.email,
        address: mockProfileData.address,
      });
      setIsLoading(false);
    }, 800);
  }, [currentUser]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes here
      const updatedProfile = {
        ...profileData,
        fullName: editForm.fullName,
        phoneNumber: editForm.phoneNumber,
        email: editForm.email,
        address: editForm.address,
      };

      setProfileData(updatedProfile);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/signin-selection");
  };

  const getInitials = (name) => {
    if (!name) return "D";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0e6d2] to-[#d9c9a8]">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-[#f0e6d2]/90 shadow-md px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-full hover:bg-[#d9c9a8]/70 transition-colors"
          >
            <Bars3Icon className="h-6 w-6 text-gray-900" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <UserCircleIcon className="h-6 w-6 mr-2 text-blue-600" />
            {t.profile}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-[#d9c9a8]/70 transition-colors"
          >
            <ArrowLeftIcon className="h-6 w-6 text-gray-900" />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <DriverSideNavBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="px-6 py-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 relative">
              <div className="absolute top-6 right-6">
                <button
                  onClick={handleEditToggle}
                  className={`p-2 rounded-full ${
                    isEditing
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {isEditing ? (
                    <CheckIcon className="h-5 w-5" />
                  ) : (
                    <PencilIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xl font-bold border-4 border-white shadow-lg">
                    {profileData.profileImage ? (
                      <img
                        src={profileData.profileImage}
                        alt={profileData.fullName}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      getInitials(profileData.fullName)
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white border-2 border-white">
                    <CameraIcon className="h-4 w-4" />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <motion.div
                      key="edit-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full"
                    >
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.fullName}
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={editForm.fullName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.phoneNumber}
                        </label>
                        <input
                          type="text"
                          name="phoneNumber"
                          value={editForm.phoneNumber}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.email}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={editForm.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t.address}
                        </label>
                        <textarea
                          name="address"
                          value={editForm.address}
                          onChange={handleChange}
                          rows="2"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        ></textarea>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="profile-info"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <h2 className="text-xl font-bold text-gray-900 mb-1">
                        {profileData.fullName}
                      </h2>
                      <p className="text-gray-600 mb-3">{profileData.email}</p>

                      <div className="flex items-center justify-center mb-3">
                        <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
                          <StarIcon className="h-4 w-4 text-amber-500 mr-1" />
                          <span className="text-amber-700 font-medium">
                            {profileData.rating}/5
                          </span>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-3 rounded-lg mb-3">
                        <p className="text-blue-800 text-sm">
                          <span className="font-medium">ID:</span>{" "}
                          {profileData.id}
                        </p>
                      </div>

                      <div className="flex space-x-2 mb-3">
                        <div className="flex-1 bg-gray-50 p-2 rounded-lg text-center">
                          <p className="text-sm text-gray-500">
                            {t.experience}
                          </p>
                          <p className="font-semibold">
                            {profileData.experience}
                          </p>
                        </div>
                        <div className="flex-1 bg-gray-50 p-2 rounded-lg text-center">
                          <p className="text-sm text-gray-500">
                            {t.totalTrips}
                          </p>
                          <p className="font-semibold">
                            {profileData.totalTrips}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Driver Details */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TruckIcon className="h-5 w-5 text-blue-600 mr-2" />
                {t.driverDetails}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <CreditCardIcon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.licenseNumber}</p>
                    <p className="font-medium">{profileData.licenseNumber}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <TruckIcon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.busAssigned}</p>
                    <p className="font-medium">{profileData.busAssigned}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <CalendarIcon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.joinedDate}</p>
                    <p className="font-medium">{profileData.joinedDate}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <MapPinIcon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.address}</p>
                    <p className="font-medium">{profileData.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <ShieldCheckIcon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t.status}</p>
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                      <p className="font-medium capitalize">
                        {profileData.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => navigate("/driver/schedule")}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center"
              >
                <CalendarIcon className="h-5 w-5 mr-2" />
                {t.viewSchedule}
              </button>

              <button
                onClick={() => navigate("/driver/shifts")}
                className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-800 rounded-lg font-medium flex items-center justify-center"
              >
                <ClockIcon className="h-5 w-5 mr-2" />
                {t.shiftHistory}
              </button>

              <button
                onClick={handleLogout}
                className="w-full py-3 px-4 bg-red-50 text-red-700 border border-red-200 rounded-lg font-medium flex items-center justify-center"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                {t.logout}
              </button>
            </div>

            <p className="text-center text-xs text-gray-500">
              {t.version} 1.0.0
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default DriverProfilePage;
