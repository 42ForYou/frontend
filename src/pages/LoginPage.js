import React from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../common/apiEndpoints";
import { getWithoutCredentials } from "../common/apiBase";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { validateTokenInCookies } = useAuth();

  // OAuth 인증 요청 시작
  const startOAuthFlow = async () => {
    try {
      const resData = await getWithoutCredentials(API_ENDPOINTS.LOGIN);
      const authorizationURL = resData.data.url;
      // 42intra의 인증 페이지로 리다이렉팅
      // 외부 페이지이므로 navigate를 사용하지 않고 location을 직접 수정하는 것이 일반적
      window.location.href = authorizationURL;
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    if (await validateTokenInCookies()) {
      navigate("/");
    } else startOAuthFlow();
  };

  return (
    <div className="LoginPage">
      <div>
        <h1>로그인 페이지</h1>
        <button onClick={handleLogin}>로그인</button>
      </div>
    </div>
  );
};

export default LoginPage;
