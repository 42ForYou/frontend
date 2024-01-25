import React from "react";
// components
import NavigationBar from "./NavigationBar";
import ContentContainer from "./ContentContainer";

const PageContainer = ({ hasNavigationBar, children }) => {
  return (
    <div className="PageContainer">
      <div className="row">
        {hasNavigationBar && (
          <div className="col-4">
            <NavigationBar />
          </div>
        )}
        <div className="col container border-p3-box">
          <ContentContainer>{children}</ContentContainer>
        </div>
      </div>
    </div>
  );
};

export default PageContainer;
