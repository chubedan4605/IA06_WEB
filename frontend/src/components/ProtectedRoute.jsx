import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Kiểm tra xem có refresh token không (đại diện cho việc đã login)
  const isAuthenticated = localStorage.getItem("refreshToken");

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;