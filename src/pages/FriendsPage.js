import React from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../common/withAuthProtection";
import FriendsListBox from "../components/FriendsListBox";

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
