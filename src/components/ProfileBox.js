import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import ToggleButton from "./ToggleButton";
import ImageUpload from "./ImageUpload";

import { patch, patchImage } from "../common/apiBase";
import { API_ENDPOINTS } from "../common/apiEndPoints";

const ProfileInfoText = ({ label, value, onChange, isEditing = false }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    onChange(inputValue);
    setInputValue(e.target.value);
  };

  return (
    <div className="row">
      <div className="col-2">
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
  const [editingnNickname, setEditingNickname] = useState(nickname);
  const [editingEmail, setEditingEmail] = useState(email);

  const updateUserData = async (dataToUpdate) => {
    try {
      const updatedUser = await patch(API_ENDPOINTS.USER_PROFILE(intra_id), dataToUpdate);
      console.log("updatedUser: ", updatedUser);
    } catch (error) {
      console.log("Error occured during update user data");
    }
  };

  const handleStartEditClick = () => {
    setIsEditing(true);
  };

  const handleEndEditClick = () => {
    // 백엔드 서버에 제출
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
            <Avatar src={avatar} alt={`${intra_id}\'s avatar`} isEditable={true} />
            {/* <ImageUpload apiUrl={API_ENDPOINTS.USER_PROFILE(intra_id)} /> */}
          </div>
          <div className="profile-info-text mt-4">
            {isMine ? (
              <div>
                <ProfileInfoText label="ID" value={intra_id} isConstant={true} />
                <ProfileInfoText
                  label="Nickname"
                  value={nickname}
                  onChange={setEditingNickname}
                  isEditing={isEditing}
                />
                <ProfileInfoText label="Email" value={email} onChange={setEditingEmail} isEditing={isEditing} />
              </div>
            ) : (
              <div>
                <ProfileInfoText label="Nickname" value={nickname} isConstant={true} />
              </div>
            )}
          </div>
          {isMine && isEditing ? (
            <div className="d-flex justify-content-center w-24">
              <button className="btn btn-primary" onClick={handleEndEditClick}>
                수정 끝내기
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-center w-24">
              <button className="btn btn-primary" onClick={handleStartEditClick}>
                내 정보 수정하기
              </button>
            </div>
          )}
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
