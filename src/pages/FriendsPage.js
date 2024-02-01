import React from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../common/withAuthProtection";

const FriendsPage = () => {
  return (
    <div className="FriendsPage">
      <PageContainer hasNavigationBar={true}>This is FriendsPage</PageContainer>
    </div>
  );
};

export default withAuthProtection(FriendsPage);
