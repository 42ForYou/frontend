import React from "react";
import StyledButton from "../common/StyledButton";
import { useTournament } from "../../context/TournamentContext";
import { useSocket } from "../../context/SocketContext";
import { useNavigate } from "react-router-dom";

const StartGameButton = ({ isActive }) => {
  const navigate = useNavigate();
  const { roomData, gameData } = useTournament();
  const namespace = `/game/room/${roomData.id}`;
  const socket = useSocket().sockets[namespace];

  const handleStartGame = () => {
    if (!window.confirm("게임을 시작하시겠습니까?")) return;
    socket.emitWithTime("start");
    navigate(`/game/play/${gameData.game_id}`);
  };

  return (
    <StyledButton
      styleType={"primary pb-5"}
      name={"START"}
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
