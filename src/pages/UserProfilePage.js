import React, { useEffect, useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import withAuthProtection from "../components/common/withAuthProtection";
import ProfileBox from "../components/profile/ProfileBox";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { get } from "../common/apiBase";
import { API_ENDPOINTS } from "../common/apiEndpoints";

const UserProfilePage = () => {
  const { intra_id } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProfileData = async () => {
      setIsLoading(true);
      try {
        const resData = await get(API_ENDPOINTS.USER_PROFILE(intra_id));
        setProfileData(resData.data.user);
        setIsLoading(false);
      } catch (error) {
        alert("유효하지 않은 유저 프로필 페이지입니다.");
        navigate(-1);
      }
    };
    getProfileData();
  }, [intra_id, navigate]);

  return (
    <div className="UserProfilePage">
      {isLoading ? (
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
