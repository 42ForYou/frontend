import React from "react";
import Avatar from "../common/Avatar";

// todo: 아이템 박스 자체가 링크
const UserItem = ({ intra_id, nickname, avatar }) => {
  return (
    <div className="UserItem border border-primary w-100 p-0">
      <a href={`/profile/users/${intra_id}`}>
        <div className="p-3">
          <div className="row ps-3 pe-3">
            <div className="col d-flex justify-content-center">
              <Avatar src={avatar} alt={`유저 ${nickname}의 아바타`} to={`/profile/users/${intra_id}`} diameter={120} />
            </div>
            <div className="col text-center mt-2">{nickname}</div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default UserItem;
