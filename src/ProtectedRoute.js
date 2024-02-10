import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { loggedInUser } = useAuth();

  if (!loggedInUser) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
