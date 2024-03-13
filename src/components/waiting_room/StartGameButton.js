import React from "react";
import BootstrapButton from "../common/BootstrapButton";
import { useGame } from "../../context/GameContext";

const StartGameButton = ({ isActive }) => {
  const { emitRoomSocket } = useGame();

  const handleStartGame = () => {
    if (!window.confirm("게임을 시작하시겠습니까?")) return;
    emitRoomSocket("start");
  };

  return (
    <BootstrapButton
      styleType={"primary pb-5"}
      label={"START"}
      onClick={isActive ? handleStartGame : null}
      overrideStyle={{
        width: "150px",
        height: "50px",
        fontSize: "30px",
        padding: "-10px 24px",
      }}
      disabled={!isActive}
    />
  );
};

export default StartGameButton;
