import React from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../withAuthProtection";

const HomePage = () => {
  return (
    <div className="HomePage">
      <PageContainer hasNavigationBar={true}>Welcome to the Pongdom.</PageContainer>
    </div>
  );
};

export default withAuthProtection(HomePage);
