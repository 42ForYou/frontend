import React from "react";
import StyledButton from "../components/common/StyledButton";
import { useNavigate } from "react-router-dom";

const OAuthLoginPage = () => {
  const { validateTokenInCookies, authenticateWithOAuth, is2FA } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const redirectToOAuthPage = async () => {
      try {
        const resData = await getWithoutCredentials(API_ENDPOINTS.LOGIN);
        const authorizationURL = resData.data.url;
        window.location.href = authorizationURL;
      } catch (error) {
        console.log(error);
      }
    };

    await validateTokenInCookies();

    if (loggedIn && !is2FA) {
      navigate("/");
      return;
    } else if (loggedIn && is2FA) {
      navigate("/2fa");
      return;
    }
    redirectToOAuthPage();
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
