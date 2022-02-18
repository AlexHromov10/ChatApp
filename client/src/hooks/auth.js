import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("auth-token"));

  return (
    <>
      {console.log("render auth")}
      <AuthContext.Provider value={[token, setToken]}>{children}</AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
