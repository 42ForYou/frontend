import React, { createContext, useState, useContext } from "react";

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  // 토큰 설정 함수
  const handleSetAuthToken = (token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };

  // 토큰 제거 함수
  const handleRemoveAuthToken = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken: handleSetAuthToken, removeAuthToken: handleRemoveAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
