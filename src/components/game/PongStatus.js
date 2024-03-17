import React from "react";
import { useGame } from "../../context/GameContext";

const PongStatus = () => {
  const { subgameStatus } = useGame();

  const getTimeString = (time_left, sudden_death) => {
    if (sudden_death) {
      return "서든데스";
    } else if (time_left > 0) {
      return `남은 시간: ${time_left}초`;
    } else {
      return "게임 종료";
    }
  };

  return (
    <div className="PongStatus" style={{ position: "absolute", left: "50%", transform: "translate(-50%, 0%)" }}>
      <div className="text-center">
        <h2>
          {subgameStatus.score_a} : {subgameStatus.score_b}
        </h2>
        <h3>{getTimeString(subgameStatus.time_left, subgameStatus.sudden_death)}</h3>
      </div>
    </div>
  );
};

export default PongStatus;
