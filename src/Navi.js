import React from "react";
import { Link } from "react-router-dom";

const Navi = () => {
  return (
    <nav>
      Navigator
      <br />
      <Link to={"/"}>HOME</Link>
      <br />
      <Link to={"/game"}>GAME</Link>
      <br />
      <Link to={"/login"}>LOGIN</Link>
    </nav>
  );
};

export default Navi;
