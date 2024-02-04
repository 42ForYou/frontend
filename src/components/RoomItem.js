import React from "react";

// 스타일을 가지는 박스
// 일단은 1대1도 토너먼트 스타일과 통일
const RoomItem = ({ game, room }) => {
  const { game_id, is_tournament, game_point, time_limit, n_players } = game;
  const { id, title, is_playing, join_players, host } = room;

  const handleJoinClick = (roomId) => {
    // 서버에 방 참가 요청
    console.log("방 참가 요청");
  };

  return (
    <div className="RoomItem border border-primary w-100 p-3">
      <div className="row justify-space-between">
        <div className="col">
          <h5>{title}</h5>
        </div>
        <div className="col text-end">{is_tournament === 2 ? "[1vs1]" : "[토너먼트]"}</div>
      </div>
      <div className="row">
        <div className="col-9">
          방장: {host}
          <br />
          인원 수: {join_players} / {n_players}
          <br />
          승리 요건: 제한시간 {time_limit}초, 득점 {game_point}점
        </div>
        <div className="col container-fluid d-flex flex-column align-items-end">
          <button onClick={() => handleJoinClick(game_id)}>JOIN</button>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
