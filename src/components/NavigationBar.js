import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import Avatar from "./Avatar";
import Icon from "./Icon";

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
      <NavItem label="NOTICE" icon={"bell"} />
      <NavItem to={"/test"} label="테스트용" />
    </ul>
  );
};

const NavUser = () => {
  const { loggedInUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("로그아웃 되었습니다. (httpOnly 쿠키는 삭제되지 않음)\n로그인 페이지로 돌아갑니다");
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column align-items-center">
      {loggedInUser ? loggedInUser.nickname : "로그인하지 않은 사용자"}
      <Avatar src={loggedInUser.avatar} to={"/profile"} />
      <button className="btn btn-primary mt-2 w-40" onClick={handleLogout}>
        로그아웃하기
      </button>
    </div>
  );
};

const NavigationBar = () => {
  return (
    <div className="NavigationBar border-p3-box h-100">
      <nav className="bg-light p-3 d-flex flex-column justify-content-between h-100">
        <div className="row">
          <div className="row mb-4 text-center">
            <div>LOGO</div>
          </div>
          <div className="row">
            <NavItems />
          </div>
        </div>
        <div className="row">
          <NavUser />
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
