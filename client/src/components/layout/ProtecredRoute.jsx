import { useSelector } from "@reduxjs/toolkit";
import { Navigate, Outlet } from "react-router-dom";
const ProtecredRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtecredRoute;
