import React from "react";
import withAuthProtection from "../components/common/withAuthProtection";
import RoomListBox from "../components/room/RoomListBox";
import ContentContainer from "../components/layout/ContentContainer";

const GameRoomListPage = () => {
  return (
    <div className="GameRoomListPage">
      <ContentContainer>
        <h1>Game Rooms</h1>
        <RoomListBox />
      </ContentContainer>
    </div>
  );
};

export default withAuthProtection(GameRoomListPage);
