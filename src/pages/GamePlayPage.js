import React from "react";
import ContentContainer from "../components/layout/ContentContainer";
import ContentBody from "../components/layout/ContentBody";

// todo: 해당 게임에 참가하지 않는 유저가 접속 시도시 리다이렉팅
const GamePlayPage = () => {
  return (
    <div className="GamePlayPage">
      <ContentContainer>
        <ContentBody>GamePlayPage</ContentBody>
      </ContentContainer>
    </div>
  );
};

export default GamePlayPage;
