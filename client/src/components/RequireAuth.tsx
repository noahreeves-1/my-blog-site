import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuth";

export const RequireAuth = () => {
  const { auth } = useAuthContext();
  const location = useLocation();

  return auth?.username ? (
    <Outlet />
  ) : (
    <Navigate to="/users/login" state={{ from: location }} replace />
  );
};
