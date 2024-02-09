import React, { useState } from "react";
import { MyProfileInfo, UserProfileInfo } from "./ProfileInfo";
import ProfileHistory from "./ProfileHistory";
import ProfileSecurity from "./ProfileSecurity";

const MyProfileBox = ({ profileDataInitial }) => {
  const [profileData, setProfileData] = useState(profileDataInitial);

  const patchUserProfile = (path, value) => {
    setProfileData((profileData) => updateProperty(profileData, path, value));
    // 함수형 업데이트: 비동기적으로 수행되는 setState 함수가 이전 state값을 기반으로 동작하도록 보장
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <MyProfileInfo profileInfoData={profileData} />
      </div>
      <div className="row">
        <ProfileHistory profileInfoData={profileData} />
      </div>
      <div className="row">
        {<ProfileSecurity is2FA={profileData.two_factor_auth} patchUserProfile={patchUserProfile} />}
      </div>
    </div>
  );
};

// todo: 친구 상태에 따라 UI 조정
const UserProfileBox = ({ profileData }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <UserProfileInfo profileInfoData={profileData} />
      </div>
      <div className="row">
        <ProfileHistory profileInfoData={profileData} />
      </div>
    </div>
  );
};

const ProfileBox = ({ isMine, profileData }) => {
  return (
    <>{isMine ? <MyProfileBox profileDataInitial={profileData} /> : <UserProfileBox profileData={profileData} />}</>
  );
};

export default ProfileBox;
