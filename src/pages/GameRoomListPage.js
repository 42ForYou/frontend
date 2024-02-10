import React from "react";
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

export default GameRoomListPage;
