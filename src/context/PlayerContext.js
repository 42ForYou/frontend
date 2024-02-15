import React, { useContext, useState } from "react";

const PlayerContext = React.createContext();

export const PlayerProvider = ({ children }) => {
  const [myPlayerId, setMyPlayerId] = useState(null);

  return <PlayerContext.Provider value={{ myPlayerId, setMyPlayerId }}>{children}</PlayerContext.Provider>;
};

export const usePlayer = () => useContext(PlayerContext);
