import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div className="NavigationBar">
      <nav>
        <div>LOGO</div>
        <ul>
          <li>
            <Link to={"/"}>HOME</Link>
          </li>
          <li>
            <Link to={"/games"}>GAMES</Link>
          </li>
          <li>
            <Link to={"/chat"}>CHAT</Link>
          </li>
          <li>
            <Link to={"/friends"}>FRIENDS</Link>
          </li>
          <li>
            <Link to={"/users"}>USERS</Link>
          </li>
          <li>
            {/* 알람은 페이지가 아님 차후 알맞게 수정 */}
            <Link to={"/unknown"}>NOTIFICATION</Link>
          </li>
          <li>
            <Link to={"/profile"}>PROFILE</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;
