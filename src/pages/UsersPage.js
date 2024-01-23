import React from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../withAuthProtection";

const UsersPage = () => {
  return (
    <div className="UsersPage">
      <PageContainer hasNavigationBar={true}>This is UsersPage</PageContainer>
    </div>
  );
};

export default withAuthProtection(UsersPage);
