import React, { useEffect } from "react";
import StyledButton from "../components/common/StyledButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getWithoutCredentials } from "../utils/apiBase";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

const OAuthLoginPage = () => {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const resData = await getWithoutCredentials(API_ENDPOINTS.OAUTH_LOGIN);
      const authorizationURL = resData.data.url;
      window.location.href = authorizationURL;
    } catch (error) {
      console.log(error);
    }
  };

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
