import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

// 보호된 페이지를 위한 고차 컴포넌트
// 인증 상태에 따라 페이지 접근을 제어함
const withAuthProtection = (WrappedComponent) => {
  return (props) => {
    const { token, setToken, validateToken, getTokenFromCookies } = useContext(AuthContext);
    const [hasValidToken, setHasValidToken] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      const checkTokenValidity = async () => {
        if (token) {
          const isValid = await validateToken(token);
          setHasValidToken(isValid);
        } else {
          const tokenFromCookie = getTokenFromCookies();
          if (tokenFromCookie) {
            const isValid = await validateToken(tokenFromCookie);
            if (isValid) {
              setToken(tokenFromCookie);
              setHasValidToken(true);
            } else {
              alert("토큰이 유효하지 않습니다.");
              navigate("/login");
            }
          } else {
            alert("토큰이 유효하지 않습니다.");
            navigate("/login");
          }
        }
      };
      checkTokenValidity();
    }, [token, location]);

    return hasValidToken ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuthProtection;
