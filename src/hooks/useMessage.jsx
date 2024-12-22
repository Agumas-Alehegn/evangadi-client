import React, { createContext, useEffect, useState } from "react";
export const MsgContext = createContext();
export const useMessage = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const showSuccessMsg = (message, duration = 1000) => {
    setSuccessMsg(message);
    setTimeout(() => setSuccessMsg(""), duration);
  };

  const showErrorMsg = (message, duration = 1000) => {
    setErrorMsg(message);
    setTimeout(() => setErrorMsg(""), duration);
  };
  return {
    successMsg,
    errorMsg,
    showSuccessMsg,
    showErrorMsg,
  };
};
export default useMessage;
