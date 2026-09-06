import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultProfile = {
  name: "Ramesh Patil",
  mobile: "+91 98230 45612",
  email: "ramesh.patil.farmer@example.in",
  village: "Morshi",
  taluka: "Morshi",
  district: "Amravati",
  state: "Maharashtra",
  pincode: "444905",
  primaryCrop: "Cotton & Soybean",
  farmSize: "6.5 Acres",
  soilType: "Black Cotton Soil (Regur)",
  irrigationSource: "Drip + Farm Pond",
  season: "Kharif 2026",
  preferredLanguage: "en",
  notificationsEnabled: true
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('kisan_auth') === 'true';
  });

  const [farmer, setFarmer] = useState(() => {
    const saved = localStorage.getItem('kisan_farmer_profile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem('kisan_farmer_profile', JSON.stringify(farmer));
  }, [farmer]);

  const loginDemo = () => {
    setIsAuthenticated(true);
    localStorage.setItem('kisan_auth', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('kisan_auth', 'false');
  };

  const updateProfile = (updatedFields) => {
    setFarmer(prev => ({
      ...prev,
      ...updatedFields
    }));
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      farmer,
      loginDemo,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
