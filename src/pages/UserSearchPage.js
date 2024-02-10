import React from "react";
import UserListBox from "../components/user/UserListBox";
import ContentContainer from "../components/layout/ContentContainer";
import ContentTitle from "../components/layout/ContentTitle";
import MainContent from "../components/layout/MainContent";

const UserSearchPage = () => {
  return (
    <div className="UserSearchPage">
      <ContentContainer>
        <ContentTitle title="Users" />
        <MainContent>
          <UserListBox />
        </MainContent>
      </ContentContainer>
    </div>
  );
};

export default UserSearchPage;
