import React from "react";
import Avatar from "../common/Avatar";
import StyledButton from "../common/StyledButton";
import { patch } from "../../common/apiBase";
import { API_ENDPOINTS } from "../../common/apiEndpoints";

const FriendItem = ({ id, status, friend, onOccurChange }) => {
  const { intra_id, nickname, avatar, is_online } = friend;

  const handleAcceptFriend = () => {
    const patchFriend = async () => {
      try {
        const resData = await patch(`${API_ENDPOINTS.FRIENDS()}${id}/`);
        onOccurChange();
        console.error("친구 수락 성공:", resData);
      } catch (error) {
        console.error("친구 수락 실패:", error);
        alert("친구 수락에 실패하였습니다.");
      }
    };
    patchFriend();
  };

  return (
    <div className="FriendItem border border-primary w-100 p-3">
      <div className="row ps-3 pe-3">
        <div className="col">
          <Avatar
            src={avatar}
            alt={`친구 ${nickname}의 아바타`}
            to={`/profile/users/${intra_id}`}
            isOnline={is_online}
          />
        </div>
        <div className="col">
          {nickname}
          {status === "pending" && (
            <StyledButton styleType={"btn btn-primary"} name={"친구 수락"} onClick={handleAcceptFriend} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendItem;
