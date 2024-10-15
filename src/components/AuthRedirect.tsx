import React, { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { Navigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

interface authRedireactProps {
  element: React.ReactElement;
}

export default function AuthRedirect({ element }: authRedireactProps) {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PacmanLoader size={35} />
      </div>
    );
  }

  if (user && user.emailVerified) {
    return <Navigate to="/chat" />;
  }

  return element;
}
