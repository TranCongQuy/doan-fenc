import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./contexts/AuthContext";

export function ProtectedRoute() {
  const { isAdmin } = useAuth();
  const location = useLocation();

  if (!isAdmin) {
    return (
      <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
    );
  }

  return <Outlet />;
}
