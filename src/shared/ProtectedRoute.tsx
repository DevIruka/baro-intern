import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuthStore();
  const location = useLocation();

  if (user?.id === "") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
