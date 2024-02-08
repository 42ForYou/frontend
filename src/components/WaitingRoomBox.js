import React, { useContext } from "react";
import Avatar from "./Avatar";

import StyledButton from "./StyledButton";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { del } from "../common/apiBase";
import { API_ENDPOINTS } from "../common/apiEndpoints";

const StartGameButton = ({ isActive }) => {
  const handleStartGame = () => {
    alert("게임 스타트 (미구현)");
  };

  return (
    <StyledButton
      styleType={"primary pb-5"}
      name={"START"}
      onClick={isActive ? handleStartGame : null}
      overrideStyle={{
        width: "150px",
        height: "50px",
        fontSize: "30px",
        padding: "-10px 24px",
      }}
      disabled={!isActive}
    />
  );
};

const ExitRoomButton = ({ onClick }) => {
  const navigate = useNavigate();
  const handleExitRoom = () => {
    if (!window.confirm("게임 대기 방을 나가시겠습니까?")) return;
    onClick();
    navigate("/game/list");
  };

  return (
    <StyledButton
      styleType={"danger pb-5  ms-3 "}
      name={"EXIT"}
      onClick={handleExitRoom}
      overrideStyle={{
        width: "120px",
        height: "50px",
        fontSize: "30px",
        padding: "-10px 24px",
      }}
    />
  );
};

const WaitingRoomInfo = ({ title, host, point, time, nPlayers, joinPlayers }) => {
  return (
    <div className="d-flex justify-content-between border bg-info p-3">
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

const WaitingPlayer = ({ nickname, avatar, isHost, isMine }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-3">
      <Avatar src={avatar} alt={`${nickname}의 아바타`} diameter={170} />
      <div className="mt-3">
        <p className={`fs-4 ${isMine ? "text-primary" : ""}`}>{isHost ? `${nickname} (방장)` : nickname}</p>
      </div>
    </div>
  );
};

const WaitingPlayersRow = ({ players, playersPerRow, host }) => {
  const colSize = 12 / playersPerRow;
  const { loggedInUser } = useContext(AuthContext);
  return (
    <>
      {players.map((player, index) => (
        <div
          key={index}
          className={`col-${colSize} d-flex justify-content-center align-items-center border border-info ${player && player.nickname === loggedInUser.nickname ? "bg-warning" : "bg-light"}`}
          style={{ minHeight: "200px" }}>
          {player ? (
            <WaitingPlayer
              nickname={player.nickname}
              avatar={player.avatar}
              isHost={player.nickname === host}
              isMine={player.nickname === loggedInUser.nickname}
            />
          ) : (
            <p className="text-muted">플레이어의 입장을 기다리고 있습니다...</p>
          )}
        </div>
      ))}
    </>
  );
};

const WaitingPlayersGrid = ({ players, host, isTournament }) => {
  const gridItems = isTournament ? Array.from({ length: 4 }, (_, index) => players[index]) : players.slice(0, 2);

  return (
    <div className="container position-relative">
      {isTournament && (
        <div
          className="vs-text"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "5rem",
            fontWeight: "bold",
            zIndex: 2,
          }}>
          VS
        </div>
      )}
      <div className="row">
        <WaitingPlayersRow players={gridItems} playersPerRow={2} host={host} />
      </div>
    </div>
  );
};

const WaitingRoomBox = ({ gameData, roomData, playersData, myPlayerId }) => {
  const { loggedInUser, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  const { game_id, is_tournament, game_point, time_limit, n_players } = gameData;
  const { id: room_id, title, host, join_players } = roomData;
  const amIHost = host === loggedInUser.nickname;

  const bombRoomRequest = async () => {
    try {
      const resData = await del(API_ENDPOINTS.ROOM(room_id));
      console.log("방 폭파 성공: ", resData);
    } catch (error) {
      console.log("방 폭파 요청 에러: ", error);
    }
  };

  const exitRoomRequest = async () => {
    try {
      const resData = await del(API_ENDPOINTS.PLAYERS(myPlayerId));
      console.log("방 나가기 성공: ", resData);
      if (amIHost) bombRoomRequest();
    } catch (error) {
      console.log("방 나가기 요청 에러: ", error);
    }
  };

  return (
    <>
      <div className="row">
        <WaitingRoomInfo
          title={title}
          host={host}
          point={game_point}
          time={time_limit}
          nPlayers={n_players}
          joinPlayers={join_players}
        />
      </div>
      <div className="row">
        <WaitingPlayersGrid players={playersData} host={host} isTournament={is_tournament} />
      </div>
      <div className="row d-flex justify-content-between border border-primary p-3">
        <div className="col"></div>
        <div className="col text-end">
          {amIHost && <StartGameButton isActive={n_players === join_players} />}
          <ExitRoomButton onClick={exitRoomRequest} />
        </div>
      </div>
    </>
  );
};

export default WaitingRoomBox;
