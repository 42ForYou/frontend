import React from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../common/withAuthProtection";

const LoadingPage = ({ hasNavigationBar }) => {
  return (
    <div className="LoadingPage">
      <PageContainer hasNavigationBar={hasNavigationBar}>Loading ...</PageContainer>
    </div>
  );
};

export default withAuthProtection(LoadingPage);
