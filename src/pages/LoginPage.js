import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import AuthContext from "../AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const serverURL = "http://localhost:8000"; // 서버 URL

  // OAuth 인증 요청 시작
  const startOAuthFlow = async () => {
    try {
      const res = await fetch(`${serverURL}/login`, {
        method: "GET",
      });
      const data = await res.json();
      const authorizationURL = data.data.url;
      window.location.href = authorizationURL;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="LoginPage">
      {/* 차후 필요없을 시 PageContainer 빼는 것 고려 */}
      <PageContainer hasNavigationBar={false}>
        <div>
          <h1>개발용 로그인 페이지</h1>
          <button onClick={startOAuthFlow}>42인증 시작</button>
          <button onClick={() => navigate("/")}>홈으로 가기</button>
        </div>
      </PageContainer>
    </div>
  );
};

export default LoginPage;
