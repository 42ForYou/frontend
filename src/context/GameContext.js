import React, { useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";
import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { del } from "../utils/apiBase";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

const Game = React.createContext();

export const GameProvider = ({ children }) => {
  // import
  const { sockets, connectNamespace, disconnectNamespace, setupEventListeners, removeEventListeners } = useSocket();
  const { loggedIn } = useAuth();

  // todo: 각 객체별 구조를 알 수 있도록 초기값 설정
  // todo: 추후 분리

  // sockets (room / subgame)
  const [roomSocket, setRoomSocket] = useState(null);
  const [subgameSocket, setSubgameSocket] = useState(null);
  const [roomNamespace, setRoomNamespace] = useState("");
  const [subgameNamespace, setSubgameNamespace] = useState("");

  // 추후 "대기방" 객체와 "토너먼트" 객체로 데이터 묶기
  // waiting room data
  const [gameData, setGameData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [playersData, setPlayersData] = useState(null);
  const [myPlayerId, setMyPlayerId] = useState(null);

  // tournament data
  const [configData, setConfigData] = useState(null);
  const [bracketData, setBracketData] = useState(null);
  const [subgameData, setSubgameData] = useState({ is_start: false, is_ended: false, start_time: null, winner: null });

  const setWaitingRoomData = async (data) => {
    data.game && setGameData(data.game);
    data.room && setRoomData(data.room);
    data.players && setPlayersData(data.players);
    data.my_player_id && setMyPlayerId(data.my_player_id);
  };

  const clearWaitingRoomData = () => {
    setGameData(null);
    setRoomData(null);
    setPlayersData(null);
    setMyPlayerId(null);
  };

  const clearTournamentData = () => {
    setConfigData(null);
    setBracketData(null);
    setSubgameData({ is_start: false, is_ended: false, start_time: null, winner: null });
  };

  const connectRoomSocket = () => {
    if (sockets[roomNamespace]) return;

    const handleAbortExitRoom = async () => {
      try {
        const resData = await del(API_ENDPOINTS.PLAYERS(myPlayerId));
        navigate("/game/list");
        console.log("플레이어 DELETE 요청 성공", resData);
      } catch (error) {
        console.log("플레이어 DELETE 요청 실패: ", error);
        console.log("들어갔었던 방이 끝나기 전까지 다른 방에 들어갈 수 없음");
      }
    };

    const listeningEventList = ["update_room", "destroyed", "update_tournament", "config"];

    connectNamespace(roomNamespace, {
      onConnectError: () => {
        alert("실시간 통신 연결에 실패하였습니다.");
        handleAbortExitRoom();
      },
      onDisconnect: () => {
        roomSocket.emitWithTime("exited", { my_player_id: myPlayerId });
        removeEventListeners(listeningEventList);
        clearWaitingRoomData();
      },
    });
  };

  const connectNextSubgameSocket = () => {
    if (sockets[subgameNamespace]) return;

    const listeningEventList = ["start", "ended", "update_time_left", "update_scores", "update_track_paddle"];

    connectNamespace(subgameNamespace, {
      onConnectError: () => {
        alert("실시간 통신 연결에 실패하였습니다.");
        handleAbortExit();
      },
      onDisconnect: () => {
        removeEventListeners(listeningEventList);
        clearTournamentData();
      },
    });
  };

  const disconnectRoomSocket = () => {
    if (!sockets[roomNamespace]) return;

    disconnectNamespace(roomNamespace);
    setRoomSocket(null);
  };

  const disconnectSubgameSocket = () => {
    if (!sockets[subgameNamespace]) return;

    disconnectNamespace(sockets[subgameNamespace]);
    setSubgameNamespace(null);
  };

  const setupListenersRoomSocket = () => {
    if (!sockets[roomNamespace]) return;

    setupEventListeners(roomNamespace, [
      {
        event: "update_room",
        handler: (data) => {
          setWaitingRoomData(data);
          // console.log("방 정보 업데이트: ", data);
        },
      },
      {
        event: "destroyed",
        handler: () => {
          if (loggedIn.nickname !== roomData.host) alert("호스트가 나가 방이 사라졌습니다.");
          navigate("/game/list");
        },
      },
      {
        event: "update_tournament",
        handler: (data) => {
          setBracketData(data);
        },
      },
      {
        event: "config",
        handler: (data) => {
          setConfigData(data);
        },
      },
    ]);
  };

  const setupListenersSubgameSocket = () => {
    setupEventListeners(subgameNamespace, [
      {
        event: "start", // 서브게임 시작
        handler: (data) => {
          setSubgameData({ is_start: true, is_ended: false, start_time: data.t_event, winner: null });
        },
      },
      {
        event: "ended", // 서브게임 종료
        handler: (data) => {
          disconnectSubgameSocket();
          setSubgameData({ is_start: false, is_ended: true, start_time: null, winner: data.winner });
        },
      },
      {
        event: "update_time_left",
        handler: (data) => {},
      },
      {
        event: "update_scores",
        handler: (data) => {},
      },
      {
        event: "update_track_ball",
        handler: (data) => {},
      },
      {
        event: "update_track_paddle",
        handler: (data) => {},
      },
    ]);
  };

  // room 소켓 네임스페이스 세팅
  useEffect(() => {
    setRoomNamespace(`/game/room/${roomData?.id}`);
  }, [roomData?.id]);

  // room 소켓 세팅
  useEffect(() => {
    if (sockets[roomNamespace]) {
      setSubgameSocket(sockets[roomNamespace]);
    }
  }, [sockets[roomNamespace]]);

  // subgame 소켓 네임스페이스 세팅
  useEffect(() => {
    if (!bracketData) return;

    const findMatchIndex = (data, playerId) => {
      for (let i = 0; i < data.subgames.length; i++) {
        const round = data.subgames[i];
        for (let j = 0; j < round.length; j++) {
          const match = round[j];
          if (match.player_a.intra_id === playerId || match.player_b.intra_id === playerId) {
            return j;
          }
        }
      }
      return -1;
    };
    const rank = bracketData.rank_ongoing;
    const idx_in_rank = findMatchIndex(bracketData, loggedIn.intra_id);

    setSubgameNamespace(`${roomNamespace}/${rank}/${idx_in_rank}`);
  }, [bracketData]);

  // subgame 소켓 세팅
  useEffect(() => {
    if (sockets[subgameSocket]) {
      setSubgameSocket(sockets[subgameSocket]);
    }
  }, [sockets[subgameSocket]]);

  return (
    <Game.Provider
      value={{
        // data
        roomSocket,
        subgameSocket,
        gameData,
        roomData,
        playersData,
        myPlayerId,
        configData,
        bracketData,
        subgameData,
        // socket
        connectRoomSocket,
        connectNextSubgameSocket,
        disconnectRoomSocket,
        disconnectSubgameSocket,
        setupListenersRoomSocket,
        setupListenersSubgameSocket,
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
