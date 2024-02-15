import React from "react";
import ContentContainer from "../components/layout/ContentContainer";
import GameOngoing from "../components/game/GameOngoing";

// todo: 해당 게임에 참가하지 않는 유저가 접속 시도시 리다이렉팅
// todo: 현 상태에 따라 대진표 혹은 게임 플레이 화면을 보여줌
const GamePlayPage = () => {
  return (
    <div className="GamePlayPage">
      <GameOngoing />
    </div>
  );
};

export default GamePlayPage;
