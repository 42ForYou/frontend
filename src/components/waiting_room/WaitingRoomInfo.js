import React from "react";

const WaitingRoomInfo = ({ title, host, point, time, nPlayers, joinPlayers }) => {
  return (
    <div className="WaitingRoomInfo d-flex justify-content-between border bg-info p-3">
      <div className="col">
        <h5>
          방 제목: {title} ({joinPlayers} / {nPlayers})
        </h5>
        방장: {host}
      </div>
      <div className="col d-flex justify-content-end">
        목표 득점: {point}
        <br />
        제한 시간: {time}
      </div>
    </div>
  );
};

export default WaitingRoomInfo;
