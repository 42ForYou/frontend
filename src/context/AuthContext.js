import React, { createContext, useState, useContext, useEffect } from "react";
import { get } from "../common/apiBase";
import { API_ENDPOINTS } from "../common/apiEndpoints";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(null);

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

  const login = async (code) => {
    if (await validateTokenInCookies()) return true;
    try {
      const resData = await get(API_ENDPOINTS.OAUTH_REDIRECT(code));
      const { user } = resData.data;
      setLoggedIn(user);
      setIsLoading(false);
      console.log("로그인 성공");
    } catch (error) {
      console.error("로그인 중 에러 발생: ", error);
      return false;
    }
    return true;
  };

  // todo: 쿠키 삭제 API 구현 후 변경
  const logout = async () => {
    setLoggedIn(null);
  };

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

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
