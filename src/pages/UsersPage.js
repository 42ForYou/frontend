import React from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../common/withAuthProtection";

const UsersPage = () => {
  return (
    <div className="UsersPage">
      <PageContainer hasNavigationBar={true}>This is UsersPage</PageContainer>
    </div>
  );
};

export default withAuthProtection(UsersPage);
