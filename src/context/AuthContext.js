import React, { createContext, useState, useContext, useEffect } from "react";
import { get } from "../utils/apiBase";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(null);

  const validate2FAcode = async (code) => {
    setIsLoading(true);
    try {
      // const resData = await get(API_ENDPOINTS.VALIDATE_2FA(code));
      // setLoggedIn(resData.data.user);
      setIsTwoFactorAuthRequired(false);
      console.log("2FA 검증 성공");
    } catch (error) {
      console.error("2FA 검증 중 에러 발생: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateTokenInCookies = async () => {
    setIsLoading(true);
    try {
      const resData = await get(API_ENDPOINTS.VALID);
      setLoggedIn(resData.data.user);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.log("유효성 검사 중 에러 발생: ", error);
      setIsLoading(false);
    }
    setLoggedIn(null);
    setIsLoading(false);
    return false;
  };

  const login = async (code) => {
    setIsLoading(true);
    try {
      const resData = await get(API_ENDPOINTS.OAUTH_REDIRECT(code));
      setLoggedIn(resData.data.user);
      console.log("로그인 성공");
    } catch (error) {
      console.error("로그인 중 에러 발생: ", error);
      setLoggedIn(null);
    } finally {
      setIsLoading(false);
    }
  };

  // todo: 쿠키 삭제 API 구현 후 변경
  const logout = async () => {
    setLoggedIn(null);
  };

  // 컴포넌트 마운트 시 쿠키에 저장된 토큰의 유효성 검사
  useEffect(() => {
    validateTokenInCookies();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        isLoading,
        login,
        logout,
        validateTokenInCookies,
        validate2FAcode,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
