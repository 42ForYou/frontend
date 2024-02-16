import React, { useEffect, useState } from "react";
import Avatar from "../common/Avatar";
import StyledButton from "../common/StyledButton";
import { del, patch } from "../../utils/apiBase";
import { API_ENDPOINTS } from "../../utils/apiEndpoints";
import { useOnlineStatus } from "../../context/OnlineStatusContext";

const FriendItem = ({ id: friend_id, status, friend, onOccurChange }) => {
  const { intra_id, nickname, avatar } = friend;
  const [currentIsOnline, setCurrentIsOnline] = useState(friend.is_online);
  const onlineStatuses = useOnlineStatus();

  useEffect(() => {
    if (onlineStatuses.hasOwnProperty(intra_id)) {
      setCurrentIsOnline(onlineStatuses[intra_id]);
    }
  }, [onlineStatuses, intra_id]);

  const handleAcceptFriend = () => {
    const patchFriend = async () => {
      try {
        const resData = await patch(`${API_ENDPOINTS.FRIENDS()}${friend_id}/`);
        onOccurChange();
        alert("친구 요청을 수락하였습니다.");
        console.log("친구 요청 수락 성공:", resData);
      } catch (error) {
        console.log("친구 요청 수락 실패:", error);
        alert("친구 요청 수락에 실패하였습니다.");
      }
    };
    patchFriend();
  };

  const handleRejectFriend = () => {
    const delFriend = async () => {
      try {
        const resData = await del(`${API_ENDPOINTS.FRIENDS()}${friend_id}/`);
        onOccurChange();
        console.log("친구 삭제 성공:", resData);
      } catch (error) {
        console.log("친구 삭제 실패:", error);
        alert("친구 삭제에 실패하였습니다.");
      }
    };

    let confirmMsg = "";
    if (status === "pending") {
      confirmMsg = "친구 요청을 거절하시겠습니까?";
    } else if (status === "friend") {
      confirmMsg = "친구를 삭제하시겠습니까?";
    }
    if (window.confirm(confirmMsg)) {
      delFriend();
    }
  };

  return (
    <div className="FriendItem border border-primary w-100 p-3">
      <div className="row ps-3 pe-3">
        <div className="col">
          <Avatar
            src={avatar}
            alt={`친구 ${nickname}의 아바타`}
            to={`/profile/users/${intra_id}`}
            onlineStatus={currentIsOnline ? "online" : "offline"}
          />
        </div>
        <div className="col">
          {nickname}
          {status === "pending" && (
            <>
              <StyledButton styleType={"btn btn-primary"} name={"수락"} onClick={handleAcceptFriend} />
              <StyledButton styleType={"btn btn-danger"} name={"거절"} onClick={handleRejectFriend} />
            </>
          )}
          {status === "friend" && (
            <>
              <StyledButton styleType={"btn btn-danger"} name={"친구 삭제"} onClick={handleRejectFriend} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendItem;
