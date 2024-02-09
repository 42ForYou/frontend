import React, { useState } from "react";
import useProfileData from "../../hooks/useProfileData";
import { checkRegex } from "../../common/checkRegex";
import StyledButton from "../common/StyledButton";
import ProfileInfoAvatar from "./ProfileInfoAvatar";
import ProfileInfoTextLine from "./ProfileInfoTextLine";

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

const CommonInfoDisplay = ({
  intraId,
  avatar,
  nickname,
  email,
  isEditing,
  onChangeNickname,
  onChangeEmail,
  setEditStatus,
}) => (
  <div>
    <ProfileInfoAvatar avatar={avatar} nickname={nickname} isEditing={isEditing} setEditStatus={setEditStatus} />
    <div>
      {intraId && <ProfileInfoTextLine label="Intra ID" value={intraId} />}
      <ProfileInfoTextLine label="Nickname" value={nickname} isEditing={isEditing} onChange={onChangeNickname} />
      {email && <ProfileInfoTextLine label="Email" value={email} isEditing={isEditing} onChange={onChangeEmail} />}
    </div>
  </div>
);

export const MyProfileInfo = ({ profileInfoData }) => {
  const { nickname: initialNickname, email: initialEmail } = profileInfoData;
  const { patchProfileInfo } = useProfileData();
  const [isEditing, setIsEditing] = useState(false);
  const [editStatus, setEditStatus] = useState(null);
  const [nickname, setNickname] = useState(initialNickname);
  const [email, setEmail] = useState(initialEmail);

  const handleEntryEditClick = () => {
    setIsEditing(true);
    setEditStatus(null);
  };

  const handleExitEditClick = () => {
    setIsEditing(false);
    setEditStatus(null);
    setNickname(initialNickname);
    setEmail(initialEmail);
  };

  const handleSubmitEditClick = async () => {
    const isChangeExist = !(nickname === initialNickname && email === initialEmail);
    const isValidNewProfile = (nickname, email) => {
      const isValidNickname = checkRegex(nickname, /^[a-zA-Z0-9가-힣]{2,16}$/);
      const isValidEmail = checkRegex(email, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
      if (!isValidNickname)
        editStatusMsg[STATUS.NICKNAME] =
          "유효하지 않은 형식의 닉네임입니다. (한글, 영어, 숫자로 이루어진 2~16자의 문자열이어야 함)";
      if (!isValidEmail) editStatusMsg[STATUS.EMAIL] = "유효하지 않은 형식의 이메일입니다.";
      return isValidNickname && isValidEmail;
    };
    const editStatusMsg = ["", "", "", ""];

    if (isChangeExist && isValidNewProfile(nickname, email)) {
      const result = await patchProfileInfo({ nickname, email }, (updatedProfile) => {
        console.log("업데이트 결과: ", updatedProfile);
      });

      if (result.success) {
        setIsEditing(false);
        editStatusMsg[STATUS.PROFILE] = "프로필 정보가 성공적으로 업데이트 되었습니다.";
      } else editStatusMsg[STATUS.PROFILE] = "프로필 정보 업데이트가 실패하였습니다.";
    }
    setEditStatus(editStatusMsg);
  };

  return (
    <div>
      <CommonInfoDisplay
        intraId={profileInfoData.intraId}
        avatar={profileInfoData.avatar}
        nickname={nickname} // 수정됨
        email={email} // 수정됨
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

export const UserProfileInfo = ({ profileInfoData }) => (
  <div>
    <CommonInfoDisplay {...profileInfoData} />
  </div>
);
