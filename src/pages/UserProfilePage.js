import React, { useEffect } from "react";
import withAuthProtection from "../components/common/withAuthProtection";
import ProfileBox from "../components/profile/ProfileBox";
import { useParams, useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import useFetchProfileData from "../hooks/useFetchProfileData";
import ContentContainer from "../components/layout/ContentContainer";

const UserProfilePage = () => {
  const { intra_id } = useParams();
  const { profileData, isLoading, error } = useFetchProfileData(intra_id);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      alert("유효하지 않은 유저 프로필 페이지입니다.");
      navigate(-1);
    }
  }, [error, navigate]);

  return (
    <div className="UserProfilePage">
      <ContentContainer>
        <h1>User Profile</h1>
        {isLoading ? <LoadingPage /> : <ProfileBox isMine={false} profileData={profileData} />}
      </ContentContainer>
    </div>
  );
};

export default withAuthProtection(UserProfilePage);
