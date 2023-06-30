import React, { createContext, useEffect, useState } from "react";

import apis from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));
  useEffect(() => {
    if (isLoggedIn) {
      seProfile();
    }
  }, [isLoggedIn]);
  const [user, setUser] = useState({
    id: null,
    phone: null,
    is_developer: false,
    image: null,
    first_name: "",
    last_name: "",
  });
  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  const seProfile = () => {
    apis.profile().then((profile) => {
      setUser(profile);
    });
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
