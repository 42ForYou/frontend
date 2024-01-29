import React, { useEffect } from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../withAuthProtection";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("code");
  const hasQueryParam = queryParams.has("code");
  const serverURL = "http://localhost:8000"; // 서버 URL

  useEffect(() => {
    console.log(paramValue);

    const fetchFunc = async () => {
      try {
        const res = await fetch(`${serverURL}/oauth/?code=${paramValue}`, {
          method: "GET",
        });
        const data = await res.json();
        const token = data.data.token;
        console.log("issued token: ", token);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFunc();

    // if (hasQueryParam) navigate(`/oauth/?code=${paramValue}`);
  }, []);

  return (
    <div className="HomePage">
      <PageContainer hasNavigationBar={true}>Welcome to the Pongdom.</PageContainer>
    </div>
  );
};

export default withAuthProtection(HomePage);
