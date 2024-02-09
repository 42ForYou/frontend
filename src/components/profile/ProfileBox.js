import React from "react";
import { MyProfileInfo, UserProfileInfo } from "./ProfileInfo";
import ProfileHistory from "./ProfileHistory";
import ProfileSecurity from "./ProfileSecurity";

const MyProfileBox = ({ profileData }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <MyProfileInfo initProfileInfo={profileData} />
      </div>
      <div className="row">
        <ProfileHistory profileInfoData={profileData} />
      </div>
      <div className="row">{<ProfileSecurity initIs2FA={profileData.two_factor_auth} />}</div>
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
  return <>{isMine ? <MyProfileBox profileData={profileData} /> : <UserProfileBox profileData={profileData} />}</>;
};

export default ProfileBox;
