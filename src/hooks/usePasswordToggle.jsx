import React, { useState } from "react";

function usePasswordToggle() {
  const [passwordType, setPasswordType] = useState("password");
  const togglePasswordType = () => {
    setPasswordType((prevPass) =>
      prevPass === "password" ? "text" : "password"
    );
  };
  return { passwordType, togglePasswordType };
}

export default usePasswordToggle;
