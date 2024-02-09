import React from "react";
import Avatar from "./Avatar";

// todo: 아이템 박스 자체가 링크
const UserItem = ({ intra_id, nickname, avatar }) => {
  return (
    <div className="UserItem border border-primary w-100 p-3">
      <div className="row ps-3 pe-3">
        <div className="col">
          <Avatar src={avatar} alt={`유저 ${nickname}의 아바타`} to={`/profile/users/${intra_id}`} />
        </div>
        <div className="col">{nickname}</div>
      </div>
    </div>
  );
};

export default UserItem;
