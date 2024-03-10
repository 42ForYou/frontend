import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingPage from "../../pages/LoadingPage";

const ProtectedRoute = () => {
  if (process.env.NO_AUTH_PROTECTION === "true") return <Outlet />;

  const { loggedIn, isLoading, validateTokenInCookies, refreshAccessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) validateTokenInCookies();
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (!isLoading && !loggedIn) {
        const refreshSucces = await refreshAccessToken();
        if (!refreshSucces) {
          alert("로그인이 필요합니다.");
          navigate("/login");
        }
      }
    };
    checkAuthStatus();
  }, [isLoading, loggedIn, navigate]);

  if (isLoading || !loggedIn) {
    return <LoadingPage />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
