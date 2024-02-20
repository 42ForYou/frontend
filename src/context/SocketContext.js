import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { Outlet } from "react-router-dom";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [sockets, setSockets] = useState({});
  const socketsRef = useRef({});

  const connectNamespace = (namespace, lifecycleHandlers) => {
    const { onConnect, onConnectError, onDisconnect } = lifecycleHandlers || {};

    if (!socketsRef.current[namespace]) {
      const newSocket = io(`${process.env.SOCKET_BASE_URL}${namespace}`, {
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
        reconnectionDelayMax: 5000,
      });

      newSocket.on("connect", () => {
        console.log(`Socket[${namespace}] connected: `, newSocket.id);
        if (onConnect) onConnect();
      });

      newSocket.on("connect_error", (err) => {
        console.error(`Socket[${namespace}] connection error: `, err);
        if (onConnectError) onConnectError(err);
      });

      newSocket.on("disconnect", (reason) => {
        console.log(`Socket[${namespace}] disconnected: `, reason);
        if (onDisconnect) onDisconnect(reason);
      });

      newSocket.emitWithTime = (event, data) => {
        const timestamp = Math.floor(Date.now() / 1000);
        const dataWithTimestamp = { ...data, t_event: timestamp };
        newSocket.emit(event, dataWithTimestamp);
      };

      setSockets((prevSockets) => {
        const updatedSockets = { ...prevSockets, [namespace]: newSocket };
        socketsRef.current = updatedSockets;
        return updatedSockets;
      });
    }
  };

  const disconnectNamespace = (namespace) => {
    setSockets((currentSockets) => {
      const socket = currentSockets[namespace];
      if (socket) {
        socket.disconnect();
        const updatedSockets = { ...currentSockets };
        delete updatedSockets[namespace];
        socketsRef.current = updatedSockets;
        return updatedSockets;
      }
      return currentSockets;
    });
  };

  const disconnectAllSockets = () => {
    console.log("모든 소켓 객체의 연결을 해제합니다.");
    Object.values(socketsRef.current).forEach((socket) => {
      if (socket.connected) {
        socket.disconnect();
      }
    });
    setSockets({});
    socketsRef.current = {};
  };

  useEffect(() => {
    connectNamespace("/");
    connectNamespace("/online_status");
    return () => {
      disconnectAllSockets();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        sockets,
        connectNamespace,
        disconnectNamespace,
        setupEventListeners: () => {},
        removeEventListeners: () => {},
      }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export const SocketProviderWrapper = () => {
  return (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  );
};
