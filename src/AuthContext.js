import React, { createContext, useState, useContext } from "react";

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        isLoading,
        setIsLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext를 사용하기 위한 커스텀 훅
// 차후 코드 간결화 시 적용 고려
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
