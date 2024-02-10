import React from "react";
import withAuthProtection from "../components/common/withAuthProtection";
import FriendsListBox from "../components/friend/FriendsListBox";
import ContentContainer from "../components/layout/ContentContainer";

const FriendsPage = () => {
  return (
    <div className="FriendsPage">
      <ContentContainer>
        <h1>Friends</h1>
        <FriendsListBox />
      </ContentContainer>
    </div>
  );
};

export default FriendsPage;
