import React from "react";
import { useGame } from "../../context/GameContext";
import Avatar from "../common/Avatar";

const PongPlayer = ({ player }) => {
  return (
    <div className="d-flex-col justify-content-center align-items-center">
      <Avatar src={player.avatar} alt={`${player.nickname}'s avatar`} diameter={80} />
      <h5 className="mt-1">{player.nickname}</h5>
    </div>
  );
};

const PongStatus = () => {
  const { subgameStatus } = useGame();

  const getTimeString = (time_left, sudden_death) => {
    if (sudden_death) {
      return <span className="SuddenDeath">Sudden Death</span>;
    } else if (time_left > 0) {
      return <span>Time: ${time_left}</span>;
    } else {
      return <span>Game Over!</span>;
    }
  };

  return (
    <div className="PongStatus">
      <div style={{ position: "absolute", top: "2%", left: "10%", transform: "translate(-50%, 0%)", width: "100%" }}>
        <PongPlayer player={subgameStatus.player_a} />
      </div>
      <div style={{ position: "absolute", top: "2%", left: "90%", transform: "translate(-50%, 0%)", width: "100%" }}>
        <PongPlayer player={subgameStatus.player_b} />
      </div>
      <span
        className="text-center"
        style={{ position: "absolute", top: "2%", left: "50%", transform: "translate(-50%, 0%)", width: "100%" }}>
        <h2>
          {subgameStatus.score_a} : {subgameStatus.score_b}
        </h2>
        <h3>{getTimeString(subgameStatus.time_left, subgameStatus.sudden_death)}</h3>
      </span>
    </div>
  );
};

export default PongStatus;
