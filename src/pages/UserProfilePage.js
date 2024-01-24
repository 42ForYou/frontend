import React, { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../withAuthProtection";
import ProfileBox from "../components/ProfileBox";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const fakeFetch = (userId) => {
  const dummyDataArray = [
    {
      id: "yeonhkim",
      nickname: "pengdori",
      email: "doridori@uknown.com",
      avatar: "https://pbs.twimg.com/media/Ez57aWWUYAUm8jS.jpg",
      is2FA: true,
    },
    {
      id: "jgo",
      nickname: "JGO",
      avatar: "https://cdn.britannica.com/95/156695-131-FF89C9FA/oak-tree.jpg?w=200&h=200&c=crop",
    },
    {
      id: "pikachu",
      nickname: "Chu",
      email: "pikapika@uknown.com",
      avatar: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
      is2FA: true,
    },
  ];

  const dummyData = dummyDataArray.find((data) => data.id === userId) || null;
  if (dummyData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ok: true,
          json: () => Promise.resolve(dummyData),
        });
      }, 100);
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("API 요청이 실패했습니다."));
      }, 100);
    });
  }
};

// 유저프로필 URL: /profile/users/:user_id
const UserProfilePage = () => {
  const location = useLocation();
  const userId = location.pathname.split("/").pop(); // useParams를 사용할 수 없어 대체제로 사용
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [isInvalidUserId, setIsInvalidUserId] = useState(false);

  // 백엔드 서버에 요청을 보내 유효한 user_id인지 판별
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fakeFetch(userId);
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        }
      } catch (isInvalidUserId) {
        setIsInvalidUserId(true);
        alert("유효하지 않은 유저 프로필 페이지입니다.");
        navigate(-1);
      }
    };
    fetchData();
  }, [userId, navigate]);

  if (!profileData) return <LoadingPage hasNavigationBar={true} />;

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
