import React from "react";
import StyledButton from "../common/StyledButton";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../context/GameContext";
import { useSocket } from "../../context/SocketContext";

const ExitRoomButton = () => {
  const navigate = useNavigate();
  const { roomData, myPlayerData } = useGame();
  const namespace = `/game/room/${roomData?.id}`;
  const { sockets } = useSocket();

  const handleNormalExit = async () => {
    if (!window.confirm("게임 대기 방을 나가시겠습니까?")) return;
    sockets[namespace].emitWithTime("exited", { my_player_id: myPlayerData.id });
    navigate("/game/list");
    console.log("방 나가기 성공");
  };

  return (
    <StyledButton
      styleType={"danger pb-5  ms-3 "}
      name={"EXIT"}
      onClick={handleNormalExit}
      overrideStyle={{
        width: "120px",
        height: "50px",
        fontSize: "30px",
        padding: "-10px 24px",
      }}
    />
  );
};

export default ExitRoomButton;
