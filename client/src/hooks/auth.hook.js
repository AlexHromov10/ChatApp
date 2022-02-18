import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("auth-token"));

  useEffect(() => {
    console.log("auth");
    if (token === null) {
      localStorage.removeItem("auth-token");
    } else {
      localStorage.setItem("auth-token", token);
    }
  }, [token]);

  return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
