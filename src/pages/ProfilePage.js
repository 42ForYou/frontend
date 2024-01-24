import React, { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import withAuthProtection from "../withAuthProtection";
import ProfileBox from "../components/ProfileBox";
import { useLocation } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const dummyProfileDataMy = {
  id: "yeonhkim",
  nickname: "pengdori",
  email: "doridori@uknown.com",
  avatar: "https://pbs.twimg.com/media/Ez57aWWUYAUm8jS.jpg",
  is2FA: true,
};

const dummyProfileDataUser1 = {
  nickname: "jgo",
  avatar: "https://cdn.britannica.com/95/156695-131-FF89C9FA/oak-tree.jpg?w=200&h=200&c=crop",
};

const dummyProfileDataUser2 = {
  id: "blahblah",
  nickname: "pikachu",
  email: "pikapika@uknown.com",
  avatar: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
  is2FA: true,
};

// 마이프로필 URL: /profile
// 유저프로필 URL: /profile/users/:user_id
const ProfilePage = () => {
  const location = useLocation();
  const isMine = location.pathname === "/profile";

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (isMine) {
      setProfileData(dummyProfileDataMy);
    } else {
      // setProfileData(dummyProfileDataUser1); // 필요한 데이터만 갖고있음
      setProfileData(dummyProfileDataUser2); // 전체 데이터 갖고있음
    }
  }, [isMine, location.pathname]);

  return (
    <div className="ProfilePage">
      <PageContainer hasNavigationBar={true}>
        {profileData === null ? (
          <LoadingPage hasNavigationBar={true} />
        ) : (
          <ProfileBox isMine={isMine} profileData={profileData} />
        )}
      </PageContainer>
    </div>
  );
};

export default withAuthProtection(ProfilePage);
