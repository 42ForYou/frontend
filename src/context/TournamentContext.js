import React, { useContext, useState } from "react";

const Tournament = React.createContext();

export const TournamentProvider = ({ children }) => {
  const [gameData, setGameData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [playersData, setPlayersData] = useState(null);
  const [myPlayerId, setMyPlayerId] = useState(null);
  const [matchData, setMatchData] = useState({ config: null, rank: null, idx_in_rank: null });

  const setTournamentData = async (data) => {
    const { game, room, players, my_player_id } = data;
    setGameData(game);
    setRoomData(room);
    setPlayersData(players);
    setMyPlayerId(my_player_id);
  };

  const resetTournamentData = () => {
    setGameData(null);
    setRoomData(null);
    setPlayersData(null);
    setMyPlayerId(null);
  };

  return (
    <Tournament.Provider
      value={{
        gameData,
        roomData,
        playersData,
        myPlayerId,
        setGameData,
        setRoomData,
        setPlayersData,
        setMyPlayerId,
        setTournamentData,
        resetTournamentData,
        matchData,
        setMatchData,
      }}>
      {children}
    </Tournament.Provider>
  );
};

export const useTournament = () => useContext(Tournament);
