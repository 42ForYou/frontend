import React from "react";
import PageContainer from "../components/layout/PageContainer";
import withAuthProtection from "../components/common/withAuthProtection";
import UserListBox from "../components/user/UserListBox";

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
