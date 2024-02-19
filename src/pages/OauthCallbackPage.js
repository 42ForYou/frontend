import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const OauthCallbackPage = () => {
  const queryParams = new URLSearchParams(useLocation().search);
  const code = queryParams.get("code");
  const { authenticateWithOAuth, loggedIn, is2FA, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      authenticateWithOAuth(code);
    } else {
      alert("잘못된 접근입니다.");
      navigate("/login");
    }
  }, [code, authenticateWithOAuth, navigate]);

  useEffect(() => {
    if (!isLoading) {
      if (loggedIn && !is2FA) {
        navigate("/");
      } else if (loggedIn && is2FA) {
        navigate("/2fa");
      } else if (!loggedIn) {
        alert("잘못된 접근입니다.");
        navigate("/login");
      }
    }
  }, [loggedIn, isLoading, is2FA, navigate]);

  return (
    <div className="CallbackPage">
      <div>서버로부터 응답을 기다리고 있습니다...</div>
    </div>
  );
};

export default OauthCallbackPage;
