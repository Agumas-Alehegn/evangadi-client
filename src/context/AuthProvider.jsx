import React, { useState, createContext } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [activeForm, setActiveForm] = useState("signin");
  const toggleSignIn = () => {
    if (activeForm !== "signin") setActiveForm("signin");
  };
  const toggleSignUp = () => {
    if (activeForm !== "signup") setActiveForm("signup");
  };

  return (
    <AuthContext.Provider value={{ activeForm, toggleSignIn, toggleSignUp }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
