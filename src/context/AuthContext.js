import React, { createContext, useState, useContext, useEffect } from "react";
import { get } from "../common/apiBase";
import { API_ENDPOINTS } from "../common/apiEndpoints";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [loggedIn, setLoggedIn] = useState(null);

  const login = async (code) => {
    try {
      const resData = await get(API_ENDPOINTS.OAUTH_REDIRECT(code));
      if (resData) {
        console.log("로그인 성공");
        const { user } = resData.data;
        setLoggedIn(user);
        setIsLoading(false);
        return true;
      } else {
        console.log("로그인 실패");
      }
    } catch (error) {
      console.error("로그인 중 에러 발생: ", error);
    }
    return false;
  };

  const logout = async () => {
    // todo: 쿠키 삭제 API 구현 후 변경
    setLoggedIn(null);
  };

  // 현재 쿠키에 저장되어 있는 토큰의 유효성을 검사
  const validateTokenInCookies = async () => {
    try {
      const resData = await get(API_ENDPOINTS.VALID);
      if (resData) {
        const { user } = resData.data;
        setLoggedIn(user);
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.log("유효성 검사 중 에러 발생: ", error);
      setIsLoading(false);
    }
    return false;
  };

  useEffect(() => {
    validateTokenInCookies();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        validateTokenInCookies,
        loggedIn,
        setLoggedIn,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext를 사용하기 위한 커스텀 훅
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
