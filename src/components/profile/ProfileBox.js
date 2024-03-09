import React from "react";
import ProfileMatchHistory from "./ProfileMatchHistory";
import ProfileSecurity from "./ProfileSecurity";
import { MyProfileInfo, UserProfileInfo } from "./ProfileInfo";
import ProfileFriendStatus from "./ProfileFriendStatus";
import ProfileStats from "./ProfileStats";

const ProfileBox = ({ isMine, profileData, statsData, matchHistoryData }) => {
  return (
    <div className="ProfileBox d-flex-col flex-grow-1">
      {isMine ? <MyProfileInfo initProfileData={profileData} /> : <UserProfileInfo profileData={profileData} />}
      {!isMine && <ProfileFriendStatus initFriendStatus={profileData.friend_status} nickname={profileData.nickname} />}
      <div className="ProfileTrace d-flex-col flex-grow-1 ">
        <ProfileStats statsData={statsData} />
        <ProfileMatchHistory matchHistoryData={matchHistoryData} />
      </div>
      {isMine && (
        <div>
          <ProfileSecurity initIs2FA={profileData.two_factor_auth} />
        </div>
      )}
    </div>
  );
};

export default ProfileBox;
