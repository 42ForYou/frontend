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
    };

    handleOAuthRedirect();
  }, [paramValue, hasQueryParam, authenticateWithOAuth, navigate]);

  useEffect(() => {
    if (loggedIn && !loggedIn.two_factor_auth) {
      navigate("/");
    } else if (loggedIn && loggedIn.two_factor_auth) {
      navigate("/2fa");
    }
  }, [loggedIn]);

  return (
    <div className="CallbackPage">
      <div>서버로부터 응답을 기다리고 있습니다...</div>
    </div>
  );
};

export default OauthCallbackPage;
