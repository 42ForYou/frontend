import React from "react";
import Avatar from "../common/Avatar";

const BracketPlayer = ({ name, avatar, transform }) => {
  return (
    <div
      className="bracket-player"
      style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <Avatar diameter={130} />
      <p>{name}</p>
    </div>
  );
};

const Bracket = () => (
  <div className="bracket container-fluid p-0">
    <div className="row">
      <div className="col bracket-box" style={{ borderRight: "1px solid red" }}></div>
      <div className="col bracket-box"></div>
    </div>
    <div className="row" style={{ position: "relative" }}>
      <div className="col bracket-box"></div>
      <div className="col bracket-box" style={{ borderLeft: "1px solid red", borderTop: "1px solid red" }}></div>
      <div className="col bracket-box" style={{ borderRight: "1px solid red", borderTop: "1px solid red" }}></div>
      <div className="col bracket-box"></div>
      <BracketPlayer name="Player 1" transform="translate(-50%, -50%)" />
      {/* <img
        src="https://png.pngtree.com/png-clipart/20201031/ourmid/pngtree-circle-clipart-lake-blue-png-image_2382137.jpg"
        alt="Floating Image"
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-75%, -50%)" }}
      />
      <img
        src="https://png.pngtree.com/png-clipart/20201031/ourmid/pngtree-circle-clipart-lake-blue-png-image_2382137.jpg"
        alt="Floating Image"
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-25%, -50%)" }}
      /> */}
    </div>
    <div className="row">
      <div className="col bracket-box"></div>
      <div className="col bracket-box" style={{ borderLeft: "1px solid red", borderTop: "1px solid red" }}></div>
      <div className="col bracket-box" style={{ borderRight: "1px solid red", borderTop: "1px solid red" }}></div>
      <div className="col bracket-box"></div>
      <div className="col bracket-box"></div>
      <div className="col bracket-box" style={{ borderLeft: "1px solid red", borderTop: "1px solid red" }}></div>
      <div className="col bracket-box" style={{ borderRight: "1px solid red", borderTop: "1px solid red" }}></div>
      <div className="col bracket-box"></div>
    </div>
    <div className="row">
      <div className="col bracket-box"></div>
      <div className="col bracket-box"></div>
      <div className="col bracket-box"></div>
      <div className="col bracket-box"></div>
    </div>
  </div>
);

export default Bracket;
