import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import ToggleButton from "./ToggleButton";
import ImageUpload from "./ImageUpload";

import { patch, patchImage } from "../common/apiBase";
import { API_ENDPOINTS } from "../common/apiEndPoints";

const TextBar = ({ label, value, onSaveClick, isConstant }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // todo: 새로 입력한 value의 유효성 검사
    // 닉네임 -> 중복 검사
    // 이메일 -> 형식 검사, 중복 검사
    setIsEditing(false);
    onSaveClick(inputValue);
  };

  if (isConstant)
    return (
      <div className="row">
        <div className="col-2">
          <label>{label}: </label>
        </div>
        <div className="col">
          <span>{value}</span>
        </div>
      </div>
    );

  return (
    <div className="row">
      <div className="col-2">
        <label>{label}: </label>
      </div>
      <div className="col">
        {isEditing ? <input type="text" value={inputValue} onChange={handleChange} /> : <span>{inputValue}</span>}
      </div>
      <div className="col">
        {isEditing ? <button onClick={handleSaveClick}>Save</button> : <button onClick={handleEditClick}>Edit</button>}
      </div>
    </div>
  );
};

// todo: 대전 기록, 아바타 띄우는 방식 결정
const ProfileBox = ({ isMine, profileData }) => {
  const { intra_id, nickname, email, history, avatar, two_factor_auth: is2FA } = profileData;

  const updateUserData = async (dataToUpdate) => {
    try {
      const updatedUser = await patch(API_ENDPOINTS.USER_PROFILE(intra_id), dataToUpdate);
      console.log("updatedUser: ", updatedUser);
    } catch (error) {
      console.log("Error occured during update user data");
    }
  };

  const handleDeleteUser = () => {
    window.confirm("정말 탈퇴하시겠습니까?");
    // 탈퇴 요청을 백엔드 서버로 보내 반영
  };

  const handleNicknameSave = (newNickname) => {
    alert("닉네임 변경");
    updateUserData({ nickname: newNickname });
  };

  const handleEmailSave = (newEmail) => {
    updateUserData({ email: newEmail });
  };

  return (
    <div className="profile-box d-flex flex-column justify-content-between h-100">
      <div className="row">
        <div className="row">
          <div className="profile-avatar d-flex justify-content-center">
            <Avatar src={avatar} alt={`${intra_id}\'s avatar`} isEditable={true} />
            {/* <ImageUpload apiUrl={API_ENDPOINTS.USER_PROFILE(intra_id)} /> */}
          </div>
          <div className="profile-info mt-4">
            {isMine ? (
              <div className="profile-info-text">
                <TextBar label="ID" value={intra_id} isConstant={true} />
                <TextBar label="Nickname" value={nickname} onSaveClick={handleNicknameSave} />
                <TextBar label="Email" value={email} onSaveClick={handleEmailSave} />
              </div>
            ) : (
              <div className="profile-info-text">
                <TextBar label="Nickname" value={nickname} isConstant={true} />
              </div>
            )}
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
