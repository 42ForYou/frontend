import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

const NavItem = ({ to, label }) => (
  <li className="nav-item ms-3">
    {to ? (
      <Link to={to} className="nav-link">
        {label}
      </Link>
    ) : (
      <span>{label}</span>
    )}
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
    <div className="NavigationBar border-p4-box">
      <nav className="bg-light p-3">
        <div>LOGO</div>
        <ul className="navbar-nav">
          <NavItem to={"/"} label="HOME" />
          <NavItem to={"/games"} label="GAMES" />
          <NavItem to={"/chat"} label="CHAT" />
          <NavItem to={"/friends"} label="FRIENDS" />
          <NavItem to={"/users"} label="USERS" />
          <NavItem label="NOTIFICATION" />
          <NavItem to={"/profile"} label="PROFILE (MY)" />
        </ul>
        <div className="mt-2 mx-auto text-center align-vertical">
          <button className="btn btn-primary" onClick={handleLogout}>
            로그아웃하기
          </button>
          <button className="btn btn-secondary mt-2" onClick={() => navigate("/test")}>
            테스트용
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
