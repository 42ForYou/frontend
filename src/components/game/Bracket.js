import React from "react";
import Avatar from "../common/Avatar";

const BracketPlayer = ({ playerData, columnCnt, nthColumn, topPos }) => {
  const { nickname, avatar } = playerData;
  const diameter = 130;
  const leftPos = (nthColumn / columnCnt) * 100;

  return (
    <div
      className="bracket-player p-0"
      style={{ position: "absolute", top: `${topPos}%`, left: `${leftPos}%`, zIndex: 100 }}>
      <div
        className={"text-center"}
        style={{ width: `${diameter}px`, height: `${diameter}px`, transform: "translate(-50%, -50%)" }}>
        <Avatar src={avatar} diameter={130} />
        <p>{nickname}</p>
      </div>
    </div>
  );
};

const BracketBoxNonBorder = () => {
  return <div className="col bracket-box"></div>;
};

const BracketBoxLeftTopBorder = () => {
  return <div className="col bracket-box" style={{ borderLeft: "3px solid red", borderTop: "3px solid red" }}></div>;
};

const BracketBoxRightTopBorder = () => {
  return <div className="col bracket-box" style={{ borderRight: "3px solid red", borderTop: "3px solid red" }}></div>;
};

const BracketRow = ({ children }) => {
  return (
    <div className="row" style={{ position: "relative" }}>
      {children}
    </div>
  );
};

const Bracket4Players = ({ players }) => (
  <>
    <div className="bracket container-fluid p-0">
      <BracketRow>
        <BracketPlayer playerData={{ nickname: "winner" }} columnCnt={2} nthColumn={1} topPos={75} />
        <BracketBoxNonBorder />
        <BracketBoxNonBorder />
      </BracketRow>

      <BracketRow>
        <BracketPlayer playerData={players[0][0][0]} columnCnt={4} nthColumn={1} topPos={75} />
        <BracketPlayer playerData={players[0][0][1]} columnCnt={4} nthColumn={3} topPos={75} />
        <BracketBoxNonBorder />
        <BracketBoxLeftTopBorder />
        <BracketBoxRightTopBorder />
        <BracketBoxNonBorder />
      </BracketRow>

      <BracketRow>
        <BracketBoxNonBorder />
        <BracketBoxLeftTopBorder />
        <BracketBoxRightTopBorder />
        <BracketBoxNonBorder />
        <BracketBoxNonBorder />
        <BracketBoxLeftTopBorder />
        <BracketBoxRightTopBorder />
        <BracketBoxNonBorder />
      </BracketRow>

      <BracketRow>
        <BracketPlayer playerData={players[1][0][0]} columnCnt={8} nthColumn={1} topPos={0} />
        <BracketPlayer playerData={players[1][0][1]} columnCnt={8} nthColumn={3} topPos={0} />
        <BracketPlayer playerData={players[1][1][0]} columnCnt={8} nthColumn={5} topPos={0} />
        <BracketPlayer playerData={players[1][1][1]} columnCnt={8} nthColumn={7} topPos={0} />
        <BracketBoxNonBorder />
        <BracketBoxNonBorder />
        <BracketBoxNonBorder />
        <BracketBoxNonBorder />
      </BracketRow>
    </div>
  </>
);

// todo: 구현
const Bracket2Players = ({ players }) => {
  return (
    <div className="bracket container-fluid p-0">
      <BracketRow>
        <BracketPlayer playerData={{ nickname: "winner" }} columnCnt={2} nthColumn={1} topPos={75} />
        <BracketBoxNonBorder />
        <BracketBoxNonBorder />
      </BracketRow>

      <BracketRow>
        <BracketPlayer playerData={players[0][0][0]} columnCnt={4} nthColumn={1} topPos={75} />
        <BracketPlayer playerData={players[0][0][1]} columnCnt={4} nthColumn={3} topPos={75} />
        <BracketBoxNonBorder />
        <BracketBoxLeftTopBorder />
        <BracketBoxRightTopBorder />
        <BracketBoxNonBorder />
      </BracketRow>
    </div>
  );
};

const Bracket = ({ players }) => {
  if (!players) return null;

  const playersArr = players.players;
  const nPlayers = playersArr[playersArr.length - 1].length * 2;

  return (
    <>
      {nPlayers === 2 && <Bracket2Players players={playersArr} />}
      {nPlayers === 4 && <Bracket4Players players={playersArr} />}
    </>
  );
};

export default Bracket;
