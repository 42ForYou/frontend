import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingPage from "../../pages/LoadingPage";

const ProtectedRoute = () => {
  const { loggedIn, isLoading, is2FAVerified } = useAuth();

  if (process.env.NO_AUTH_PROTECTION === "true") return <Outlet />;

  // todo: 로딩 인디케이터 컴포넌트 추가
  if (isLoading) {
    return <LoadingPage />;
  }

  if (!loggedIn || !is2FAVerified) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
