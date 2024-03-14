import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingPage from "../../pages/LoadingPage";

const ProtectedRoute = () => {
  if (process.env.NO_AUTH_PROTECTION === "true") return <Outlet />;

  const { loggedIn, isLoading, validateTokenInCookies } = useAuth();

  useEffect(() => {
    if (!loggedIn) validateTokenInCookies();
  }, [loggedIn]);

  if (isLoading || !loggedIn) {
    return <LoadingPage />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
