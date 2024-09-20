import React, { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { Navigate } from "react-router-dom";

interface authRedireactProps {
  element: React.ReactElement;
}

export default function AuthRedirect({ element }: authRedireactProps) {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user && user.emailVerified) {
    return <Navigate to="/chat" />;
  }

  return element;
}
