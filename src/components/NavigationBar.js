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
    <div className="NavigationBar border-p3-box">
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
            <Link to={"/profile"}>PROFILE (MY)</Link>
          </li>
        </ul>
        <button onClick={handleLogout}>로그아웃하기</button>
        <div>
          <br />
          ---- 프로필 테스트용 ----
          <li>
            <Link to={"/profile/users/pikachu"}>PROFILE (Valid 1)</Link>
          </li>
          <li>
            <Link to={"/profile/users/jgo"}>PROFILE (Valid 2)</Link>
          </li>
          <li>
            <Link to={"/profile/users/someone"}>PROFILE (Invalid)</Link>
          </li>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
