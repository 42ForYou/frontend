import React from "react";
import StyledButton from "../components/common/StyledButton";

const OAuthLoginPage = ({ handleLogin }) => {
  return (
    <div className="LoginPage">
      <div>
        <h1>Welcome to the PlanetPong!</h1>
        <StyledButton styleType="light" name={"Sign in with 42 OAuth"} onClick={handleLogin} />
      </div>
    </div>
  );
};

export default OAuthLoginPage;
