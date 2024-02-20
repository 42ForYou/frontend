import React, { createContext, useState, useContext, useEffect } from "react";
import { get, patch } from "../utils/apiBase";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(null);
  const [is2FA, setIs2FA] = useState(false);
  const [twoFactorData, setTwoFactorData] = useState(null); // {email, intra_id, two_factor_auth: true}

  // todo: 쿠키 삭제 API 구현 후 변경
  const logout = async () => {
    setLoggedIn(null);
    console.log("로그아웃 성공");
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
      const resData = await get(API_ENDPOINTS.VALIDATE_TOKEN);
      const user = resData.data.user;
      setLoggedIn(user);
      setIs2FA(user.two_factor_auth);
    } catch (error) {
      console.log("쿠키에 저장된 토큰이 유효하지 않습니다.");
      setLoggedIn(null);
    } finally {
      setIsLoading(false);
    }
  };

  const resend2FACode = async () => {
    await patch(API_ENDPOINTS.VALIDATE_2FA(), { data: { intra_id: twoFactorData.intra_id } });
  };

  const validate2FAcode = async (code2FA) => {
    const resData = await get(API_ENDPOINTS.VALIDATE_2FA(twoFactorData.intra_id, code2FA));
    console.log("2FA 인증 성공");
    console.log(resData);
    setLoggedIn(resData.data.profile);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setLoggedIn,
        loggedIn,
        logout,
        validateTokenInCookies,
        validate2FAcode,
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
