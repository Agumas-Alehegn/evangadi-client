import React, { useContext } from "react";
import { LoaderContext } from "../context/LoaderProvider";

function useLoader() {
  const loadingContext = useContext(LoaderContext);
  if (!loadingContext) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return loadingContext;
}

export default useLoader;
