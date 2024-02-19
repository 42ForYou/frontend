import React, { createContext, useState, useContext, useEffect } from "react";
import { get } from "../utils/apiBase";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(null);
  const [is2FA, setIs2FA] = useState(false);
  const [dataFor2FA, setDataFor2FA] = useState({}); // {email, intra_id}

  // todo: 쿠키 삭제 API 구현 후 변경
  const logout = async () => {
    setLoggedIn(null);
    console.log("로그아웃 성공");
  };

  const authenticateWithOAuth = async (code) => {
    try {
      const resData = await get(API_ENDPOINTS.OAUTH_TOKEN_EXCHANGE(code));
      const user = resData.data.profile;
      setLoggedIn(user);
      setIs2FA(false);
    } catch (error) {
      if (error.response?.status === 428) {
        setIs2FA(true);
        setDataFor2FA(error.response.data);
      }
    }
  };

  const validateTokenInCookies = async () => {
    try {
      const resData = await get(API_ENDPOINTS.VALID);
      const user = resData.data.user;
      setLoggedIn(user);
      setIs2FA(user.two_factor_auth);
    } catch (error) {
      console.log("쿠키에 저장된 토큰 유효성 검사 실패: ", error);
    }
  };

  // 컴포넌트 마운트 시 쿠키에 저장된 토큰의 유효성 검사
  useEffect(() => {
    validateTokenInCookies();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        loggedIn,
        logout,
        validateTokenInCookies,
        validate2FAcode,
        authenticateWithOAuth,
        is2FA,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
