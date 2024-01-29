import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

import Avatar from "./Avatar";

const NavItem = ({ icon, label, to }) => (
  <li className="nav-item mb-2">
    <div className="row">
      <div className="col-3">{icon && <img src={icon} alt={label} className="icon" />}</div>
      <div className="col">{to ? <Link to={to}>{label}</Link> : <span>{label}</span>}</div>
    </div>
  </li>
);

const NavigationBar = () => {
  const { removeAccessTokenCookie } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAccessTokenCookie();
    alert("로그아웃 되었습니다. 토큰이 삭제되었습니다");
    navigate("/");
  };

  return (
    <div className="NavigationBar border-p3-box h-100">
      <nav className="bg-light p-3 d-flex flex-column justify-content-between h-100">
        <div className="row">
          <div className="row mb-4 text-center">
            <div>LOGO</div>
          </div>
          <div className="row">
            <ul>
              <NavItem
                to={"/"}
                label="HOME"
                icon={"https://cdn0.iconfinder.com/data/icons/typicons-2/24/home-48.png"}
              />
              <NavItem
                to={"/games"}
                label="GAMES"
                icon={"https://cdn3.iconfinder.com/data/icons/remixicon-others/24/ping-pong-fill-48.png"}
              />
              <NavItem
                to={"/friends"}
                label="FRIENDS"
                icon={"https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-heart-512.png"}
              />
              <NavItem
                to={"/users"}
                label="USERS"
                icon={"https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/group-48.png"}
              />
              <NavItem
                label="NOTICE"
                icon={"https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-bell-48.png"}
              />
              <NavItem to={"/test"} label="테스트용" />
            </ul>
          </div>
        </div>
        <div className="row text-center d-flex flex-column">
          Profile
          <Avatar to={"/profile"} />
          <button className="btn btn-primary mt-2 w-40" onClick={handleLogout}>
            로그아웃하기
          </button>
        </div>
        {/* <div className="mt-2 mx-auto text-center d-flex flex-column">
          <button className="btn btn-secondary mt-2" onClick={() => navigate("/test")}>
            테스트용
          </button>
        </div> */}
      </nav>
    </div>
  );
};

export default NavigationBar;
