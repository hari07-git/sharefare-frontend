// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./Layout";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import OfferRide from "./OfferRide";
import FindRide from "./FindRide";
import About from "./About";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-900">
      <ScrollToTop />
      <Routes>
        {/* Layout wrapper for all pages */}
        <Route element={<Layout />}>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/find" element={<FindRide />} />
          <Route path="/offer" element={<OfferRide />} />
          <Route path="/about" element={<About />} />

          {/* Protected Page */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
