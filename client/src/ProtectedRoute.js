import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";

export const ProtectedRoute = () => {
  const [token] = useAuth("");

  return token ? <Outlet /> : <Navigate to="/login" />;
};
