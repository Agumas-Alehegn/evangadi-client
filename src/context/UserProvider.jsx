import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  // Fetch user data when component mounts or when user changes in local storage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  // Function to update user state in local storage
  const updateUser = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  };
  return (
    <userContext.Provider value={{ user, updateUser }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
