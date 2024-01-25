import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

const NavItem = ({ to, label }) => (
  <li className="nav-item ms-3">
    <Link to={to} className="nav-link">
      {label}
    </Link>
  </li>
);

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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-brand mx-auto">LOGO</div>
        <ul className="navbar-nav">
          <NavItem to={"/"} label="HOME" />
          <NavItem to={"/games"} label="GAMES" />
          <NavItem to={"/chat"} label="CHAT" />
          <NavItem to={"/friends"} label="FRIENDS" />
          <NavItem to={"/users"} label="USERS" />
          <li className="nav-item ms-3">NOTIFICATION</li>
          <NavItem to={"/profile"} label="PROFILE (MY)" />
        </ul>
        <div className="mt-2 mx-auto text-center">
          <button className="btn btn-primary" onClick={handleLogout}>
            로그아웃하기
          </button>
          <button className="btn btn-secondary mt-2" onClick={() => navigate("/test")}>
            테스트용 페이지로
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
