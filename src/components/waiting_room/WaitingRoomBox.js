import React from "react";
import Avatar from "../common/Avatar";
import StyledButton from "../common/StyledButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { del } from "../../utils/apiBase";
import { API_ENDPOINTS } from "../../utils/apiEndpoints";
import { useSocket } from "../../context/SocketContext";

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

const ExitRoomButton = () => {
  const navigate = useNavigate();
  const handleExitRoom = () => {
    if (!window.confirm("게임 대기 방을 나가시겠습니까?")) return;
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

const WaitingPlayer = ({ nickname, avatar, isHost, isMine }) => {
  return (
    <div className="WaitingPlayer d-flex flex-column justify-content-center align-items-center p-3">
      <Avatar src={avatar} alt={`${nickname}의 아바타`} diameter={150} />
      <div className="mt-3">
        <p className={`fs-4 ${isMine ? "text-primary" : ""}`}>{isHost ? `${nickname} (방장)` : nickname}</p>
      </div>
    </div>
  );
};

const WaitingPlayersRow = ({ players, playersPerRow, host, loggedIn }) => {
  const colSize = 12 / playersPerRow;
  return (
    <div className="row m-0 flex-grow-1">
      {players.map((player, index) => (
        <div
          key={index}
          className={`col-${colSize} d-flex justify-content-center align-items-center border border-info ${player && player.nickname === loggedIn.nickname ? "bg-warning" : "bg-light"}`}
          style={{ minHeight: "200px" }}>
          {player ? (
            <WaitingPlayer
              nickname={player.nickname}
              avatar={player.avatar}
              isHost={player.nickname === host}
              isMine={player.nickname === loggedIn.nickname}
            />
          ) : (
            <p className="text-muted">플레이어의 입장을 기다리고 있습니다...</p>
          )}
        </div>
      ))}
    </div>
  );
};

const WaitingPlayersRows = ({ players, playersPerRow, host }) => {
  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };
  const chunkedPlayers = chunkArray(players, playersPerRow);
  const { loggedIn } = useAuth();

  return (
    <div className="WaitingPlayersRows flex-grow-1 d-flex-col">
      {chunkedPlayers.map((playerRow, rowIndex) => (
        <WaitingPlayersRow
          key={rowIndex}
          players={playerRow}
          playersPerRow={playersPerRow}
          host={host}
          loggedIn={loggedIn}
        />
      ))}
    </div>
  );
};

const VStext = () => {
  return (
    <div
      className="vs-text"
      style={{
        position: "absolute",
        top: "55%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "5rem",
        fontWeight: "bold",
        zIndex: 2,
      }}>
      VS
    </div>
  );
};

const WaitingPlayersGrid = ({ players, host, isTournament }) => {
  const gridItems = isTournament ? Array.from({ length: 4 }, (_, index) => players[index]) : players.slice(0, 2);

  return (
    <div className="WaitingPlayersGrid d-flex-col flex-grow-1 position-relative p-0">
      <VStext />
      <WaitingPlayersRows players={gridItems} playersPerRow={2} host={host} />
    </div>
  );
};

const WaitingRoomBox = ({ gameData, roomData, playersData }) => {
  const { loggedIn, isLoading } = useAuth();
  const { game_id, is_tournament, game_point, time_limit, n_players } = gameData;
  const { id: room_id, title, host, join_players } = roomData;
  const amIHost = host === loggedIn.nickname;

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="WaitingRoomBox d-flex-col full-height">
      <WaitingRoomInfo
        title={title}
        host={host}
        point={game_point}
        time={time_limit}
        nPlayers={n_players}
        joinPlayers={join_players}
      />
      <WaitingPlayersGrid players={playersData} host={host} isTournament={is_tournament || n_players === 4} />
      <div className="WaitingRoomButtons d-flex justify-content-end">
        {amIHost && <StartGameButton isActive={n_players === join_players} />}
        <ExitRoomButton />
      </div>
    </div>
  );
};

export default WaitingRoomBox;
