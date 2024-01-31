import React, { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const serverURL = "http://localhost:8000"; // 서버 URL

  const login = async (codeValue) => {
    try {
      console.log(codeValue);

      const res = await fetch(`${serverURL}/oauth/?code=${codeValue}`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        // 로그인 성공 처리
        console.log("로그인 성공");
        const { user } = (await res.json()).data;
        setLoggedInUser(user);
        return true;
      } else {
        // 로그인 실패 처리
        console.log("로그인 실패");
      }
    } catch (error) {
      console.error("로그인 중 에러 발생: ", error);
    }
    return false;
  };

  const logout = async () => {
    // todo: 쿠키 삭제 API 구현 후 변경
    setLoggedInUser(null);
  };

  // 현재 쿠키에 저장되어 있는 토큰의 유효성을 검사
  const validateTokenInCookies = async () => {
    try {
      const res = await fetch(`${serverURL}/valid`, {
        method: "GET",
        credentials: "include", // HttpOnly 쿠키를 포함하여 요청 보내기
      });
      if (res.ok) {
        const { user } = (await res.json()).data;
        setLoggedInUser(user);
        return true;
      }
    } catch (error) {
      console.log("error: ", error);
    }
    setLoggedInUser(null);
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        validateTokenInCookies,
        loggedInUser,
        setLoggedInUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext를 사용하기 위한 커스텀 훅
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
