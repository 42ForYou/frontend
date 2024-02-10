import React from "react";
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
