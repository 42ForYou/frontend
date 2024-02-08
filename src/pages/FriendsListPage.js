import React from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../common/withAuthProtection";
import FriendsListBox from "../components/FriendsListBox";
import SearchBar from "../components/SearchBar";

const FriendsListPage = () => {
  return (
    <div className="FriendsListPage">
      <PageContainer hasNavigationBar={true}>
        <SearchBar />
        <FriendsListBox />
      </PageContainer>
    </div>
  );
};

export default withAuthProtection(FriendsListPage);
