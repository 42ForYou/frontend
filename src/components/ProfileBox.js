import React, { useState, useEffect, useRef } from "react";
import Avatar from "./Avatar";
import ToggleButton from "./ToggleButton";

import { patchForm } from "../common/apiBase";
import { API_ENDPOINTS } from "../common/apiEndPoints";

const ProfileInfoText = ({ label, value, onChange, isEditing = false }) => {
  const [inputValue, setInputValue] = useState(value);

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

// todo: 대전 기록, 아바타 띄우는 방식 결정
const ProfileBox = ({ isMine, profileData }) => {
  const { intra_id, nickname, email, history, avatar, two_factor_auth: is2FA } = profileData;
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState(nickname);
  const [newEmail, setNewEmail] = useState(email);
  const [editStatus, setEditStatus] = useState("");
  const imgInputRef = useRef(null);

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

    try {
      const resData = await Form(API_ENDPOINTS.USER_PROFILE(intra_id), formData);
      console.log(resData);
    } catch (error) {}
  };

  const handleStartEditClick = () => {
    setIsEditing(true);
    setEditStatus("");
  };

  const handleEndEditClick = () => {
    const isChangeExist = !(newNickname === nickname && newEmail === newEmail);
    const patchProfile = async () => {
      try {
        const formData = new FormData();
        const newProfile = { nickname: newNickname, email: newEmail };
        formData.append("data", JSON.stringify(newProfile));
        const resData = await patchForm(API_ENDPOINTS.USER_PROFILE(intra_id), formData);
        console.log("프로필 정보 업데이트 성공");
        setEditStatus("프로필 정보가 성공적으로 업데이트 되었습니다.");
      } catch (error) {
        console.log("프로필 정보 업데이트 실패: ", JSON.stringify(error.response.data.error, null, 2));
        setEditStatus("프로필 정보 업데이트가 실패하였습니다.");
      }
    };
    if (isChangeExist) patchProfile();
    setIsEditing(false);
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
              <div className="text-center">
                {isMine && isEditing ? (
                  <button className="btn btn-primary" onClick={handleEndEditClick}>
                    수정 끝내기
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={handleStartEditClick}>
                    내 정보 수정하기
                  </button>
                )}
              </div>
              <div>{editStatus}</div>
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
