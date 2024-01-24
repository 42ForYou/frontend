import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import ToggleButton from "../components/ToggleButton";

import FooterBar from "./FooterBar";

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
      <div>
        <label>{label}: </label>
        <span>
          <span>{value}</span>
        </span>
      </div>
    );

  return (
    <div>
      <label>{label}: </label>
      {isEditing ? (
        <span>
          <input type="text" value={inputValue} onChange={handleChange} />
          <button onClick={handleSaveClick}>Save</button>
        </span>
      ) : (
        <span>
          <span>{inputValue}</span>
          <button onClick={handleEditClick}>Edit</button>
        </span>
      )}
    </div>
  );
};

// todo: 대전 기록, 아바타 띄우는 방식 결정
const ProfileBox = ({ isMine, profileData }) => {
  const { id, nickname, email, history, avatar, is2FA } = profileData;

  const handleDeleteUser = () => {
    window.confirm("정말 탈퇴하시겠습니까?");
    // 탈퇴 요청을 백엔드 서버로 보내 반영
  };

  const handleNicknameSave = (newNickname) => {
    // 수정된 닉네임을 백엔드 서버로 보내 반영
    console.log(`New Nickname: ${newNickname}`);
  };

  const handleEmailSave = (newEmail) => {
    // 수정된 이메일을 백엔드 서버로 보내 반영
    console.log(`New Email: ${newEmail}`);
  };

  return (
    <div className="profile-box">
      <div className="profile-info">
        {isMine ? (
          <div className="profile-info-text">
            <TextBar label="ID" value={id} isConstant={true} />
            <TextBar label="Nickname" value={nickname} onSaveClick={handleNicknameSave} />
            <TextBar label="Email" value={email} onSaveClick={handleEmailSave} />
          </div>
        ) : (
          <div className="profile-info-text">
            <TextBar label="Nickname" value={nickname} isConstant={true} />
          </div>
        )}
        <Avatar src={avatar} alt={`${id}'s avatar`} />
      </div>
      <div className="profile-history">
        History<div className="history-box"></div>
      </div>
      {isMine && (
        <FooterBar
          leftChild={<ToggleButton title="2FA" initIsToggled={is2FA} />}
          rightChild={<button onClick={handleDeleteUser}>Delete</button>}
        />
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
