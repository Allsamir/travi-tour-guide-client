import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React from "react";
import useRole from "../hooks/useRole";
interface ChildProps {
  children: React.ReactNode;
}
const PrivateRoute: React.FC<ChildProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const role = useRole();

  if (loading) {
    return (
      <div className="text-center justify-center flex items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if ((user && role?.role === "user") || role?.role === "admin") {
    return children;
  }

  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoute;
