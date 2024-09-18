import React, { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

export default function ProtectedRoute({ element }: ProtectedRouteProps) {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return element;
}
