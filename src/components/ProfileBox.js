import React, { useState, useEffect, useRef } from "react";
import ToggleButton from "./ToggleButton";
import StyledButton from "./StyledButton";
import Avatar from "./Avatar";
import { checkRegex } from "../common/checkRegex";
import { patchForm } from "../common/apiBase";
import { API_ENDPOINTS } from "../common/apiEndpoints";

const STATUS = {
  PROFILE: 0,
  NICKNAME: 1,
  EMAIL: 2,
};

const ProfileInfoTextItem = ({ label, value, isEditing = false, onChange }) => {
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

const ProfileInfoAvatar = ({ src, nickname, intraId, isEditing = false, setEditStatus }) => {
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
    const formData = new FormData();
    formData.append("image", file);

    const editStatusMsg = ["", "", "", ""];
    try {
      const resData = await patchForm(API_ENDPOINTS.USER_PROFILE(intraId), formData);
      editStatusMsg[STATUS.PROFILE] = "아바타가 성공적으로 업로드 되었습니다.";
    } catch (error) {
      editStatusMsg[STATUS.PROFILE] = "아바타 업로드가 실패하였습니다.";
    }
    setEditStatus(editStatusMsg);
  };

  return (
    <>
      <Avatar
        src={src}
        alt={`${nickname}\'s avatar`}
        isEditing={isEditing}
        onImageUploadClick={handleAvatarUploadClick}
      />
      {isEditing && (
        <input
          type="file"
          ref={imgInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleAvatarChange}
        />
      )}
    </>
  );
};

const ProfileInfoEditButtons = ({ isEditing, onExitClick, onSubmitClick, onEntryClick }) => {
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

const MyProfileInfo = ({ intraId, nickname, email, avatar, fetchProfileData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState(nickname);
  const [newEmail, setNewEmail] = useState(email);
  const [editStatus, setEditStatus] = useState(null);

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

  const handleSubmitEditClick = () => {
    const isChangeExist = !(newNickname === nickname && newEmail === email);
    const editStatusMsg = ["", "", "", ""];

    const isValidNewProfile = (newNickname, newEmail) => {
      const isValidNickname = checkRegex(newNickname, /^[a-zA-Z0-9가-힣]{2,16}$/);
      const isValidEmail = checkRegex(newEmail, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);

      if (!isValidNickname)
        editStatusMsg[STATUS.NICKNAME] =
          "유효하지 않은 형식의 닉네임입니다. (한글, 영어, 숫자로 이루어진 2~16자의 문자열이어야 함)";
      if (!isValidEmail) editStatusMsg[STATUS.EMAIL] = "유효하지 않은 형식의 이메일입니다.";
      return isValidNickname && isValidEmail;
    };

    const patchProfile = async () => {
      try {
        const formData = new FormData();
        const newProfile = { nickname: newNickname, email: newEmail };
        formData.append("data", JSON.stringify(newProfile));
        const resData = await patchForm(API_ENDPOINTS.USER_PROFILE(intraId), formData);
        editStatusMsg[STATUS.PROFILE] = "프로필 정보가 성공적으로 업데이트 되었습니다.";
        setIsEditing(false);
        fetchProfileData();
      } catch (error) {
        const errorCode = error.response.status;
        const errorData = error.response.data;

        editStatusMsg[STATUS.PROFILE] = "프로필 정보 업데이트에 실패하였습니다.";

        // todo: HTTP 요청 에러코드 상수로 변경
        if (errorCode !== 409) return;
        if ("nickname" in errorData) editStatusMsg[STATUS.NICKNAME] = "이미 사용 중인 닉네임입니다.";
        if ("email" in errorData) editStatusMsg[STATUS.EMAIL] = "이미 사용 중인 이메일입니다.";
      }
      setNewNickname(nickname);
      setNewEmail(email);
    };

    if (!isChangeExist) setIsEditing(false);
    else if (isValidNewProfile(newNickname, newEmail)) patchProfile();
    setEditStatus(editStatusMsg);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <ProfileInfoAvatar
        src={avatar}
        nickname={nickname}
        intraId={intraId}
        isEditing={isEditing}
        setEditStatus={setEditStatus}
      />
      <div>
        <div className="d-flex flex-column mt-4 mb-4">
          <ProfileInfoTextItem label="ID" value={intraId} />
          <ProfileInfoTextItem label="Nickname" value={nickname} onChange={setNewNickname} isEditing={isEditing} />
          <ProfileInfoTextItem label="Email" value={email} onChange={setNewEmail} isEditing={isEditing} />
        </div>
        <div className="d-flex flex-column justify-content-center">
          <ProfileInfoEditButtons
            isEditing={isEditing}
            onEntryClick={handleEntryEditClick}
            onExitClick={handleExitEditClick}
            onSubmitClick={handleSubmitEditClick}
          />
          <div className="text-center">{editStatus && editStatus.map((status, i) => <div key={i}>{status}</div>)}</div>
        </div>
      </div>
    </div>
  );
};

const UserProfileInfo = ({ avatar, nickname }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <ProfileInfoAvatar src={avatar} nickname={nickname} />
      <div className="d-flex flex-column mt-4 mb-4">
        <ProfileInfoTextItem label="Nickname" value={nickname} />
      </div>
    </div>
  );
};

const ProfileHistory = ({ nickname }) => {
  return (
    <div className="mt-3">
      History
      <div className="border bg-body-secondary mt-2 p-3" style={{ minHeight: "300px" }}>
        <p>{nickname}님의 전적은 ... </p>
      </div>
    </div>
  );
};

const ProfileSecurity = (is2FA) => {
  const handleDeleteUser = () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) alert("탈퇴 기능은 아직 구현되지 않음");
    // 탈퇴 요청을 백엔드 서버로 보내 반영
  };

  return (
    <div className="d-flex justify-content-between mt-4">
      <ToggleButton title="2FA" initIsToggled={is2FA} />
      <button onClick={handleDeleteUser}>Delete</button>
    </div>
  );
};

const ProfileBox = ({ isMine, profileData, fetchProfileData }) => {
  const { intra_id: intraId, nickname, email, history, avatar, two_factor_auth: is2FA } = profileData;

  return (
    <div className="container-fluid">
      <div className="row">
        {isMine ? (
          <MyProfileInfo
            intraId={intraId}
            nickname={nickname}
            email={email}
            avatar={avatar}
            fetchProfileData={fetchProfileData}
          />
        ) : (
          <UserProfileInfo nickname={nickname} />
        )}
      </div>
      <div className="row">
        <ProfileHistory nickname={nickname} />
      </div>
      <div className="row">{isMine && <ProfileSecurity is2FA={is2FA} />}</div>
    </div>
  );
};

export default ProfileBox;
