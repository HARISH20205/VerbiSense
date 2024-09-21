import React, { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

export default function ProtectedRoute({ element }: ProtectedRouteProps) {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress
          color="inherit"
          size={50}
          sx={{
            animationDuration: "1s", // Controls the speed
            animationTimingFunction: "ease-in-out", // Smooth out the animation
          }}
        />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return element;
}
