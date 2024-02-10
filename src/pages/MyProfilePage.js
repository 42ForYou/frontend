import React, { useContext, useEffect, useState } from "react";
import withAuthProtection from "../components/common/withAuthProtection";
import ProfileBox from "../components/profile/ProfileBox";
import LoadingPage from "./LoadingPage";
import AuthContext from "../context/AuthContext";
import useFetchProfileData from "../hooks/useFetchProfileData";
import ContentContainer from "../components/layout/ContentContainer";

const MyProfilePage = () => {
  const { loggedInUser } = useContext(AuthContext);
  const { profileData, isLoading } = useFetchProfileData(loggedInUser.intra_id);

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
