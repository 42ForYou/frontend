import React from "react";
import Avatar from "../common/Avatar";

const BracketPlayer = ({ name, avatar, columnCnt, nthColumn, topPos }) => {
  const diameter = 130;
  const leftPos = (nthColumn / columnCnt) * 100;

  return (
    <div className="bracket-player p-0" style={{ position: "absolute", top: `${topPos}%`, left: `${leftPos}%` }}>
      <div
        className={"text-center"}
        style={{ width: `${diameter}px`, height: `${diameter}px`, transform: "translate(-50%, -50%)" }}>
        <Avatar src={avatar} diameter={130} />
        <p>{name}</p>
      </div>
    </div>
  );
};

const Bracket = ({ players }) => (
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
      <BracketPlayer name="Player 1" columnCnt={4} nthColumn={1} topPos={75} />
      <BracketPlayer name="Player 2" columnCnt={4} nthColumn={3} topPos={75} />
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
    <div className="row" style={{ position: "relative" }}>
      <div className="col bracket-box"></div>
      <div className="col bracket-box"></div>
      <div className="col bracket-box"></div>
      <div className="col bracket-box"></div>
      <BracketPlayer name="Player 1" columnCnt={8} nthColumn={1} topPos={0} />
      <BracketPlayer name="Player 1" columnCnt={8} nthColumn={3} topPos={0} />
      <BracketPlayer name="Player 1" columnCnt={8} nthColumn={5} topPos={0} />
      <BracketPlayer name="Player 1" columnCnt={8} nthColumn={7} topPos={0} />
    </div>
  </div>
);

export default Bracket;
