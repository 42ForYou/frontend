import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import { getWithoutCredentials } from "../utils/apiBase";

const LoginPage = () => {
  const [code2FA, setCode2FA] = useState("");
  const [is2FARequired, setIs2FARequired] = useState(false);
  const [status2FA, setStatus2FA] = useState(""); // 2FA 인증 상태 메세지
  const [emailFor2FA, setEmailFor2FA] = useState("");
  const { validateTokenInCookies, validate2FAcode, login } = useAuth();
  const navigate = useNavigate();

  const redirectToOAuthPage = async () => {
    try {
      const resData = await getWithoutCredentials(API_ENDPOINTS.LOGIN);
      window.location.href = resData.data.url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    const { success: isValidToken, user } = await validateTokenInCookies();
    if (!isValidToken) redirectToOAuthPage();
    else if (isValidToken && !user.two_factor_auth) navigate("/");
    else if (isValidToken && user.two_factor_auth) {
      setIs2FARequired(true);
      setEmailFor2FA(user.email);
    }
  };

  // todo: input값에 따른 검증 및 상태 메세지 출력
  const handle2FAcodeSubmit = async () => {
    setStatus2FA("");
    const { success: isValidCode } = await validate2FAcode(code2FA);
    if (isValidCode) {
      setIs2FARequired(false);
      navigate("/");
    } else {
      setStatus2FA("2FA 인증에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="LoginPage">
      <div>
        <h1>로그인 페이지</h1>
        {is2FARequired ? (
          <>
            <p>{emailFor2FA}로 전송된 2차 인증 코드를 입력해주세요:</p>
            <input type="text" placeholder="2FA 코드" value={code2FA} onChange={(e) => setCode2FA(e.target.value)} />
            <button onClick={handle2FAcodeSubmit}>2FA 코드 제출</button>
            <p>개발 모드: 인증코드로 dev 입력시 통과</p>
            <p>{status2FA}</p>
          </>
        ) : (
          <button onClick={handleLogin}>로그인</button>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
