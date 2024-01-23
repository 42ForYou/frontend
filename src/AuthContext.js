import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const location = useLocation();

  useEffect(() => {
    console.log("Fetching token from web storage...");
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
    console.log("Token fetched: ", token);
  }, [location]);

  const handleSetAuthToken = (token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };

  const handleRemoveAuthToken = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
  };

  // todo: 토큰 유효성 검사 로직 구현
  const isValidToken = (token) => {
    return token === "dev-token";
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken: handleSetAuthToken,
        removeAuthToken: handleRemoveAuthToken,
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
