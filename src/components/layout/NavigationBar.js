import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext, { useAuth } from "../../context/AuthContext";

import Avatar from "../common/Avatar";
import Icon from "../common/Icon";

const NavItem = ({ label, to, icon }) => {
  return (
    <li className="NavItem flex-1 border-bottom border-white mb-4">
      <Link to={to} className="d-flex  pb-1">
        {icon && <Icon filename={`${icon}.png`} alt={label} invert={true} />}
        <span className="nav-link flex-grow ms-3">{label}</span>
      </Link>
    </li>
  );
};

const NavItems = () => {
  return (
    <ul className="NavItems d-flex-col p-0">
      <NavItem to={"/"} label="Home" icon={"home"} />
      <NavItem to={"/game/list"} label="Games" icon={"pong"} />
      <NavItem to={"/friends"} label="Friends" icon={"handshake"} />
      <NavItem to={"/users"} label="Users" icon={"people"} />
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
  const nickname = loggedIn ? loggedIn.nickname : "Unknown User";

  return (
    <div className="NavUser d-flex flex-column align-items-center mb-3">
      <div className="mb-3 text-center">{nickname}</div>
      <Avatar src={avatarSrc} to={"/profile"} diameter={130} />
      <button className="btn btn-secondary mt-2 w-40" onClick={handleLogout}>
        Sign Out
      </button>
    </div>
  );
};

const NavLogo = () => {
  return (
    <h1 className="NavLogo mt-3 mb-5">
      <Link to="/">
        <img src={`${process.env.ASSETS_URL}/logo-3-color3.png`} alt="logo" />
      </Link>
    </h1>
  );
};

const NavigationBar = () => {
  return (
    <div className="NavigationBar h-100">
      <nav className="NavigationBar-Content d-flex-col justify-content-between h-100 p-3">
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
