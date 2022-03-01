import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/auth";

export const ProtectedRoute = () => {
  const [token] = useAuth("");

  return token ? <Outlet /> : <Navigate to="/login" />;
};
