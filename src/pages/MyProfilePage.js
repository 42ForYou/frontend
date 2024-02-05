import React, { useContext, useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../common/withAuthProtection";
import ProfileBox from "../components/ProfileBox";
import LoadingPage from "./LoadingPage";
import AuthContext from "../context/AuthContext";

import { get } from "../common/apiBase";
import { API_ENDPOINTS } from "../common/apiEndPoints";

// 마이프로필 URL: /profile
const MyProfilePage = () => {
  const { loggedInUser } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);

  const fetchProfileData = async () => {
    try {
      const resData = await get(API_ENDPOINTS.USER_PROFILE(loggedInUser.intra_id));
      setProfileData(resData.data.user);
    } catch (error) {
      console.error("프로필 데이터를 가져오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    fetchProfileData(); // 컴포넌트 마운트 시 동작
  }, []);

  return (
    <div className="MyProfilePage">
      {profileData === null ? (
        <LoadingPage hasNavigationBar={true} />
      ) : (
        <PageContainer hasNavigationBar={true}>
          <ProfileBox isMine={true} profileData={profileData} fetchProfileData={fetchProfileData} />
        </PageContainer>
      )}
    </div>
  );
};

export default withAuthProtection(MyProfilePage);
