import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./style/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

// 엄격 모드 적용시 부수 효과 감지를 위해 마운트, 언마운트가 두 번씩 실행됨
// 프로덕션에서 React.StrictMode는 필요없음
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
