import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

const LoginCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("code");
  const hasQueryParam = queryParams.has("code");
  const serverURL = "http://localhost:8000"; // 서버 URL
  const { setToken, setTokenToCookies } = useContext(AuthContext);

  useEffect(() => {
    const fetchFunc = async () => {
      if (hasQueryParam) {
        try {
          const res = await fetch(`${serverURL}/oauth/?code=${paramValue}`, {
            method: "GET",
          });
          const data = await res.json();
          const token = data.data.token;
          console.log("백 서버로부터 받은 데이터: ", data);
          console.log("issued token: ", token);
          setToken(token);
          setTokenToCookies(token);
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchFunc();
  }, [paramValue, hasQueryParam]);

  const [authCode, setAuthCode] = useState("");

  return (
    <div className="CallbackPage">
      <div>
        <h1>OAuth 콜백 페이지</h1>
        {authCode ? <p>인증 코드: {authCode}</p> : <p>리다이렉션 후 인증 코드를 기다립니다.</p>}
        {/* <button onClick={() => navigate("/")}>홈으로 가기</button> */}
      </div>
    </div>
  );
};

export default LoginCallbackPage;
