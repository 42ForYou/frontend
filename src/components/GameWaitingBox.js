import React from "react";
import Avatar from "./Avatar";

const WaitingRoomInfo = ({ title, host, point, time, nPlayers, joinPlayers }) => {
  return (
    <div className="d-flex justify-content-between">
      <div className="col">
        방 제목: {title}
        <br />
        방장: {host} | 인원 {joinPlayers} / {nPlayers}
      </div>
      <div className="col">
        목표 득점: {point}
        <br />
        제한 시간: {time}
      </div>
    </div>
  );
};

const WaitingPlayer = ({ nickname, avatar }) => {
  return (
    <div className="d-flex flex-column">
      <Avatar src={avatar} alt={`${nickname}의 아바타`} />
      <p>{nickname}</p>
    </div>
  );
};

const DualPlayersGrid = () => {
  return (
    <>
      <div className="col"></div>
      <div className="col"></div>
    </>
  );
};

const TournamentPlayersGrid = ({ playersData }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <WaitingPlayer nickname={playersData[0].nickname} avatar={playersData[0].avatar} />
        </div>
        <div className="col-6">
          <WaitingPlayer nickname={playersData[1].nickname} avatar={playersData[1].avatar} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-primary m-2">Start</button>
            <button className="btn btn-secondary m-2">Exit</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <WaitingPlayer nickname={playersData[2].nickname} avatar={playersData[2].avatar} />
        </div>
        <div className="col-6">
          <WaitingPlayer nickname={playersData[3].nickname} avatar={playersData[3].avatar} />
        </div>
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
        {is_tournament ? (
          <TournamentPlayersGrid playersData={playersData} />
        ) : (
          <DualPlayersGrid playersData={playersData} />
        )}
      </div>
    </>
  );
};

export default GameWaitingBox;
