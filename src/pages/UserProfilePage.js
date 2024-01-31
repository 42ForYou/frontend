import React, { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../common/withAuthProtection";
import ProfileBox from "../components/ProfileBox";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { get } from "../common/apiBase";
import { API_ENDPOINTS } from "../common/apiEndPoints";

// 유저프로필 URL: /profile/users/:user_id
const UserProfilePage = () => {
  const location = useLocation();
  const userId = location.pathname.split("/").pop(); // useParams를 사용할 수 없어 대체제로 사용
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const getDataAndSet = async () => {
      try {
        // const resData = await get(API_ENDPOINTS.USER_PROFILE(userId));
        const resData = await get(API_ENDPOINTS.USER_PROFILE("sanghwal"));
        console.log(resData);
        if (resData) {
          setProfileData(resData.data);
          console.log("프로필 데이터 세팅 완료");
        }
      } catch (error) {
        alert("유효하지 않은 유저 프로필 페이지입니다.");
        navigate(-1);
      }
    };
    getDataAndSet();
  }, [userId, navigate]);

  return (
    <div className="UserProfilePage">
      <PageContainer hasNavigationBar={true}>
        {profileData === null ? (
          <LoadingPage hasNavigationBar={true} />
        ) : (
          <ProfileBox isMine={false} profileData={profileData} />
        )}
      </PageContainer>
    </div>
  );
};

export default withAuthProtection(UserProfilePage);
