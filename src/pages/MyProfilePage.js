import React, { useContext, useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../withAuthProtection";
import ProfileBox from "../components/ProfileBox";
import LoadingPage from "./LoadingPage";
import AuthContext from "../AuthContext";

const dummyProfileData = {
  id: "yeonhkim",
  nickname: "pengdori",
  email: "doridori@uknown.com",
  avatar: "https://pbs.twimg.com/media/Ez57aWWUYAUm8jS.jpg",
  is2FA: true,
};

// 마이프로필 URL: /profile
const MyProfilePage = () => {
  const { userProfile } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    setProfileData(userProfile);
  }, [userProfile]);

  return (
    <div className="MyProfilePage">
      {profileData === null ? (
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
