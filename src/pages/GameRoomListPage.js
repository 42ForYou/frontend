import React from "react";
import RoomListBox from "../components/room/RoomListBox";
import ContentContainer from "../components/layout/ContentContainer";
import ContentTitle from "../components/layout/ContentTitle";
import ContentBody from "../components/layout/ContentBody";

const GameRoomListPage = () => {
  return (
    <div className="GameRoomListPage">
      <ContentContainer>
        <ContentTitle title="Game Rooms" />
        <ContentBody>
          <RoomListBox />
        </ContentBody>
      </ContentContainer>
    </div>
  );
};

export default GameRoomListPage;
