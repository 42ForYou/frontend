import React, { createContext, useState, useContext, useEffect } from "react";
import { get } from "../utils/apiBase";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(null);
  const [is2FAVerified, setIs2FAVerified] = useState(false);

  // todo: 2FA 검증 API 구현 후 변경
  const validate2FAcode = async (code) => {
    setIsLoading(true);
    try {
      // const resData = await get(API_ENDPOINTS.VALIDATE_2FA(code));
      // const user = resData.data.user;
      // setLoggedIn(user);
      if (!(code === "dev")) throw new Error("2FA 인증에 실패했습니다.");
      console.log("2FA 검증 성공");
      setIs2FAVerified(true);
      return { success: true, user: null };
    } catch (error) {
      console.error("2FA 검증 중 에러 발생: ", error);
    } finally {
      setIsLoading(false);
    }
    setIs2FAVerified(false);
    return { success: false };
  };

  const validateTokenInCookies = async () => {
    setIsLoading(true);
    try {
      const resData = await get(API_ENDPOINTS.VALID);
      const user = resData.data.user;
      setLoggedIn(user);
      return { success: true, user: user };
    } catch (error) {
      console.log("유효성 검사 중 에러 발생: ", error);
    } finally {
      setIsLoading(false);
    }
    setLoggedIn(null);
    return { success: false };
  };

  const login = async (code) => {
    setIsLoading(true);
    try {
      const resData = await get(API_ENDPOINTS.OAUTH_REDIRECT(code));
      setLoggedIn(resData.data.user);
      setIs2FAVerified(!user.two_factor_auth);
      console.log("로그인 성공");
    } catch (error) {
      console.error("로그인 중 에러 발생: ", error);
      setLoggedIn(null);
      setIs2FAVerified(false);
    } finally {
      setIsLoading(false);
    }
  };

  // todo: 쿠키 삭제 API 구현 후 변경
  const logout = async () => {
    setLoggedIn(null);
    setIs2FAVerified(false);
    console.log("로그아웃 성공");
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
        is2FAVerified,
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
