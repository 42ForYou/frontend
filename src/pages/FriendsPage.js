import React from "react";
import PageContainer from "../components/layout/PageContainer";
import withAuthProtection from "../components/common/withAuthProtection";
import FriendsListBox from "../components/friend/FriendsListBox";

const FriendsPage = () => {
  return (
    <div className="FriendsPage">
      <PageContainer hasNavigationBar={true}>
        <FriendsListBox />
      </PageContainer>
    </div>
  );
};

export default withAuthProtection(FriendsPage);
