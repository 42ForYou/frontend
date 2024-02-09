import React from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../common/withAuthProtection";
import FriendsListBox from "../components/FriendsListBox";

const FriendsListPage = () => {
  return (
    <div className="FriendsListPage">
      <PageContainer hasNavigationBar={true}>
        <FriendsListBox />
      </PageContainer>
    </div>
  );
};

export default withAuthProtection(FriendsListPage);
