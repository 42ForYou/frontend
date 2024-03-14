import React, { useState } from "react";
import { del, post } from "../../utils/apiBase";
import { API_ENDPOINTS } from "../../utils/apiEndpoints";
import CustomButton from "../common/CustomButton";
import { useLayout } from "../../context/LayoutContext";

// 1. 현재 친구 아님 -> 친구 신청 가능
// 2. 현재 신청 상태 -> 별다른 기능 없이 '대기중'만 띄움
// 3. 현재 친구임 -> 친구 삭제 (미구현)
// 상대방이 나한테 친구 신청을 한 케이스는 고려하지 않는다.
const ProfileFriendButton = ({ initFriendStatus, friendId, nickname }) => {
  const [friendStatus, setFriendStatus] = useState(initFriendStatus);
  const { isWide } = useLayout();

  const handleAddFriend = async () => {
    try {
      const resData = await post(`${API_ENDPOINTS.FRIENDS()}`, { receiver: nickname });
      console.log("친구 신청 성공:", resData);
      setFriendStatus("pending");
    } catch (error) {
      console.log("친구 신청 실패:", error);
      alert("친구 신청에 실패하였습니다.");
    }
  };

  const handleRejectFriend = () => {
    const delFriend = async () => {
      try {
        const resData = await del(`${API_ENDPOINTS.FRIENDS()}${friendId}/`);
        console.log("친구 삭제 성공:", resData);
        setFriendStatus("None");
      } catch (error) {
        console.log("친구 삭제 실패:", error);
        alert("친구 삭제에 실패하였습니다.");
      }
    };
    delFriend();
  };

  return (
    <div className={`ProfileFriendButton col-12 ${isWide ? "text-end mt-3" : "text-center"}`}>
      {friendStatus === "None" && <CustomButton label={"친구 신청"} color={"blue"} onClick={handleAddFriend} />}
      {friendStatus === "pending" && <CustomButton label={"친구 신청 중..."} disabled={true} opacity={1} />}
      {friendStatus === "friend" && <CustomButton label={"친구 삭제"} color={"red"} onClick={handleRejectFriend} />}
    </div>
  );
};

export default ProfileFriendButton;
