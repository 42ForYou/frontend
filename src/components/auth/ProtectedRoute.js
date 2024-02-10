import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { loggedIn, isLoading, is2FAVerified } = useAuth();

  // todo: 로딩 인디케이터 컴포넌트 추가
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!loggedIn || !is2FAVerified) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;