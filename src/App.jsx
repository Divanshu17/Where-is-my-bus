import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import SignInSelection from './pages/SignInSelection';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import DriverLogin from './pages/DriverLogin';
import LocationPermission from './pages/LocationPermission';
import RoutesPage from './pages/RoutesPage';
import MapView from './pages/MapView';
import Notifications from './pages/Notifications';
import SavedRoutesPage from './pages/SavedRoutesPage'; // ✅ Added Saved Routes Page

function App() {
  return (
    <Routes>
      {/* Authentication Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin-selection" element={<SignInSelection />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/driver-login" element={<DriverLogin />} />

      {/* Location & Navigation */}
      <Route path="/location-permission" element={<LocationPermission />} />
      <Route path="/routes" element={<RoutesPage />} />
      <Route path="/map/:routeId" element={<MapView />} />

      {/* Additional Features */}
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/saved-routes" element={<SavedRoutesPage />} /> {/* ✅ Added Saved Routes */}
    </Routes>
  );
}

export default App;
