import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [activeForm, setActiveForm] = useState("signin");
  const [isSignin, setSignin] = useState(true);

  const toggleSignIn = () => setActiveForm("signin");
  const toggleSignUp = () => setActiveForm("signup");

  const toggleForm = () => setSignin((prev) => !prev);
  return (
    <AuthContext.Provider
      value={{ isSignin, toggleForm, activeForm, toggleSignIn, toggleSignUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
