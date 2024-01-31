import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

// 보호된 페이지를 위한 고차 컴포넌트
// 인증 상태에 따라 페이지 접근을 제어함
const withAuthProtection = (WrappedComponent) => {
  return (props) => {
    const { validateTokenInCookies } = useContext(AuthContext);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // 보호된 페이지로 접근 시도할 때마다 인증 검사
    useEffect(() => {
      setIsAuthorized(false);
      const authCheck = async () => {
        const isValid = await validateTokenInCookies();
        if (!isValid) {
          alert("토큰이 유효하지 않습니다. 로그인 페이지로 돌아갑니다");
          navigate("/login");
        } else setIsAuthorized(true);
      };
      authCheck();
    }, [location]);

    return isAuthorized ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuthProtection;
