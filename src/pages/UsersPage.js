import React from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../common/withAuthProtection";
import UserListBox from "../components/UserListBox";

const UsersPage = () => {
  return (
    <div className="UsersPage">
      <PageContainer hasNavigationBar={true}>
        <UserListBox />
      </PageContainer>
    </div>
  );
};

export default withAuthProtection(UsersPage);
