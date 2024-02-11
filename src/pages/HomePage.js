import React, { useEffect } from "react";
import ContentContainer from "../components/layout/ContentContainer";
import ContentBody from "../components/layout/ContentBody";
import ContentTitle from "../components/layout/ContentTitle";

const HomePage = () => {
  return (
    <div className="HomePage">
      <ContentContainer>
        <ContentTitle title="Home" />
        <ContentBody>Welcome to the PlanetPong!</ContentBody>
      </ContentContainer>
    </div>
  );
};

export default HomePage;
