import React, { useEffect } from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../common/withAuthProtection";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="HomePage">
      <PageContainer hasNavigationBar={true}>Welcome to the Pongdom.</PageContainer>
    </div>
  );
};

export default withAuthProtection(HomePage);
