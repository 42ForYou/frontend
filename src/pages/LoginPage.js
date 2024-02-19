import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import OAuthLoginPage from "./OAuthLoginPage";
import TwoFactorAuthPage from "./TwoFactorAuthPage";

const LoginPage = () => {
  const { is2FARequired, login, verify2FACode } = useAuth();
  const [code2FA, setCode2FA] = useState("");
  const [status2FA, setStatus2FA] = useState("");

  const handleLogin = () => {
    // 로그인 처리
  };

  const handle2FAcodeSubmit = () => {
    // 2FA 코드 제출 처리
  };

  return is2FARequired ? (
    <TwoFactorAuthPage
      code2FA={code2FA}
      setCode2FA={setCode2FA}
      handle2FAcodeSubmit={handle2FAcodeSubmit}
      status2FA={status2FA}
    />
  ) : (
    <OAuthLoginPage handleLogin={handleLogin} />
  );
};

export default LoginPage;
