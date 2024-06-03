import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React from "react";
interface ChildProps {
  children: React.ReactNode;
}
const PrivateRoute: React.FC<ChildProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="text-center justify-center flex items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoute;
