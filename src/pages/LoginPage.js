import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import AuthContext from "../AuthContext";

const LoginPage = () => {
  const { setAuthToken, removeAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [storedToken, setStoredToken] = useState("");

  // 로그인 토큰 발급
  const issueToken = () => {
    const token = "dev-token";
    setAuthToken(token);
    alert("토큰 발급: " + token);
  };

  // 로그인 토큰 삭제
  const removeToken = () => {
    removeAuthToken();
    alert("토큰 삭제됨");
  };

  // 로그인 토큰 확인
  const checkToken = () => {
    const token = localStorage.getItem("authToken");
    setStoredToken(token);
  };

  return (
    <div className="LoginPage">
      {/* 차후 필요없을 시 PageContainer 빼는 것 고려 */}
      <PageContainer hasNavigationBar={false}>
        <div>
          <h1>개발용 로그인 페이지</h1>
          <button onClick={issueToken}>토큰 발급</button>
          <button onClick={removeToken}>토큰 삭제</button>
          <button onClick={checkToken}>토큰 확인</button>
          {storedToken ? <p>현재 토큰: {storedToken}</p> : <p>현재 토큰:</p>}
          <button onClick={() => navigate("/")}>홈으로 가기</button>
        </div>
      </PageContainer>
    </div>
  );
};

export default LoginPage;