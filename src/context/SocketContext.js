import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [sockets, setSockets] = useState({});
  const { loggedIn } = useAuth();

  const connectNamespace = (namespace, lifecycleHandlers) => {
    const { onConnect, onConnectError, onDisconnect } = lifecycleHandlers || {};

    if (!sockets[namespace]) {
      const newSocket = io(`${process.env.SOCKET_URL}${namespace}`, {
        withCredentials: true,
        // 필요시 재연결 옵션 설정
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

      setSockets((prevSockets) => ({ ...prevSockets, [namespace]: newSocket }));
    }
  };

  // 명시적으로 이벤트 리스너를 해제하지 않아도 라이브러리가 자동으로 해제해주지만 가급적 명시적으로 해제하는 것이 좋음
  const disconnectNamespace = (namespace) => {
    const socket = sockets[namespace];
    if (socket) {
      socket.disconnect();
      setSockets((prevSockets) => {
        const updatedSockets = { ...prevSockets };
        delete updatedSockets[namespace];
        return updatedSockets;
      });
    }
  };

  // 네임스페이스와 event 객체 배열을 받아서 해당 소켓에 이벤트 리스너를 등록
  // 하나의 이벤트 객체 구조는 { event: string, handler: function } 형태
  const setupEventListeners = (namespace, events) => {
    const socket = sockets[namespace];
    if (socket) {
      events.forEach(({ event, handler }) => {
        socket.on(event, handler);
      });
    }
  };

  // 이벤트 명만 넘기면 됨
  const removeEventListeners = (namespace, events) => {
    const socket = sockets[namespace];
    if (socket) {
      events.forEach((event) => {
        socket.off(event);
      });
    }
  };

  useEffect(() => {
    if (!loggedIn) return;
    connectNamespace("/");
    connectNamespace("/online_status");
  }, [loggedIn]);

  useEffect(() => {
    return () => {
      Object.values(sockets).forEach((socket) => {
        if (socket.connected) {
          socket.disconnect();
        }
      });
    };
  }, [sockets]);

  return (
    <SocketContext.Provider
      value={{
        sockets,
        connectNamespace,
        disconnectNamespace,
        setupEventListeners,
        removeEventListeners,
      }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
