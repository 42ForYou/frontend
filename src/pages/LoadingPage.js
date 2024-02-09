import React from "react";
import PageContainer from "../components/layout/PageContainer";
import withAuthProtection from "../components/common/withAuthProtection";

const LoadingPage = ({ hasNavigationBar }) => {
  return (
    <div className="LoadingPage">
      <PageContainer hasNavigationBar={hasNavigationBar}>Loading ...</PageContainer>
    </div>
  );
};

export default withAuthProtection(LoadingPage);
