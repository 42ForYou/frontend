import React from "react";
import StyledButton from "../common/StyledButton";

const StartGameButton = ({ isActive }) => {
  const handleStartGame = () => {
    alert("게임 스타트 (미구현)");
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
