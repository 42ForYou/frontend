import React from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../withAuthProtection";

// todo: 더미 룸 생성
const RoomListPage = () => {
  return (
    <div className="RoomListPage">
      <PageContainer hasNavigationBar={true}>This is RoomListPage</PageContainer>
    </div>
  );
};

export default withAuthProtection(RoomListPage);
