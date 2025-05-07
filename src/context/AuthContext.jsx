// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from "react";

// 1. Create context
const AuthContext = createContext();

// 2. Provider component
export const AuthProvider = ({ children }) => {
  const getStoredUser = () => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  };

  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Simulate loading (token validation logic can be added here)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Login handler
  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwt);
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Update user data in state and localStorage
  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook to use auth context
export const useAuth = () => useContext(AuthContext);
