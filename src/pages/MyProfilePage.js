import React, { useContext, useEffect, useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import withAuthProtection from "../components/common/withAuthProtection";
import ProfileBox from "../components/profile/ProfileBox";
import LoadingPage from "./LoadingPage";
import AuthContext from "../context/AuthContext";
import { get } from "../common/apiBase";
import { API_ENDPOINTS } from "../common/apiEndpoints";

const MyProfilePage = () => {
  // todo: Auth 훅 사용
  const { loggedInUser } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);

  const fetchProfileData = async () => {
    try {
      console.log("로그인유저: ", loggedInUser);
      const resData = await get(API_ENDPOINTS.USER_PROFILE(loggedInUser.intra_id));
      setProfileData(resData.data.user);
    } catch (error) {
      console.error("프로필 데이터를 가져오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

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
