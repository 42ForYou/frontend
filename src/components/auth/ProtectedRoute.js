import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingPage from "../../pages/LoadingPage";

const ProtectedRoute = () => {
  const { loggedIn, isLoading, validateTokenInCookies } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    validateTokenInCookies();
  }, []);

  useEffect(() => {
    if (!isLoading && !loggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [isLoading, loggedIn, navigate]);

  if (isLoading || !loggedIn) {
    return <LoadingPage />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
