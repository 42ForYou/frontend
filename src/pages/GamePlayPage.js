import React from "react";
import ContentContainer from "../components/layout/ContentContainer";
import MainContent from "../components/layout/MainContent";

// todo: 해당 게임에 참가하지 않는 유저가 접속 시도시 리다이렉팅
const GamePlayPage = () => {
  return (
    <div className="GamePlayPage">
      <ContentContainer>
        <MainContent>GamePlayPage</MainContent>
      </ContentContainer>
    </div>
  );
};

export default GamePlayPage;
