import React from "react";
import PageContainer from "../components/PageContainer";

const LoginPage = () => {
  return (
    <div className="LoginPage">
      {/* 차후 필요없을 시 PageContainer 빼는 것 고려 */}
      <PageContainer hasNavigationBar={false}>This is LoginPage</PageContainer>
    </div>
  );
};

export default LoginPage;
