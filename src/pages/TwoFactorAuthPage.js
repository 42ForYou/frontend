import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TwoFactorAuthPage = () => {
  const { validate2FAcode, resend2FACode } = useAuth();
  const [code2FA, setCode2FA] = useState("");
  const [status2FA, setStatus2FA] = useState("");
  const navigate = useNavigate();

  const handle2FAcodeSubmit = async () => {
    setStatus2FA("");
    try {
      await validate2FAcode(code2FA);
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data.message === "Time out"
          ? "인증 시간이 초과되었습니다. 다시 시도해주세요."
          : "2FA 인증에 실패했습니다. 다시 시도해주세요.";
      setStatus2FA(errorMessage);
    }
  };

  const handleResend2FACode = async () => {
    try {
      await resend2FACode();
      setStatus2FA("2FA 코드가 재전송되었습니다. 이메일을 확인해주세요.");
    } catch (error) {
      setStatus2FA("2FA 코드 재전송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="LoginPage">
      <div>
        <h1>Welcome to the PlanetPong!</h1>
        <p>2차 인증 코드를 입력해주세요:</p>
        <div className="d-flex justify-content-center">
          <input
            type="text"
            placeholder="코드를 입력하세요"
            value={code2FA}
            onChange={(e) => setCode2FA(e.target.value)}
          />
          <button className="twoFactorAuth" onClick={handle2FAcodeSubmit}>
            제출
          </button>
        </div>
        <button onClick={handleResend2FACode}>코드 재전송</button> {/* 코드 재전송 버튼 추가 */}
        <p>{status2FA}</p>
      </div>
    </div>
  );
};

export default TwoFactorAuthPage;
