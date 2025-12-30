import { getAccessToken, isAdmin } from "@/store/authStore";
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const isAuthenticated = !!getAccessToken();
  const userIsAdmin = isAdmin();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!userIsAdmin) {
    // Redirect non-admin users to home page
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
