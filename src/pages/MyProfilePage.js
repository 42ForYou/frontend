import React, { useContext, useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../common/withAuthProtection";
import ProfileBox from "../components/ProfileBox";
import LoadingPage from "./LoadingPage";
import AuthContext from "../context/AuthContext";

// 마이프로필 URL: /profile
const MyProfilePage = () => {
  const { loggedInUser } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    setProfileData(loggedInUser);
  }, [loggedInUser]);

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
