import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader/Loader";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) return <Loader />;

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
