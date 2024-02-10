import React, { useEffect } from "react";
import ProfileBox from "../components/profile/ProfileBox";
import { useParams, useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import useFetchProfileData from "../hooks/useFetchProfileData";
import ContentContainer from "../components/layout/ContentContainer";
import ContentTitle from "../components/layout/ContentTitle";
import MainContent from "../components/layout/MainContent";

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
        <ContentTitle title="User Profile" />
        <MainContent>
          {isLoading ? <LoadingPage /> : <ProfileBox isMine={false} profileData={profileData} />}
        </MainContent>
      </ContentContainer>
    </div>
  );
};

export default UserProfilePage;
