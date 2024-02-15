import React from "react";
import StyledButton from "../common/StyledButton";
import { useNavigate } from "react-router-dom";

const ExitRoomButton = () => {
  const navigate = useNavigate();
  const handleExitRoom = () => {
    if (!window.confirm("게임 대기 방을 나가시겠습니까?")) return;
    navigate("/game/list");
  };

  return (
    <StyledButton
      styleType={"danger pb-5  ms-3 "}
      name={"EXIT"}
      onClick={handleExitRoom}
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
