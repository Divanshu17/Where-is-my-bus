import React, { createContext, useState, useEffect, useContext } from "react";

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoggedIn = () => {
      const userData = localStorage.getItem("userData");
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Login function
  const login = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setCurrentUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("userData");
    setCurrentUser(null);
  };

  // Check if token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;

    try {
      // For JWT tokens, you would decode and check expiration
      // This is a simplified version
      return false;
    } catch (error) {
      return true;
    }
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    logout,
    isTokenExpired,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
