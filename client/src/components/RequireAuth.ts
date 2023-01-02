import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuth";

export const RequireAuth = () => {
  const { auth } = useAuthContext();
  const location = useLocation();
  return;

  //   return auth?.username ? (
  //     Outlet
  //   ) : (
  //     <Navigate to="/login" state={{ from: location }} replace />
  //   );
};
