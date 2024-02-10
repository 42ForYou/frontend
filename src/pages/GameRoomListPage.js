import React from "react";
import RoomListBox from "../components/room/RoomListBox";
import ContentContainer from "../components/layout/ContentContainer";
import ContentTitle from "../components/layout/ContentTitle";
import MainContent from "../components/layout/MainContent";

const GameRoomListPage = () => {
  return (
    <div className="GameRoomListPage">
      <ContentContainer>
        <ContentTitle title="Game Rooms" />
        <MainContent>
          <RoomListBox />
        </MainContent>
      </ContentContainer>
    </div>
  );
};

export default GameRoomListPage;
