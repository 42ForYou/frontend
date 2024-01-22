import React from "react";

// components
import NavigationBar from "./NavigationBar";
import ContentContainer from "./ContentContainer";

const PageContainer = ({ hasNavigationBar, children }) => {
  return (
    <div className="PageContainer">
      {hasNavigationBar && <NavigationBar />}
      <ContentContainer>{children}</ContentContainer>
    </div>
  );
};

export default PageContainer;
