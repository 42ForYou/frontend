import React from "react";
import ProfileBox from "../components/profile/ProfileBox";
import LoadingPage from "./LoadingPage";
import { useAuth } from "../context/AuthContext";
import useFetchProfileData from "../hooks/useFetchProfileData";
import ContentContainer from "../components/layout/ContentContainer";
import ContentTitle from "../components/layout/ContentTitle";
import ContentBody from "../components/layout/ContentBody";

const MyProfilePage = () => {
  const { loggedIn } = useAuth();
  const { profileData, isLoading } = useFetchProfileData(loggedIn?.intra_id);

  return (
    <div className="MyProfilePage">
      <ContentContainer>
        <ContentTitle title="My Profile" />
        <ContentBody>
          {isLoading ? <LoadingPage /> : <ProfileBox isMine={true} profileData={profileData} />}
        </ContentBody>
      </ContentContainer>
    </div>
  );
};

export default MyProfilePage;
