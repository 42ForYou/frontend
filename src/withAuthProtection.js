import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

// 보호된 페이지를 위한 고차 컴포넌트
// 인증 상태에 따라 페이지 접근을 제어함
const withAuthProtection = (WrappedComponent) => {
  return (props) => {
    const { accessToken, getAccessTokenFromCookie, isValidToken } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (!isValidToken(accessToken)) {
        console.log(getAccessTokenFromCookie());
        if (!getAccessTokenFromCookie()) {
          navigate("/login");
          alert("인증 토큰이 유효하지 않습니다. 로그인 페이지로 돌아갑니다");
        }
      }
    }, [accessToken, isValidToken, navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuthProtection;
