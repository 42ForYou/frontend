import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import { API_ENDPOINTS } from "../common/apiEndpoints";
import { getWithoutCredentials } from "../common/apiBase";

const LoginPage = () => {
  const navigate = useNavigate();

  // OAuth 인증 요청 시작
  const startOAuthFlow = async () => {
    try {
      const resData = await getWithoutCredentials(API_ENDPOINTS.LOGIN);
      const authorizationURL = resData.data.url;
      window.location.href = authorizationURL;
      // 42intra의 인증 페이지로 리다이렉팅
      // 외부 페이지이므로 navigate를 사용하지 않고 location을 직접 수정하는 것이 일반적
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
