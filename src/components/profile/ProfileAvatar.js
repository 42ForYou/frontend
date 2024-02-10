import React, { useContext, useRef, useState } from "react";
import { STATUS } from "./ProfileInfo";
import usePatchProfile from "../../hooks/usePatchProfile";
import AuthContext from "../../context/AuthContext";
import Avatar from "../common/Avatar";

const HiddenImageUploader = ({ imgInputRef, handleAvatarChange }) => {
  return (
    <input type="file" ref={imgInputRef} style={{ display: "none" }} accept="image/*" onChange={handleAvatarChange} />
  );
};

const ProfileAvatar = ({ avatar, nickname, isEditing = false, setEditStatus }) => {
  const { patchProfileInfo } = usePatchProfile();
  const { setLoggedIn } = useContext(AuthContext);
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
        setLoggedIn(updatedProfile);
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

export default ProfileAvatar;
