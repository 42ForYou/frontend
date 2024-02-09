import React, { useEffect } from "react";
import PageContainer from "../components/layout/PageContainer";
import withAuthProtection from "../components/common/withAuthProtection";

const HomePage = () => {
  return (
    <div className="HomePage">
      <PageContainer hasNavigationBar={true}>Welcome to the Pongdom.</PageContainer>
    </div>
  );
};

export default withAuthProtection(HomePage);
