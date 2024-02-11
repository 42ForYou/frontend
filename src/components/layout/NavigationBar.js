import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext, { useAuth } from "../../context/AuthContext";

import Avatar from "../common/Avatar";
import Icon from "../common/Icon";

const NavItem = ({ label, to, icon }) => {
  return (
    <li className="nav-item mb-2">
      <div className="row">
        <div className="col-3">{icon && <Icon filename={`${icon}.png`} alt={label} />}</div>
        <div className="col">{to ? <Link to={to}>{label}</Link> : <span>{label}</span>}</div>
      </div>
    </li>
  );
};

const NavItems = () => {
  return (
    <ul>
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
    <div className="d-flex flex-column align-items-center">
      {nickname}
      <Avatar src={avatarSrc} to={"/profile"} />
      <button className="btn btn-primary mt-2 w-40" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
};

const NavLogo = () => {
  return (
    <h1 className="mb-4">
      <img src={`${process.env.ASSETS_URL}/logo_black.png`} alt={"logo"} />
    </h1>
  );
};

const NavigationBar = () => {
  return (
    <div className="NavigationBar h-100">
      <nav className="bg-light d-flex-column justify-content-between h-100 p-3">
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
