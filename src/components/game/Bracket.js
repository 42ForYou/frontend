import React from "react";
import Avatar from "../common/Avatar";

const BracketPlayer = ({ playerData, columnCnt, nthColumn, topPos }) => {
  const { nickname, avatar } = playerData;
  const diameter = 130;
  const leftPos = (nthColumn / columnCnt) * 100;

  return (
    <div className="bracket-player p-0" style={{ position: "absolute", top: `${topPos}%`, left: `${leftPos}%` }}>
      <div
        className={"text-center"}
        style={{ width: `${diameter}px`, height: `${diameter}px`, transform: "translate(-50%, -50%)", zIndex: 100 }}>
        <Avatar src={avatar} diameter={130} />
        <p>{nickname}</p>
      </div>
    </div>
  );
};

const Bracket4Players = ({ players }) => (
  <>
    <div className="bracket container-fluid p-0">
      <div className="row" style={{ position: "relative" }}>
        <BracketPlayer playerData={{ nickname: "winner" }} columnCnt={2} nthColumn={1} topPos={75} />
        <div className="col bracket-box"></div>
        <div className="col bracket-box"></div>
      </div>
      <div className="row" style={{ position: "relative" }}>
        <div className="col bracket-box"></div>
        <div className="col bracket-box" style={{ borderLeft: "3px solid red", borderTop: "3px solid red" }}></div>
        <div className="col bracket-box" style={{ borderRight: "3px solid red", borderTop: "3px solid red" }}></div>
        <div className="col bracket-box"></div>
        <BracketPlayer playerData={players[0][0][0]} columnCnt={4} nthColumn={1} topPos={75} />
        <BracketPlayer playerData={players[0][0][1]} columnCnt={4} nthColumn={3} topPos={75} />
      </div>
      <div className="row">
        <div className="col bracket-box"></div>
        <div className="col bracket-box" style={{ borderLeft: "3px solid red", borderTop: "3px solid red" }}></div>
        <div className="col bracket-box" style={{ borderRight: "3px solid red", borderTop: "3px solid red" }}></div>
        <div className="col bracket-box"></div>
        <div className="col bracket-box"></div>
        <div className="col bracket-box" style={{ borderLeft: "3px solid red", borderTop: "3px solid red" }}></div>
        <div className="col bracket-box" style={{ borderRight: "3px solid red", borderTop: "3px solid red" }}></div>
        <div className="col bracket-box"></div>
      </div>
      <div className="row" style={{ position: "relative" }}>
        <div className="col bracket-box"></div>
        <div className="col bracket-box"></div>
        <div className="col bracket-box"></div>
        <div className="col bracket-box"></div>
        <BracketPlayer playerData={players[1][0][0]} columnCnt={8} nthColumn={1} topPos={0} />
        <BracketPlayer playerData={players[1][0][1]} columnCnt={8} nthColumn={3} topPos={0} />
        <BracketPlayer playerData={players[1][1][0]} columnCnt={8} nthColumn={5} topPos={0} />
        <BracketPlayer playerData={players[1][1][1]} columnCnt={8} nthColumn={7} topPos={0} />
      </div>
    </div>
  </>
);

// todo: 구현
const Bracket2Players = ({ players }) => (
  <>
    <div className="bracket container-fluid p-0"></div>
  </>
);

const Bracket = ({ players }) => {
  if (!players) return null;
  return (
    <>
      {players.length === 2 && <Bracket2Players players={players.players} />}
      {players.length === 4 && <Bracket4Players players={players.players} />}
    </>
  );
};

export default Bracket;
