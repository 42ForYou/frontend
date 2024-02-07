import React from "react";
import StyledButton from "./StyledButton";

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
      <div className="row ps-3 pe-3">
        <div className="col-8">
          <div className="row">
            <h5 className="fst-italic">{title}</h5>
          </div>
          <div className="row">
            방장: {host}
            <br />
            인원 수: {join_players} / {n_players}
            <br />
            목표 득점: {game_point}점
            <br />
            제한 시간: {time_limit}초
          </div>
        </div>
        <div className="col d-flex flex-column justify-content-between align-items-end">
          <div className="row">{is_tournament ? "[토너먼트]" : "[1vs1]"}</div>
          <div className="row">
            <StyledButton styleType={"primary"} name={"JOIN"} onClick={() => handleJoinClick(game_id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
