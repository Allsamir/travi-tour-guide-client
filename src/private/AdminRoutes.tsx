import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { Navigate, useLocation } from "react-router-dom";

interface ChildProps {
  children: React.ReactNode;
}

const AdminRoutes: React.FC<ChildProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useRole();
  const location = useLocation();
  if (loading || isLoading) {
    return (
      <div className="text-center justify-center flex items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (user && role?.role === "admin") {
    return children;
  }

  return <Navigate to={`/login`} state={location.pathname}></Navigate>;
};

export default AdminRoutes;
