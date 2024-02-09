import React from "react";
import ProfileHistory from "./ProfileHistory";
import ProfileSecurity from "./ProfileSecurity";
import { MyProfileInfo, UserProfileInfo } from "./ProfileInfo";

const ProfileBox = ({ isMine, profileData }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        {isMine ? <MyProfileInfo initProfileData={profileData} /> : <UserProfileInfo profileData={profileData} />}
      </div>
      <div className="row">
        <ProfileHistory profileData={profileData} />
      </div>
      {isMine && (
        <div className="row">
          <ProfileSecurity initIs2FA={profileData.two_factor_auth} />
        </div>
      )}
    </div>
  );
};

export default ProfileBox;
