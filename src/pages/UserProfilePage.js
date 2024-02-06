import React, { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../common/withAuthProtection";
import ProfileBox from "../components/ProfileBox";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { get } from "../common/apiBase";
import { API_ENDPOINTS } from "../common/apiEndpoints";

// 유저프로필 URL: /profile/users/:user_id
const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const resData = await get(API_ENDPOINTS.USER_PROFILE(userId));
        setProfileData(resData.data.user);
      } catch (error) {
        alert("유효하지 않은 유저 프로필 페이지입니다.");
        navigate(-1);
      }
    };
    fetchProfileData();
  }, [userId, navigate]);

  return (
    <div className="UserProfilePage">
      {profileData === null ? (
        <LoadingPage hasNavigationBar={true} />
      ) : (
        <PageContainer hasNavigationBar={true}>
          <ProfileBox isMine={false} profileData={profileData} />
        </PageContainer>
      )}
    </div>
  );
};

export default withAuthProtection(UserProfilePage);
