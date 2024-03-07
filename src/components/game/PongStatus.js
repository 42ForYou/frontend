import React from "react";
import { useGame } from "../../context/GameContext";

const PongStatus = () => {
  const { subgameStatus } = useGame();

  return (
    <div className="PongStatus" style={{ position: "absolute", left: "50%", transform: "translate(-50%, 0%)" }}>
      <div className="text-center">
        <h2>
          {subgameStatus.score_a} : {subgameStatus.score_b}
        </h2>
        <h3>남은 시간: {subgameStatus.time_left}초</h3>
      </div>
    </div>
  );
};

export default PongStatus;
