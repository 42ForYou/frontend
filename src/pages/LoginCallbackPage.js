import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

const LoginCallbackPage = () => {
  const queryParams = new URLSearchParams(useLocation().search);
  const paramValue = queryParams.get("code");
  const hasQueryParam = queryParams.has("code");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const authCodeRedirection = async () => {
      if (hasQueryParam) {
        await login(paramValue);
        navigate("/");
      }
    };
    authCodeRedirection();
  }, [paramValue, hasQueryParam]);

  return (
    <div className="CallbackPage">
      <div>
        <h1>OAuth 콜백 페이지</h1>
        서버로부터 응답을 기다리고 있습니다...
      </div>
    </div>
  );
};

export default LoginCallbackPage;
