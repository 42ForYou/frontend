import React from "react";
import ProfileHistory from "./ProfileHistory";
import ProfileSecurity from "./ProfileSecurity";
import { MyProfileInfo, UserProfileInfo } from "./ProfileInfo";
import ProfileFriendStatus from "./ProfileFriendStatus";

const ProfileBox = ({ isMine, profileData }) => {
  return (
    <div className="ProfileBox d-flex-col flex-grow-1">
      {isMine ? <MyProfileInfo initProfileData={profileData} /> : <UserProfileInfo profileData={profileData} />}
      {!isMine && <ProfileFriendStatus initFriendStatus={profileData.friend_status} nickname={profileData.nickname} />}
      <ProfileHistory profileData={profileData} />
      {isMine && (
        <div>
          <ProfileSecurity initIs2FA={profileData.two_factor_auth} />
        </div>
      )}
    </div>
  );
};

export default ProfileBox;
