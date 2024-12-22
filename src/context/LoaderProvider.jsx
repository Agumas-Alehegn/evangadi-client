import React, { createContext, useState } from "react";
export const LoaderContext = createContext();

function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const toggleLoading = () => setLoading(true);
  const offLoading = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ loading, toggleLoading, offLoading }}>
      {children}
    </LoaderContext.Provider>
  );
}

export default LoaderProvider;
