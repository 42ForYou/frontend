import React from "react";
import Avatar from "./Avatar";

import StyledButton from "./StyledButton";
import { useNavigate } from "react-router-dom";

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

const WaitingPlayer = ({ nickname, avatar }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-3">
      <Avatar src={avatar} alt={`${nickname}의 아바타`} diameter={170} />
      <div className="mt-3">
        <p className="fs-4">{nickname}</p>
      </div>
    </div>
  );
};

// todo: 자기 자신과 호스트는 다르게 표시 (겹치는 케이스도 고려)
const WaitingPlayersRow = ({ players, playersPerRow }) => {
  const colSize = 12 / playersPerRow;
  return (
    <>
      {players.map((player, index) => (
        <div
          key={index}
          className={`col-${colSize} d-flex justify-content-center align-items-center border border-info bg-light`}
          style={{ minHeight: "200px" }}>
          {player ? (
            <WaitingPlayer nickname={player.nickname} avatar={player.avatar} />
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
        <WaitingPlayersRow players={gridItems} playersPerRow={2} />
      </div>
    </div>
  );
};

const GameWaitingBox = ({ gameData, roomData, playersData }) => {
  console.log(gameData);
  console.log(roomData);
  console.log(playersData);
  const { is_tournament, game_point, time_limit, n_players } = gameData;
  const { id, title, host, join_players } = roomData;
  const navigate = useNavigate();

  const handleStartGame = () => {
    alert("게임 스타트 (미구현)");
  };
  const handleExitRoom = () => {
    if (window.confirm("게임 대기 방을 나가시겠습니까?")) navigate(-1);
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
          <StyledButton
            styleType={"primary pb-5"}
            name={"START"}
            onClick={handleStartGame}
            overrideStyle={{
              width: "150px",
              height: "50px",
              fontSize: "30px",
              padding: "-10px 24px",
            }}
          />
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
        </div>
      </div>
    </>
  );
};

export default GameWaitingBox;
