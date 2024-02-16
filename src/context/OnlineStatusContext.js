import React, { createContext, useContext, useState, useEffect } from "react";
import { useSocket } from "./SocketContext";

const OnlineStatusContext = createContext();

export const OnlineStatusProvider = ({ children }) => {
  const [onlineStatuses, setOnlineStatuses] = useState({});
  const { setupEventListeners, removeEventListeners } = useSocket();

  useEffect(() => {
    const handleOnlineStatusUpdate = (data) => {
      const friend = data.friend;
      setOnlineStatuses((prev) => ({
        ...prev,
        [friend.intra_id]: friend.is_online,
      }));
    };

    setupEventListeners("/online_status", [{ event: "update_friends", handler: handleOnlineStatusUpdate }]);

    return () => {
      removeEventListeners("/online_status", ["update_friends"]);
    };
  }, [setupEventListeners, removeEventListeners]);

  return <OnlineStatusContext.Provider value={onlineStatuses}>{children}</OnlineStatusContext.Provider>;
};

export const useOnlineStatus = () => useContext(OnlineStatusContext);
