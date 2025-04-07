import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
import SignInSelection from "./pages/SignInSelection";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import DriverLogin from "./pages/DriverLogin";
import LocationPermission from "./pages/LocationPermission";
import RoutesPage from "./pages/RoutesPage";
import MapView from "./pages/MapView";
import Notifications from "./pages/Notifications";
import SavedRoutesPage from "./pages/SavedRoutesPage";
import TicketsPage from "./pages/TicketsPage";
import RouteTrackingPage from "./pages/RouteTrackingPage";
import PaymentPage from "./pages/PaymentPage";
import FeedbackPage from "./pages/FeedbackPage";
import ContactPage from "./pages/ContactPage";
import Profile from "./pages/Profile";
import DriverDashboard from "./pages/driver/DriverDashboard";
import DriverShiftsPage from "./pages/driver/DriverShiftsPage";
import DriverRouteTrackingPage from "./pages/driver/DriverRouteTrackingPage";
import DriverRouteCompletedPage from "./pages/driver/DriverRouteCompletedPage";
import DriverSchedulePage from "./pages/driver/DriverSchedulePage";
import DriverProfilePage from "./pages/driver/DriverProfilePage";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page, but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Driver Role Check
const DriverRoute = ({ children }) => {
  const { isAuthenticated, currentUser } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/driver-login" state={{ from: location }} replace />;
  }

  if (currentUser?.role !== "driver") {
    return <Navigate to="/signin-selection" replace />;
  }

  return children;
};

function App() {
  const { loading, currentUser } = useAuth();

  // Loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f0e6d2] to-[#d9c9a8]">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin-selection" element={<SignInSelection />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/driver-login" element={<DriverLogin />} />

      {/* Driver Routes */}
      <Route
        path="/driver/dashboard"
        element={
          <DriverRoute>
            <DriverDashboard />
          </DriverRoute>
        }
      />
      <Route
        path="/driver/shifts"
        element={
          <DriverRoute>
            <DriverShiftsPage />
          </DriverRoute>
        }
      />
      <Route
        path="/driver/route/:routeId"
        element={
          <DriverRoute>
            <DriverRouteTrackingPage />
          </DriverRoute>
        }
      />
      <Route
        path="/driver/route-completed"
        element={
          <DriverRoute>
            <DriverRouteCompletedPage />
          </DriverRoute>
        }
      />
      <Route
        path="/driver/schedule"
        element={
          <DriverRoute>
            <DriverSchedulePage />
          </DriverRoute>
        }
      />
      <Route
        path="/driver/profile"
        element={
          <DriverRoute>
            <DriverProfilePage />
          </DriverRoute>
        }
      />

      {/* Protected Routes */}
      <Route path="/location-permission" element={<LocationPermission />} />
      <Route
        path="/routes"
        element={
          <ProtectedRoute>
            <RoutesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tickets"
        element={
          <ProtectedRoute>
            <TicketsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/map/:routeId"
        element={
          <ProtectedRoute>
            <MapView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/saved-routes"
        element={
          <ProtectedRoute>
            <SavedRoutesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/track/:routeId"
        element={
          <ProtectedRoute>
            <RouteTrackingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feedback"
        element={
          <ProtectedRoute>
            <FeedbackPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <ContactPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
