import React from "react";
import { Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin-selection" element={<SignInSelection />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/driver-login" element={<DriverLogin />} />
      <Route path="/location-permission" element={<LocationPermission />} />
      <Route path="/routes" element={<RoutesPage />} />
      <Route path="/tickets" element={<TicketsPage />} />
      <Route path="/map/:routeId" element={<MapView />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/saved-routes" element={<SavedRoutesPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/track/:routeId" element={<RouteTrackingPage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}

export default App;
