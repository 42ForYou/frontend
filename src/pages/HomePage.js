import React, { useEffect } from "react";
import ContentContainer from "../components/layout/ContentContainer";
import ContentTitle from "../components/layout/ContentTitle";

const HomePage = () => {
  return (
    <div className="HomePage">
      <ContentContainer>
        <ContentTitle title="Home" />
        Welcome to the PlanetPong!
      </ContentContainer>
    </div>
  );
};

export default HomePage;
