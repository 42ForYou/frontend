import React from "react";
import Avatar from "../common/Avatar";
import { useAuth } from "../../context/AuthContext";

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

const WaitingPlayersGrid = ({ players, host, isTournament }) => {
  const gridItems = isTournament ? Array.from({ length: 4 }, (_, index) => players[index]) : players.slice(0, 2);

  return (
    <div className="WaitingPlayersGrid d-flex-col flex-grow-1 position-relative p-0">
      <VStext />
      <WaitingPlayersRows players={gridItems} playersPerRow={2} host={host} />
    </div>
  );
};

export default WaitingPlayersGrid;
