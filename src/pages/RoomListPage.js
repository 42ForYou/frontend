import React from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../common/withAuthProtection";
import RoomListBox from "../components/RoomListBox";

const RoomListPage = () => {
  return (
    <div className="RoomListPage">
      <PageContainer hasNavigationBar={true}>
        <RoomListBox />
      </PageContainer>
    </div>
  );
};

export default withAuthProtection(RoomListPage);
