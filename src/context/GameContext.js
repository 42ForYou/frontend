import React, { useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";
import { Outlet } from "react-router-dom";

const Game = React.createContext();

export const GameProvider = ({ children }) => {
  // todo: 각 객체별 구조를 알 수 있도록 초기값 설정
  const [gameData, setGameData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [playersData, setPlayersData] = useState(null);
  const [myPlayerId, setMyPlayerId] = useState(null);
  const [matchData, setMatchData] = useState({ config: null, rank: null, idx_in_rank: null });
  const [bracketData, setBracketData] = useState(null);

  const setWaitingRoomData = async (data) => {
    data.game && setGameData(data.game);
    data.room && setRoomData(data.room);
    data.players && setPlayersData(data.players);
    data.my_player_id && setMyPlayerId(data.my_player_id);
  };

  const resetWaitingRoomData = () => {
    setGameData(null);
    setRoomData(null);
    setPlayersData(null);
    setMyPlayerId(null);
  };

  return (
    <Game.Provider
      value={{
        gameData,
        roomData,
        playersData,
        myPlayerId,
        setGameData,
        setRoomData,
        setPlayersData,
        setMyPlayerId,
        setWaitingRoomData,
        resetWaitingRoomData,
        matchData,
        setMatchData,
        setBracketData,
        bracketData,
      }}>
      {children}
    </Game.Provider>
  );
};

export const useGame = () => useContext(Game);

export const GameProviderWrapper = () => {
  return (
    <GameProvider>
      <Outlet />
    </GameProvider>
  );
};
