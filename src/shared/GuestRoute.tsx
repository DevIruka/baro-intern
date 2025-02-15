import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface GuestRouteProps {
  children: React.ReactNode;
}

export const GuestRoute = ({ children }: GuestRouteProps) => {
  const { user } = useAuthStore();
  const location = useLocation();

  if (user?.id !== "") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
