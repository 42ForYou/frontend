import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const OauthCallbackPage = () => {
  const queryParams = new URLSearchParams(useLocation().search);
  const paramValue = queryParams.get("code");
  const hasQueryParam = queryParams.has("code");
  const { authenticateWithOAuth, loggedIn, is2FA } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      if (!hasQueryParam) {
        alert("잘못된 접근입니다.");
        navigate("/login");
        return;
      }

      await authenticateWithOAuth(paramValue);
      if (loggedIn) {
        console.log("OAuth 로그인 성공");
        navigate("/");
      } else if (is2FA) {
        console.log("OAuth 로그인 성공, 2FA 인증 필요");
        navigate("/2fa");
      } else {
        console.log("OAuth 로그인 실패");
        navigate("/login");
      }
    };

    handleOAuthRedirect();
  }, [paramValue, hasQueryParam]);

  return (
    <div className="CallbackPage">
      <div>서버로부터 응답을 기다리고 있습니다...</div>
    </div>
  );
};

export default OauthCallbackPage;
