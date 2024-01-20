import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

// 프로덕션에서 React.StrictMode는 필요없음
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
