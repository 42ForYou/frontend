import React from "react";
import Avatar from "./Avatar";
import StyledButton from "./StyledButton";

// todo: 친구 수락 버튼 구현
const FriendItem = ({ status, friend }) => {
  const { intra_id, nickname, avatar, is_online } = friend;

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
          {status === "pending" && <StyledButton styleType={"btn btn-primary"} name={"친구 수락"} />}
        </div>
      </div>
    </div>
  );
};

export default FriendItem;
