import React, { useContext, useState } from "react";

const Tournament = React.createContext();

export const TournamentProvider = ({ children }) => {
  const [roomId, setRoomId] = useState(null);
  const [myPlayerId, setMyPlayerId] = useState(null);

  return <Tournament.Provider value={{ roomId, setRoomId, myPlayerId, setMyPlayerId }}>{children}</Tournament.Provider>;
};

export const useTournament = () => useContext(Tournament);
