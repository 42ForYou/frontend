import React, { useEffect } from "react";
import withAuthProtection from "../components/common/withAuthProtection";
import ContentContainer from "../components/layout/ContentContainer";

const HomePage = () => {
  return (
    <div className="HomePage">
      <ContentContainer>Welcome to the Pongdom.</ContentContainer>
    </div>
  );
};

export default withAuthProtection(HomePage);
