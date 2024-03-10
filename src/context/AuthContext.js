import React, { createContext, useState, useContext, useEffect } from "react";
import { axiosInstance, get, patch, post } from "../utils/apiBase";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(null);
  const [is2FA, setIs2FA] = useState(false);
  const [twoFactorData, setTwoFactorData] = useState(null); // {email, intra_id, two_factor_auth: true}

  const logout = async () => {
    try {
      await get(API_ENDPOINTS.LOGOUT);
      console.log("로그아웃 성공");
    } catch (error) {
      if (error.response?.status === 401) {
        console.log("토큰을 발급받지 않은 사용자입니다.");
      } else if (error.response?.status === 400) {
        console.log("존재하지 않는 토큰입니다.");
      }
    } finally {
      setLoggedIn(null);
    }
  };

  const authenticateWithOAuth = async (code) => {
    setIsLoading(true);
    try {
      const resData = await get(API_ENDPOINTS.OAUTH_TOKEN_EXCHANGE(code));
      const user = resData.data.profile;
      setLoggedIn(user);
    } catch (error) {
      if (error.response?.status === 428) {
        console.log("2FA 인증이 필요한 사용자입니다.");
        setTwoFactorData({
          email: error.response.data.data.email,
          intra_id: error.response.data.data.intra_id,
          two_factor_auth: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateTokenInCookies = async () => {
    setIsLoading(true);
    try {
      const resData = await get(API_ENDPOINTS.TOKEN_VERIFY);
      const user = resData.data.user;
      setLoggedIn(user);
      setIs2FA(user.two_factor_auth);
    } catch (error) {
      console.log("쿠키에 저장되어 있는 액세스 토큰이 유효하지 않습니다.");
      setLoggedIn(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshAccessToken = async () => {
    setIsLoading(true);
    try {
      const resData = await post(API_ENDPOINTS.TOKEN_REFRESH);
      setLoggedIn(resData.data.user);
      console.log("액세스 토큰이 성공적으로 갱신되었습니다.");
      return true;
    } catch (error) {
      console.log("액세스 토큰 갱신에 실패했습니다.");
      setLoggedIn(null);
      alert("로그인이 필요합니다.");
      navigate("/login");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resend2FACode = async () => {
    await patch(API_ENDPOINTS.TWO_FACTOR_VERIFY(), { data: { intra_id: twoFactorData.intra_id } });
  };

  const validate2FAcode = async (code2FA) => {
    const resData = await get(API_ENDPOINTS.TWO_FACTOR_VERIFY(twoFactorData.intra_id, code2FA));
    console.log("2FA 인증에 성공했습니다.");
    console.log(resData);
    setLoggedIn(resData.data.profile);
  };

  // 액세스 토큰이 유효하지 않거나 만료되었을 때 발생하는 이벤트를 처리
  useEffect(() => {
    const handleInvalidAccessToken = async (event) => {
      const isSuccess = await refreshAccessToken();
      if (!isSuccess) {
        return;
      }
      // 갱신에 성공했을 경우만 원본 요청을 재시도
      const originalRequest = event.detail;
      axiosInstance(originalRequest);
    };

    window.addEventListener("invalid-access-token", handleInvalidAccessToken);

    return () => {
      window.removeEventListener("invalid-access-token", handleInvalidAccessToken);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setLoggedIn,
        loggedIn,
        logout,
        validateTokenInCookies,
        validate2FAcode,
        refreshAccessToken,
        authenticateWithOAuth,
        is2FA,
        resend2FACode,
        twoFactorData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
