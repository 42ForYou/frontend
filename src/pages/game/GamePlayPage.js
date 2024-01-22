import React from "react";
import PageContainer from "../../components/PageContainer";

// todo: 해당 게임에 참가하지 않는 유저가 접속 시도시 리다이렉팅
const GamePlayPage = () => {
  return (
    <div className="GamePlayPage">
      <PageContainer hasNavigationBar={true}>
        This is GamePlayPage
      </PageContainer>
    </div>
  );
};

export default GamePlayPage;
