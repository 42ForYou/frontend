import React, { useContext, useEffect, useState } from "react";
import withAuthProtection from "../components/common/withAuthProtection";
import ProfileBox from "../components/profile/ProfileBox";
import LoadingPage from "./LoadingPage";
import AuthContext, { useAuth } from "../context/AuthContext";
import useFetchProfileData from "../hooks/useFetchProfileData";
import ContentContainer from "../components/layout/ContentContainer";

const MyProfilePage = () => {
  const { loggedIn } = useAuth();
  const { profileData, isLoading } = useFetchProfileData(loggedIn.intra_id);

  return (
    <div className="MyProfilePage">
      <ContentContainer>
        <h1>My Profile</h1>
        {isLoading ? <LoadingPage /> : <ProfileBox isMine={true} profileData={profileData} />}
      </ContentContainer>
    </div>
  );
};

export default withAuthProtection(MyProfilePage);
