import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

// todo: 백엔드 코드 수정 이후 직접 쿠키를 건드는 로직 제외
export const AuthProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const serverURL = "http://localhost:8000"; // 서버 URL

  const login = async (codeValue) => {
    try {
      const res = await fetch(`${serverURL}/oauth/?code=${codeValue}`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        // 로그인 성공 처리
        console.log("로그인 성공");
        const { user, token } = (await res.json()).data;

        console.log("유저 정보 세팅");
        setUserProfile(user);

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
    Cookies.remove("token", { path: "/" });
    setUserProfile(null);
    alert("로그아웃 되었습니다. 로그인 페이지로 돌아갑니다");
  };

  // 현재 쿠키에 저장되어 있는 토큰의 유효성을 검사
  const validateTokenInCookies = async () => {
    try {
      console.log("유효성 검사");
      // todo: 차후 유효성 검사용 API 엔드포인트로 요청 변경
      const res = await fetch(`${serverURL}/accounts/profiles/yeonhkim`, {
        method: "GET",
        credentials: "include", // HttpOnly 쿠키를 포함하여 요청 보내기
      });
      if (res.ok) {
        return true;
      }
    } catch (error) {
      console.log("error: ", error);
    }
    setUserProfile(null);
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        validateTokenInCookies,
        userProfile,
        setUserProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext를 사용하기 위한 커스텀 훅
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
