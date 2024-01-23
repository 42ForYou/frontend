import React from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../withAuthProtection";

const ProfilePage = () => {
  return (
    <div className="ProfilePage">
      <PageContainer hasNavigationBar={true}>This is ProfilePage</PageContainer>
    </div>
  );
};

export default withAuthProtection(ProfilePage);
