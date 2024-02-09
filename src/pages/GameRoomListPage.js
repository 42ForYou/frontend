import React from "react";
import PageContainer from "../components/layout/PageContainer";
import withAuthProtection from "../components/common/withAuthProtection";
import RoomListBox from "../components/room/RoomListBox";

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
