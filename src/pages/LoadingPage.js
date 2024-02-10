import React from "react";
import withAuthProtection from "../components/common/withAuthProtection";
import ContentContainer from "../components/layout/ContentContainer";

const LoadingPage = () => {
  return (
    <div className="LoadingPage">
      <ContentContainer>Loading ...</ContentContainer>
    </div>
  );
};

export default LoadingPage;
