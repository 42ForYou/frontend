import React, { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../withAuthProtection";
import ProfileBox from "../components/ProfileBox";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const dummyProfileData = {
  id: "yeonhkim",
  nickname: "pengdori",
  email: "doridori@uknown.com",
  avatar: "https://pbs.twimg.com/media/Ez57aWWUYAUm8jS.jpg",
  is2FA: true,
};

// 마이프로필 URL: /profile
const MyProfilePage = () => {
  const location = useLocation();
  const [profileData, setProfileData] = useState(dummyProfileData);

  return (
    <div className="MyProfilePage">
      <PageContainer hasNavigationBar={true}>
        {profileData === null ? (
          <LoadingPage hasNavigationBar={true} />
        ) : (
          <ProfileBox isMine={true} profileData={profileData} />
        )}
      </PageContainer>
    </div>
  );
};

export default withAuthProtection(MyProfilePage);
