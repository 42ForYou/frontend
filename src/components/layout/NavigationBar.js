import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext, { useAuth } from "../../context/AuthContext";

import Avatar from "../common/Avatar";
import Icon from "../common/Icon";

const NavItem = ({ label, to, icon }) => {
  return (
    <li className="NavItem d-flex align-items-start mb-3">
      <Link to={to} className="d-flex align-items-center justify-content-center w-100 text-decoration-none">
        {icon && <Icon filename={`${icon}.png`} alt={label} invert={true} />}
        <span className="nav-link ms-3">{label}</span>
      </Link>
    </li>
  );
};

const NavItems = () => {
  return (
    <ul className="NavItems p-0">
      <NavItem to={"/"} label="HOME" icon={"home"} />
      <NavItem to={"/game/list"} label="GAMES" icon={"pong"} />
      <NavItem to={"/friends"} label="FRIENDS" icon={"handshake"} />
      <NavItem to={"/users"} label="USERS" icon={"people"} />
    </ul>
  );
};

const NavUser = () => {
  const { loggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("로그아웃 되었습니다. (httpOnly 쿠키는 삭제되지 않음)\n로그인 페이지로 돌아갑니다");
    navigate("/login");
  };

  const avatarSrc = loggedIn ? loggedIn.avatar : null;
  const nickname = loggedIn ? loggedIn.nickname : "로그인하지 않은 사용자";

  return (
    <div className="NavUser d-flex flex-column align-items-center mb-3">
      <div className="mb-3">{nickname}</div>
      <Avatar src={avatarSrc} to={"/profile"} />
      <button className="btn btn-secondary mt-2 w-40" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

const NavLogo = () => {
  return (
    <h1 className="NavLogo mt-3 mb-5 invert-image">
      <img src={`${process.env.ASSETS_URL}/logo-2.png`} alt={"logo"} />
    </h1>
  );
};

const NavigationBar = () => {
  return (
    <div className="NavigationBar h-100">
      <nav className="border border-white d-flex-column justify-content-between h-100 p-3">
        <div>
          <NavLogo />
          <NavItems />
        </div>
        <NavUser />
      </nav>
    </div>
  );
};

export default React.memo(NavigationBar);
