import React, { useContext, useEffect, useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import withAuthProtection from "../components/common/withAuthProtection";
import ProfileBox from "../components/profile/ProfileBox";
import LoadingPage from "./LoadingPage";
import AuthContext from "../context/AuthContext";
import useFetchProfileData from "../hooks/useFetchProfileData";

const MyProfilePage = () => {
  const { loggedInUser } = useContext(AuthContext);
  const { profileData, isLoading } = useFetchProfileData(loggedInUser.intra_id);

  return (
    <div className="MyProfilePage">
      {isLoading ? (
        <LoadingPage hasNavigationBar={true} />
      ) : (
        <PageContainer hasNavigationBar={true}>
          <ProfileBox isMine={true} profileData={profileData} />
        </PageContainer>
      )}
    </div>
  );
};

export default withAuthProtection(MyProfilePage);
