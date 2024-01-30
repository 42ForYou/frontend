import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const serverURL = "http://localhost:8000"; // 서버 URL

  const getTokenFromCookies = () => {
    return Cookies.get("token");
  };

  const setTokenToCookies = (token) => {
    Cookies.set("token", token, { expires: 7, path: "/" });
  };

  const removeTokenFromCookies = () => {
    setToken("");
    Cookies.remove("token", { path: "/" });
  };

  const validateToken = async (token) => {
    try {
      const response = await fetch(`${serverURL}/accounts/profiles/yeonhkim`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log("responseData: ", responseData);
        return true;
      }
    } catch (error) {
      console.log("error: ", error);
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        setTokenToCookies,
        getTokenFromCookies,
        removeTokenFromCookies,
        validateToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext를 사용하기 위한 커스텀 훅
// 차후 코드 간결화 시 적용 고려
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
