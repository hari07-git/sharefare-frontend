import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Checking authentication…</p>
      </div>
    );
  }

  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
