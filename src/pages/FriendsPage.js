import React from "react";
import FriendsListBox from "../components/friend/FriendsListBox";
import ContentContainer from "../components/layout/ContentContainer";
import ContentTitle from "../components/layout/ContentTitle";
import MainContent from "../components/layout/MainContent";

const FriendsPage = () => {
  return (
    <div className="FriendsPage">
      <ContentContainer>
        <ContentTitle title="Friends" />
        <MainContent>
          <FriendsListBox />
        </MainContent>
      </ContentContainer>
    </div>
  );
};

export default FriendsPage;
