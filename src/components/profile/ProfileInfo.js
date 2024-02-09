import React, { useContext, useRef, useState, useEffect } from "react";
import useProfileData from "../../hooks/useProfileData";
import { checkRegex } from "../../common/checkRegex";
import StyledButton from "../common/StyledButton";
import Avatar from "../common/Avatar";
import AuthContext from "../../context/AuthContext";

const STATUS = {
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

const InfoTextLine = ({ label, value, isEditing = false, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value, isEditing]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="row">
      <div className="col">
        <label>{label}: </label>
      </div>
      <div className="col">
        {isEditing ? <input type="text" value={inputValue} onChange={handleChange} /> : <span>{inputValue}</span>}
      </div>
    </div>
  );
};

const HiddenImageUploader = ({ imgInputRef, handleAvatarChange }) => {
  return (
    <input type="file" ref={imgInputRef} style={{ display: "none" }} accept="image/*" onChange={handleAvatarChange} />
  );
};

const InfoAvatar = ({ avatar, nickname, isEditing = false, setEditStatus }) => {
  const { patchProfileInfo } = useProfileData();
  const { setLoggedInUser } = useContext(AuthContext);
  const [newAvatar, setNewAvatar] = useState(avatar);
  const imgInputRef = useRef(null);

  const handleAvatarUploadClick = () => {
    if (imgInputRef.current) {
      imgInputRef.current.click();
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("파일을 선택해주세요");
      return;
    }
    const editStatusMsg = ["", "", "", ""];
    const result = await patchProfileInfo(
      file,
      (updatedProfile) => {
        console.log("업데이트 결과: ", updatedProfile);
        setNewAvatar(updatedProfile.avatar);
        setLoggedInUser(updatedProfile);
      },
      true
    );

    if (result.success) {
      editStatusMsg[STATUS.PROFILE] = "아바타가 성공적으로 업로드 되었습니다.";
    } else editStatusMsg[STATUS.PROFILE] = "아바타 업로드가 실패하였습니다.";
    setEditStatus(editStatusMsg);
  };

  return (
    <>
      <Avatar
        src={newAvatar}
        alt={`${nickname}'s avatar`}
        isEditing={isEditing}
        onImageUploadClick={handleAvatarUploadClick}
      />
      {isEditing && <HiddenImageUploader imgInputRef={imgInputRef} handleAvatarChange={handleAvatarChange} />}
    </>
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
    <InfoAvatar avatar={avatar} nickname={nickname} isEditing={isEditing} setEditStatus={setEditStatus} />
    <div>
      {intraId && <InfoTextLine label="Intra ID" value={intraId} />}
      <InfoTextLine label="Nickname" value={nickname} isEditing={isEditing} onChange={onChangeNickname} />
      {email && <InfoTextLine label="Email" value={email} isEditing={isEditing} onChange={onChangeEmail} />}
    </div>
  </div>
);

export const MyProfileInfo = ({ profileInfoData }) => {
  const { nickname, email } = profileInfoData;
  const { patchProfileInfo } = useProfileData();
  const [isEditing, setIsEditing] = useState(false);
  const [editStatus, setEditStatus] = useState(null);
  const [newNickname, setNewNickname] = useState(nickname);
  const [newEmail, setNewEmail] = useState(email);

  const handleEntryEditClick = () => {
    setIsEditing(true);
    setEditStatus(null);
  };

  const handleExitEditClick = () => {
    setIsEditing(false);
    setEditStatus(null);
    setNewNickname(nickname);
    setNewEmail(email);
  };

  const handleSubmitEditClick = async () => {
    const isChangeExist = !(newNickname === nickname && newEmail === email);
    const isValidNewProfile = (newNickname, newEmail) => {
      const isValidNickname = checkRegex(newNickname, /^[a-zA-Z0-9가-힣]{2,16}$/);
      const isValidEmail = checkRegex(newEmail, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);

      if (!isValidNickname)
        editStatusMsg[STATUS.NICKNAME] =
          "유효하지 않은 형식의 닉네임입니다. (한글, 영어, 숫자로 이루어진 2~16자의 문자열이어야 함)";
      if (!isValidEmail) editStatusMsg[STATUS.EMAIL] = "유효하지 않은 형식의 이메일입니다.";
      return isValidNickname && isValidEmail;
    };
    const editStatusMsg = ["", "", "", ""];

    if (isChangeExist && isValidNewProfile(newNickname, newEmail)) {
      const result = await patchProfileInfo({ nickname: newNickname, email: newEmail }, (updatedProfile) => {
        console.log("업데이트 결과: ", updatedProfile);
      });

      if (result.success) {
        setIsEditing(false);
        editStatusMsg[STATUS.PROFILE] = "프로필 정보가 성공적으로 업데이트 되었습니다.";
      } else editStatusMsg[STATUS.PROFILE] = "프로필 정보 업데이트가 실패하였습니다.";
    }
    setEditStatus(editStatusMsg);
    setNewNickname(nickname);
    setNewEmail(email);
  };

  return (
    <div>
      <CommonInfoDisplay
        {...profileInfoData}
        isEditing={isEditing}
        onChangeNickname={setNewNickname}
        onChangeEmail={setNewEmail}
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
