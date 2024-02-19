import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingPage from "../../pages/LoadingPage";

// todo: 인증 컨텍스트로부터 로딩 상태 갖고오기
const ProtectedRoute = () => {
  const { loggedIn, validateTokenInCookies } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      await validateTokenInCookies();
      setIsLoading(false);
    };
    validateToken();
  }, []);

  useEffect(() => {
    if (!isLoading && !loggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [isLoading, loggedIn, navigate]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
