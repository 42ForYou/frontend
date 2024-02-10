import React from "react";
import StyledButton from "../common/StyledButton";
import { post } from "../../utils/apiBase";
import { API_ENDPOINTS } from "../../utils/apiEndpoints";
import { useNavigate } from "react-router-dom";

// 스타일을 가지는 박스
// 일단은 1대1도 토너먼트 스타일과 통일
const RoomItem = ({ game, room }) => {
  const navigate = useNavigate();
  const { game_id, is_tournament, game_point, time_limit, n_players } = game;
  const { id: room_id, title, is_playing, join_players, host } = room;

  const handleJoinClick = (gameId) => {
    const postJoinRequest = async () => {
      try {
        const resData = await post(API_ENDPOINTS.PLAYERS(), { game_id: gameId });
        navigate(`/game/waiting/${room_id}`);
        console.log("방 참가 요청 성공: ", resData);
      } catch (error) {
        console.log("방 참가 요청 실패: ", error);
        const errorReason = error.response.data.error;
        let alertMsg;
        if (errorReason === "The game room is full") alertMsg = "게임 방 인원이 모두 찼습니다.";
        else if (errorReason === "The player is already participating") alertMsg = "이미 참가한 방입니다.";
        else if (errorReason === "The game room is already started") alertMsg = "게임이 이미 시작된 방입니다.";
        else alertMsg = "게임 방에 입장할 수 없습니다.";
        alert(alertMsg);
      }
    };
    postJoinRequest();
  };

  return (
    <div className={`roomItem ${is_playing ? "roomItemPlaying" : ""} w-100 p-3`}>
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
            <StyledButton
              styleType={"primary"}
              name={"JOIN"}
              onClick={() => handleJoinClick(game_id)}
              disabled={is_playing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
