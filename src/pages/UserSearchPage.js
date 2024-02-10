import React from "react";
import UserListBox from "../components/user/UserListBox";
import ContentContainer from "../components/layout/ContentContainer";

const UserSearchPage = () => {
  return (
    <div className="UserSearchPage">
      <ContentContainer>
        <h1>Users</h1>
        <UserListBox />
      </ContentContainer>
    </div>
  );
};

export default UserSearchPage;
