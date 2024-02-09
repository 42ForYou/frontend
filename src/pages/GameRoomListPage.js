import React from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../common/withAuthProtection";
import RoomListBox from "../components/RoomListBox";
import SearchBar from "../components/SearchBar";

const GameRoomListPage = () => {
  return (
    <div className="GameRoomListPage">
      <PageContainer hasNavigationBar={true}>
        <RoomListBox />
      </PageContainer>
    </div>
  );
};

export default withAuthProtection(GameRoomListPage);
