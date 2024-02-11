import React, { useState } from "react";
import usePatchProfile from "../../hooks/usePatchProfile";
import { checkRegex } from "../../utils/checkRegex";
import StyledButton from "../common/StyledButton";
import ProfileAvatar from "./ProfileAvatar";
import ProfileTextLine from "./ProfileTextLine";

export const STATUS = {
  PROFILE: 0,
  NICKNAME: 1,
  EMAIL: 2,
};

const EditProfileButtons = ({ isEditing, onExitClick, onSubmitClick, onEntryClick }) => {
  return (
    <div className="text-center mb-2">
      {isEditing ? (
        <>
          <StyledButton styleType={"primary"} name={"확인"} onClick={onSubmitClick} />
          <StyledButton styleType={"danger ms-2"} name={"취소"} onClick={onExitClick} />
        </>
      ) : (
        <StyledButton styleType={"primary"} name={"정보 수정하기"} onClick={onEntryClick} />
      )}
    </div>
  );
};

const InfoDisplay = ({ profileData, isEditing, onChangeNickname, onChangeEmail, setEditStatus }) => {
  return (
    <div>
      <ProfileAvatar
        avatar={profileData.avatar}
        nickname={profileData.nickname}
        isEditing={isEditing}
        setEditStatus={setEditStatus}
      />
      <div>
        {profileData.intraId && <ProfileTextLine label="Intra ID" value={profileData.intraId} />}
        <ProfileTextLine
          label="Nickname"
          value={profileData.nickname}
          isEditing={isEditing}
          onChange={onChangeNickname}
        />
        {profileData.email && (
          <ProfileTextLine label="Email" value={profileData.email} isEditing={isEditing} onChange={onChangeEmail} />
        )}
      </div>
    </div>
  );
};

export const MyProfileInfo = ({ initProfileData }) => {
  const { nickname: initNickname, email: initEmail } = initProfileData;
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
    <InfoDisplay profileData={profileData} />
  </div>
);

const ProfileInfo = ({ isMine, profileData }) => {
  return isMine ? <MyProfileInfo initProfileData={profileData} /> : <UserProfileInfo profileData={profileData} />;
};

export default ProfileInfo;
