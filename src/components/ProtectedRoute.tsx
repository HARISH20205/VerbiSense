import React, { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { Navigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

export default function ProtectedRoute({ element }: ProtectedRouteProps) {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PacmanLoader size={35} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return element;
}
