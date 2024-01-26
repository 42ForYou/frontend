import React from "react";
// components
import NavigationBar from "./NavigationBar";
import ContentContainer from "./ContentContainer";

const PageContainer = ({ hasNavigationBar, children }) => {
  return (
    <div className="PageContainer">
      <div className="row container-fluid vh-100">
        {hasNavigationBar && (
          <div className="col-md-2">
            <NavigationBar />
          </div>
        )}
        <div className="col container">
          <ContentContainer>{children}</ContentContainer>
        </div>
      </div>
    </div>
  );
};

export default PageContainer;
