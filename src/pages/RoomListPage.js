import React from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../withAuthProtection";
import RoomListBox from "../components/RoomListBox";
import SearchBar from "../components/SearchBar";

const RoomListPage = () => {
  return (
    <div className="RoomListPage">
      <PageContainer hasNavigationBar={true}>
        <SearchBar />
        <RoomListBox totalPages={42} />
      </PageContainer>
    </div>
  );
};

export default withAuthProtection(RoomListPage);
