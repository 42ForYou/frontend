import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { loggedIn, isLoading } = useAuth();

  // todo: 로딩 인디케이터 컴포넌트 추가
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!loggedIn) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
