import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, [location]);

  const setAccessTokenCookie = (accessToken) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    document.cookie = `access_token=${accessToken}; expires=${expirationDate.toUTCString()}; path=/`;
  };

  const getAccessTokenFromCookie = () => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "access_token") {
        return value;
      }
    }
    return null; // 쿠키에서 액세스 토큰을 찾지 못한 경우
  };

  const removeAccessTokenCookie = () => {
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const setAccessTokenLocal = (token) => {
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
  };

  const removeAccessTokenLocal = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  };

  // todo: 토큰 유효성 검사 로직 구현
  const isValidToken = (token) => {
    return token;
    // return true;
    // return token === "dev-token";
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        setAccessTokenLocal,
        removeAccessTokenLocal,
        setAccessTokenCookie,
        getAccessTokenFromCookie,
        removeAccessTokenCookie,
        isValidToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext를 사용하기 위한 커스텀 훅
// 차후 코드 간결화 시 적용 고려
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
