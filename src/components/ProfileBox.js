import React, { useState, useEffect, useRef } from "react";
import Avatar from "./Avatar";
import ToggleButton from "./ToggleButton";

import { patchForm } from "../common/apiBase";
import { API_ENDPOINTS } from "../common/apiEndPoints";

const ProfileInfoText = ({ label, value, onChange, isEditing = false }) => {
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

// todo: MyProfileBox, UserProfileBox로 분리
const ProfileBox = ({ isMine, profileData, fetchProfileData }) => {
  const { intra_id, nickname, email, history, avatar, two_factor_auth: is2FA } = profileData;
  const imgInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState(nickname);
  const [newEmail, setNewEmail] = useState(email);

  const [editStatus, setEditStatus] = useState(null);
  const PROFILE_STATUS_INDEX = 0;
  const NICKNAME_STATUS_INDEX = 1;
  const EMAIL_STATUS_INDEX = 2;
  const AVATAR_STATUS_INDEX = 3;

  const handleAvatarUploadClick = () => {
    if (imgInputRef.current) {
      imgInputRef.current.click();
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("선택한 파일이 없습니다");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    const editStatusMsg = ["", "", "", ""];

    try {
      const resData = await patchForm(API_ENDPOINTS.USER_PROFILE(intra_id), formData);
      editStatusMsg[AVATAR_STATUS_INDEX] = "아바타가 성공적으로 업로드 되었습니다.";
    } catch (error) {
      editStatusMsg[AVATAR_STATUS_INDEX] = "아바타 업로드가 실패하였습니다.";
    }
    setEditStatus(editStatusMsg);
  };

  const handleStartEditClick = () => {
    setIsEditing(true);
    setEditStatus(null);
  };

  const handleExitEditClick = () => {
    setIsEditing(false);
    setEditStatus(null);
    setNewNickname(nickname);
    setNewEmail(email);
  };

  const handleEditSubmitClick = () => {
    const isChangeExist = !(newNickname === nickname && newEmail === email);
    const editStatusMsg = ["", "", "", ""];

    // todo: 닉네임 검증 (정규표현식 사용)
    const patchProfile = async () => {
      try {
        const formData = new FormData();
        const newProfile = { nickname: newNickname, email: newEmail };
        formData.append("data", JSON.stringify(newProfile));
        const resData = await patchForm(API_ENDPOINTS.USER_PROFILE(intra_id), formData);
        editStatusMsg[PROFILE_STATUS_INDEX] = "프로필 정보가 성공적으로 업데이트 되었습니다.";
        setIsEditing(false);
        fetchProfileData();
      } catch (error) {
        const errorCode = error.response.status;
        const errorData = error.response.data;

        editStatusMsg[PROFILE_STATUS_INDEX] = "프로필 정보 업데이트에 실패하였습니다.";

        // todo: HTTP 요청 에러코드 상수로 변경
        if (errorCode !== 409) return;
        if ("nickname" in errorData) editStatusMsg[NICKNAME_STATUS_INDEX] = "이미 사용 중인 닉네임입니다.";
        if ("email" in errorData) editStatusMsg[EMAIL_STATUS_INDEX] = "이미 사용 중인 이메일입니다.";
      }
      setNewNickname(nickname);
      setNewEmail(email);
      setEditStatus(editStatusMsg);
    };

    if (isChangeExist) patchProfile();
  };

  const handleDeleteUser = () => {
    window.confirm("정말 탈퇴하시겠습니까?");
    // 탈퇴 요청을 백엔드 서버로 보내 반영
  };

  return (
    <div className="profile-box d-flex flex-column justify-content-between h-100">
      <div className="row">
        <div className="row profile-info border-p3-box border-3">
          <div className="profile-info-avatar d-flex justify-content-center">
            <Avatar
              src={avatar}
              alt={`${intra_id}\'s avatar`}
              isEditing={isEditing}
              onImageUploadClick={handleAvatarUploadClick}
            />
            {isMine && (
              <input
                type="file"
                ref={imgInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleAvatarChange}
              />
            )}
          </div>
          <div className="profile-info-text d-flex justify-content-center mt-4 mb-4">
            {isMine ? (
              <div>
                <ProfileInfoText label="ID" value={intra_id} isConstant={true} />
                <ProfileInfoText label="Nickname" value={nickname} onChange={setNewNickname} isEditing={isEditing} />
                <ProfileInfoText label="Email" value={email} onChange={setNewEmail} isEditing={isEditing} />
              </div>
            ) : (
              <div>
                <ProfileInfoText label="Nickname" value={nickname} isConstant={true} />
              </div>
            )}
          </div>
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column">
              <div className="text-center mb-2">
                {isMine && isEditing && (
                  <>
                    <button className="btn btn-danger me-2" onClick={handleExitEditClick}>
                      취소
                    </button>
                    <button className="btn btn-primary" onClick={handleEditSubmitClick}>
                      확인
                    </button>
                  </>
                )}
                {isMine && !isEditing && (
                  <button className="btn btn-primary" onClick={handleStartEditClick}>
                    정보 수정하기
                  </button>
                )}
              </div>
              <div className="text-center">
                {editStatus && editStatus.map((status, i) => <div key={i}>{status}</div>)}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="profile-history d-flex flex-column justify-content-center mt-3">
            History
            <div className="history-box w-100 border bg-body-secondary mt-2 p-3" style={{ minHeight: "300px" }}>
              <p>{nickname}님의 전적은 ... </p>
            </div>
          </div>
        </div>
      </div>
      {isMine && (
        <div className="row container-fluid mt-3">
          <div className="col">
            <ToggleButton title="2FA" initIsToggled={is2FA} />
          </div>
          <div className="col d-flex justify-content-end">
            <button onClick={handleDeleteUser}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

ProfileBox.defaultProps = {
  isMine: true,
  profileData: {
    id: "default",
    nickname: "default",
    email: "default@unknown.com",
    history: "default",
    is2FA: false,
  },
};

export default ProfileBox;
