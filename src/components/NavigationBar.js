import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

const NavigationBar = () => {
  const { removeAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuthToken();
    alert("로그아웃 되었습니다. 토큰이 삭제되었습니다");
    navigate("/");
  };

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
          <li>NOTIFICATION</li>
          <li>
            <Link to={"/profile"}>PROFILE</Link>
          </li>
        </ul>
        <button onClick={handleLogout}>로그아웃하기</button>
      </nav>
    </div>
  );
};

export default NavigationBar;
