import React, { useEffect } from "react";
import StyledButton from "../components/common/StyledButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getWithoutCredentials } from "../utils/apiBase";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

const OAuthLoginPage = () => {
  const { validateTokenInCookies, loggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await validateTokenInCookies();
  };

  useEffect(() => {
    const redirectToOAuthPage = async () => {
      try {
        const resData = await getWithoutCredentials(API_ENDPOINTS.OAUTH_LOGIN);
        const authorizationURL = resData.data.url;
        window.location.href = authorizationURL;
      } catch (error) {
        console.log(error);
      }
    };

    if (loggedIn && !loggedIn.two_factor_auth) {
      navigate("/");
      return;
    } else if (loggedIn && loggedIn.two_factor_auth) {
      navigate("/2fa");
      return;
    }

    redirectToOAuthPage();
  }, [loggedIn]);

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
