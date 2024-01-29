import React from "react";

// 스타일을 가지는 박스
// 일단은 1대1도 토너먼트 스타일과 통일
const RoomItem = ({ title, host, nPlayers, timeLimit, gamePoint, roomId }) => {
  const handleJoinClick = (roomId) => {
    // 서버에 방 참가 요청
    console.log("방 참가 요청");
  };

  return (
    <div className="RoomItem border border-primary w-100 p-3">
      <div className="row justify-space-between">
        <div className="col">{title}</div>
        <div className="col text-end">{nPlayers === 2 ? "[1vs1]" : `[${nPlayers / 2}강]`}</div>
      </div>
      <div className="row">
        <div className="col-9">
          방장: {host}
          <br />
          인원 수: {nPlayers}
          <br />
          승리 요건: 제한시간 {timeLimit}초, 득점 {gamePoint}점
        </div>
        <div className="col container-fluid d-flex flex-column align-items-end">
          <button onClick={() => handleJoinClick(roomId)}>JOIN</button>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
