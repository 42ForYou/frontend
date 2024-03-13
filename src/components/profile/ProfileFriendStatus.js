import React, { useState } from "react";
import { post } from "../../utils/apiBase";
import { API_ENDPOINTS } from "../../utils/apiEndpoints";
import BootstrapButton from "../common/BootstrapButton";

// 1. 현재 친구 아님 -> 친구 신청 가능
// 2. 현재 신청 상태 -> 별다른 기능 없이 '대기중'만 띄움
// 3. 현재 친구임 -> 친구 삭제 (미구현)
// 상대방이 나한테 친구 신청을 한 케이스는 고려하지 않는다.
const ProfileFriendStatus = ({ initFriendStatus, nickname }) => {
  const [friendStatus, setFriendStatus] = useState(initFriendStatus);

  const handleAddFriend = async () => {
    try {
      const resData = await post(`${API_ENDPOINTS.FRIENDS()}`, { receiver: nickname });
      console.log("친구 신청 성공:", resData);
      console.log("???");
      setFriendStatus("pending");
    } catch (error) {
      console.log("친구 신청 실패:", error);
      alert("친구 신청에 실패하였습니다.");
    }
  };

  // todo: 친구 삭제 기능 구현 고려
  const handleRemoveFriend = async () => {};

  return (
    <div className="ProfileFriendStatus col-12 text-center">
      {friendStatus === "None" && (
        <BootstrapButton styleType={"btn btn-primary"} label={"친구 신청"} onClick={handleAddFriend} />
      )}
      {friendStatus === "pending" && <span>친구 요청 상태</span>}
      {friendStatus === "friend" && <div className="border-box">친구 상태</div>}
    </div>
  );
};

export default ProfileFriendStatus;
