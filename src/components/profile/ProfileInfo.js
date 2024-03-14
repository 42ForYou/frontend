import React, { useState } from "react";
import usePatchProfile from "../../hooks/usePatchProfile";
import { checkRegex } from "../../utils/checkRegex";
import ProfileAvatar from "./ProfileAvatar";
import ProfileTextLine from "./ProfileTextLine";
import { useAuth } from "../../context/AuthContext";
import EditProfileButtons from "./EditProfileButtons";
import { useLayout } from "../../context/LayoutContext";

export const STATUS = {
  PROFILE: 0,
  NICKNAME: 1,
  EMAIL: 2,
};

const InfoDisplay = ({ profileData, isEditing, onChangeNickname, onChangeEmail, setEditStatus }) => {
  const { isWide } = useLayout();

  const getFriendStatusString = (status) => {
    switch (status) {
      case "None":
        return "친구 아님";
      case "pending":
        return "친구 신청 중";
      case "friend":
        return "친구";
      default:
        return "알 수 없음";
    }
  };

  if (isWide) {
    return (
      <div className="d-flex-col">
        <ProfileAvatar
          avatar={profileData.avatar}
          nickname={profileData.nickname}
          isEditing={isEditing}
          setEditStatus={setEditStatus}
        />
        <div className="d-flex justify-content-between align-items-center">
          <div className="flex-grow-1">
            {profileData.intraId && <ProfileTextLine label="Intra ID" value={profileData.intraId} />}
            <ProfileTextLine
              label="Nickname"
              value={profileData.nickname}
              isEditing={isEditing}
              onChange={onChangeNickname}
            />
            {(profileData.email || isEditing) && (
              <ProfileTextLine label="Email" value={profileData.email} isEditing={isEditing} onChange={onChangeEmail} />
            )}
            {profileData.friend_status && (
              <ProfileTextLine label="Friend Status" value={getFriendStatusString(profileData.friend_status)} />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="flex-grow-1">
        {profileData.intraId && <ProfileTextLine label="Intra ID" value={profileData.intraId} />}
        <ProfileTextLine
          label="Nickname"
          value={profileData.nickname}
          isEditing={isEditing}
          onChange={onChangeNickname}
        />
        {(profileData.email || isEditing) && (
          <ProfileTextLine label="Email" value={profileData.email} isEditing={isEditing} onChange={onChangeEmail} />
        )}
        {profileData.friend_status && (
          <ProfileTextLine label="Friend Status" value={getFriendStatusString(profileData.friend_status)} />
        )}
      </div>
      <ProfileAvatar
        avatar={profileData.avatar}
        nickname={profileData.nickname}
        isEditing={isEditing}
        setEditStatus={setEditStatus}
      />
    </div>
  );
};

export const MyProfileInfo = ({ initProfileData }) => {
  const { nickname: initNickname, email: initEmail } = initProfileData;
  const { setLoggedIn } = useAuth();
  const { patchProfileInfo } = usePatchProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editStatus, setEditStatus] = useState(null);
  const [nickname, setNickname] = useState(initNickname);
  const [email, setEmail] = useState(initEmail);

  const validateProfile = (nickname, email) => {
    const validations = {
      nickname: checkRegex(nickname, /^[a-zA-Z0-9가-힣]{2,16}$/),
      email: checkRegex(email, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
    };

    const validateMsg = [
      validations.nickname
        ? ""
        : "유효하지 않은 형식의 닉네임입니다. (한글, 영어, 숫자로 이루어진 2~16자의 문자열이어야 함)",
      validations.email ? "" : "유효하지 않은 형식의 이메일입니다.",
    ];

    return { isValid: validations.nickname && validations.email, validateMsg };
  };

  const handleEntryEditClick = () => {
    setIsEditing(true);
    setEditStatus(null);
  };

  const handleExitEditClick = () => {
    setIsEditing(false);
    setEditStatus(null);
    setNickname(initNickname);
    setEmail(initEmail);
  };

  const handleSubmitEditClick = async () => {
    const isChangeExist = !(nickname === initNickname && email === initEmail);
    const { isValid, validateMsg } = validateProfile(nickname, email);
    const editStatusMsg = [...validateMsg, ""];

    if (!isChangeExist) return setIsEditing(false);
    else if (isValid) {
      const result = await patchProfileInfo({ nickname, email }, (updatedProfile) => {
        console.log("업데이트 결과: ", updatedProfile);
        setLoggedIn(updatedProfile);
      });

      if (result.success) {
        setIsEditing(false);
        editStatusMsg[STATUS.PROFILE] = "프로필 정보가 성공적으로 업데이트 되었습니다.";
      } else {
        editStatusMsg[STATUS.PROFILE] = "프로필 정보 업데이트가 실패하였습니다.";
        // 409: Conflict
        if (result.errcode === 409) {
          if ("nickname" in result.errmsg) editStatusMsg[STATUS.NICKNAME] = "이미 사용 중인 닉네임입니다.";
          if ("email" in result.errmsg) editStatusMsg[STATUS.EMAIL] = "이미 사용 중인 이메일입니다.";
        }
      }
    }
    setEditStatus(editStatusMsg);
  };

  return (
    <div className="ProfileInfo">
      <InfoDisplay
        profileData={{ ...initProfileData, nickname, email }}
        isEditing={isEditing}
        onChangeNickname={setNickname}
        onChangeEmail={setEmail}
        setEditStatus={setEditStatus}
      />
      <EditProfileButtons
        isEditing={isEditing}
        onEntryClick={handleEntryEditClick}
        onExitClick={handleExitEditClick}
        onSubmitClick={handleSubmitEditClick}
      />
      {editStatus && (
        <div className="text-center">
          {editStatus.map((status, i) => (
            <div key={i}>{status}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export const UserProfileInfo = ({ profileData }) => (
  <div className="ProfileInfo">
    <div className="col"></div>
    <div className="col">
      <InfoDisplay profileData={profileData} />
    </div>
  </div>
);

const ProfileInfo = ({ isMine, profileData }) => {
  return isMine ? <MyProfileInfo initProfileData={profileData} /> : <UserProfileInfo profileData={profileData} />;
};

export default ProfileInfo;
