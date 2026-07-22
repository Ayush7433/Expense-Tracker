import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RootRedirect = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
};

export default RootRedirect;
