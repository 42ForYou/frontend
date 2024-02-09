import React from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../common/withAuthProtection";
import UserListBox from "../components/UserListBox";

const UserSearchPage = () => {
  return (
    <div className="UserSearchPage">
      <PageContainer hasNavigationBar={true}>
        <UserListBox />
      </PageContainer>
    </div>
  );
};

export default withAuthProtection(UserSearchPage);
