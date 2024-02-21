import React, { useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { del } from "../utils/apiBase";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

const Game = React.createContext();

export const GameProvider = ({ children }) => {
  // todo: 각 객체별 구조를 알 수 있도록 초기값 설정
  const [gameData, setGameData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [playersData, setPlayersData] = useState(null);
  const [myPlayerId, setMyPlayerId] = useState(null);
  const [bracketData, setBracketData] = useState(null);
  const [subgameData, setSubgameData] = useState({ is_start: false, config: null });
  const { sockets, connectNamespace, disconnectNamespace, setupEventListeners, removeEventListeners } = useSocket();
  const { loggedIn } = useAuth();

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

  // todo: 소켓 통신 연결 실패하고 방 나가기 요청도 실패할시 처리가 안됨
  // 소켓 통신 연결 후에 방 입장을 해야하나?
  const handleAbortExit = async () => {
    try {
      const resData = await del(API_ENDPOINTS.PLAYERS(myPlayerId));
      navigate("/game/list");
      console.log("Abort Exit 성공", resData);
    } catch (error) {
      console.log("Abort Exit 실패: ", error);
    }
  };

  const connectRoomSocket = (namespace) => {
    if (!sockets[namespace]) {
      connectNamespace(namespace, {
        onConnectError: () => {
          alert("실시간 통신 연결에 실패하였습니다.");
          handleAbortExit();
        },
        onDisconnect: () => {
          resetWaitingRoomData();
        },
      });
    }
  };

  const setupEventListenersRoomSocket = (namespace) => {
    if (!sockets[namespace]) return;

    const updateWaitingRoomHandler = (data) => {
      setGameData(data.game);
      setRoomData(data.room);
      setPlayersData(data.players);
      // console.log("방 정보 업데이트: ", data);
    };

    const roomDestroyedHandler = () => {
      if (loggedIn.nickname !== roomData.host) alert("호스트가 나가 방이 사라졌습니다.");
      navigate("/game/list");
    };

    const updateBracketHandler = (data) => {
      setBracketData(data);
    };

    setupEventListeners(namespace, [
      {
        event: "update_room",
        handler: updateWaitingRoomHandler,
      },
      { event: "destroyed", handler: roomDestroyedHandler },
      {
        event: "update_tournament",
        handler: updateBracketHandler,
      },
    ]);
  };

  const disconnectRoomSocket = (namespace) => {
    if (sockets[namespace]) disconnectNamespace(namespace);
  };

  const connectSubgameSocket = (namespace) => {
    if (!sockets[namespace]) {
      connectNamespace(namespace, {
        onConnectError: () => {
          alert("실시간 통신 연결에 실패하였습니다.");
          handleAbortExit();
        },
        onDisconnect: () => {
          disconnectRoomSocket(); // 대기방 데이터 초기화됨
          setSubgameData({ config: null, rank: null, idx_in_rank: null });
          setBracketData(null);
        },
      });
    }
  };

  const connectNextSubgameSocket = (namespace) => {
    if (!sockets[namespace]) {
      connectNamespace(namespace, {
        onConnectError: () => {
          alert("실시간 통신 연결에 실패하였습니다.");
          handleAbortExit();
        },
        onDisconnect: () => {
          disconnectRoomSocket(); // 대기방 데이터 초기화됨
          setSubgameData({ config: null, rank: null, idx_in_rank: null });
          setBracketData(null);
        },
      });
    }
  };

  const setupEventListenersMatchSocket = (namespace) => {
    setupEventListeners(namespace, [
      {
        event: "update_tournament",
        handler: (data) => {
          setBracketData(data);
        },
      },
      {
        event: "start",
        handler: () => {
          setSubgameData({ ...subgameData, is_start: true, config: null });
        },
      },
      {
        event: "config",
        handler: (data) => {
          setSubgameData({ ...subgameData, config: data });
        },
      },
    ]);
  };

  const disconnectSubgameSocket = (namespace) => {
    if (sockets[namespace]) disconnectNamespace(namespace);
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
        subgameData,
        setSubgameData,
        setBracketData,
        bracketData,
        setupEventListenersRoomSocket,
        setupEventListenersMatchSocket,
        connectRoomSocket,
        connectSubgameSocket,
        disconnectRoomSocket,
        disconnectSubgameSocket,
        connectNextSubgameSocket,
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
