import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingPage from "./LoadingPage";

const TwoFactorAuthPage = () => {
  const { validate2FAcode, resend2FACode, loggedIn, twoFactorData, isLoading } = useAuth();
  const [code2FA, setCode2FA] = useState("");
  const [status2FA, setStatus2FA] = useState("");
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      alert("이미 로그인 된 상태입니다.");
      navigate("/");
    } else if (!twoFactorData) {
      alert("잘못된 접근입니다.");
      navigate("/login");
    }
  }, []);

  const handle2FAcodeSubmit = async () => {
    setStatus2FA("");
    try {
      setIsProcessing(true);
      await validate2FAcode(code2FA);
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data.message === "Time out"
          ? "인증 시간이 초과되었습니다. 다시 시도해주세요."
          : "2FA 인증에 실패했습니다. 다시 시도해주세요.";
      setStatus2FA(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResend2FACode = async () => {
    try {
      setIsProcessing(true);
      await resend2FACode();
      setStatus2FA("2FA 코드가 재전송되었습니다. 이메일을 확인해주세요.");
    } catch (error) {
      setStatus2FA("2FA 코드 재전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="LoginPage">
      <div>
        <h4 style={{ textShadow: "2px 2px 4px #000000" }}>
          {twoFactorData.email}로<br />
          2차 인증 코드가 전송되었습니다. (제한시간: 3분)
        </h4>
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
        <button onClick={handleResend2FACode}>재전송</button>
        <p className="pt-1" style={{ textShadow: "2px 2px 4px #000000" }}>
          {isProcessing ? "처리 중입니다. 잠시만 기다려주세요..." : status2FA}
        </p>
      </div>
    </div>
  );
};

export default TwoFactorAuthPage;
