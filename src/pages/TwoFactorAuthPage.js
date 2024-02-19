import React from "react";

const TwoFactorAuthPage = () => {
  const { dataFor2FA } = useContext(AuthContext);
  const [code2FA, setCode2FA] = useState("");
  const [status2FA, setStatus2FA] = useState("");

  const handle2FAcodeSubmit = () => {
    const validate2FAcode = async (code) => {
      //
    };
    // 2FA 코드 제출 처리
  };

  // todo: 재전송 로직 추가
  const resend2FAcode = () => {};

  return (
    <div className="LoginPage">
      <div>
        <h1>Welcome to the PlanetPong!</h1>
        <p>{emailFor2FA}로 전송된 2차 인증 코드를 입력해주세요:</p>
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
        <div>
          <br />
          개발 모드: 인증코드로 dev 입력시 통과
        </div>
        <p>{status2FA}</p>
      </div>
    </div>
  );
};

export default TwoFactorAuthPage;
