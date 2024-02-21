import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "./SocketContext";
import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { del } from "../utils/apiBase";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

const Game = React.createContext();

// todo: 참여자가 아닌 유저가 직접 주소창에 방 이름 입력하여 들어가는 케이스 걸러내기
export const GameProvider = ({ children }) => {
  // import
  const navigate = useNavigate();
  const {
    sockets,
    connectNamespace,
    disconnectNamespace,
    setupEventListenersNamespace,
    removeEventListenersNamespace,
    setupEventListenersSocket,
    removeEventListenersSocket,
  } = useSocket();
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
  // todo: 추후 am_i_host 적용
  const [gameData, setGameData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [playersData, setPlayersData] = useState(null);

  // personal data
  const [myPlayerData, setMyPlayerData] = useState({ id: null, host: false });

  // tournament data
  const [configData, setConfigData] = useState(null);
  const [bracketData, setBracketData] = useState(null);
  const [subgameData, setSubgameData] = useState({ is_start: false, is_ended: false, start_time: null, winner: null });

  const setWaitingRoomData = async (data) => {
    if (!data) return;
    data.game && setGameData(data.game);
    data.room && setRoomData(data.room);
    data.players && setPlayersData(data.players);
    data.my_player_id && setMyPlayerData({ ...myPlayerData, id: data.my_player_id });
    data.am_i_host && setMyPlayerData({ ...myPlayerData, host: data.am_i_host });
  };

  const clearWaitingRoomData = () => {
    setGameData(null);
    setRoomData(null);
    setPlayersData(null);
    setMyPlayerData(useState({ id: null, host: false }));
  };

  const clearTournamentData = () => {
    setConfigData(null);
    setBracketData(null);
    setSubgameData({ is_start: false, is_ended: false, start_time: null, winner: null });
  };

  const connectRoomSocket = (newRoomId) => {
    const handleAbortExitRoom = async () => {
      try {
        const resData = await del(API_ENDPOINTS.PLAYERS(myPlayerData.id));
        navigate("/game/list");
        console.log("플레이어 DELETE 요청 성공", resData);
      } catch (error) {
        console.log("플레이어 DELETE 요청 실패: ", error);
        console.log("들어갔었던 방이 끝나기 전까지 다른 방에 들어갈 수 없음");
      }
    };

    const newRoomNamespace = `/game/room/${newRoomId}`;
    const listeningEventList = ["update_room", "destroyed", "update_tournament", "config"];

    if (sockets[newRoomNamespace]) return;
    setRoomNamespace(newRoomNamespace);

    connectNamespace(newRoomNamespace, {
      onConnect: (newSocket) => {
        setRoomSocket(newSocket);
        setupListenersRoomSocket(newSocket);
        newSocket.emit("entered", {});
        console.log("룸 소켓 세팅 완료");
      },
      onConnectError: () => {
        alert("실시간 통신 연결에 실패하였습니다.");
        handleAbortExitRoom();
      },
      onDisconnect: () => {
        removeEventListenersNamespace(listeningEventList);
        clearWaitingRoomData();
      },
    });
  };

  const connectNextSubgameSocket = (newBracketData) => {
    const getSubgameNamespace = (bracketData) => {
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
      return `/${rank}/${idx_in_rank}`;
    };

    const newSubgameNamespace = `${roomNamespace}${getSubgameNamespace(newBracketData)}`;
    const listeningEventList = ["start", "ended", "update_time_left", "update_scores", "update_track_paddle"];

    if (sockets[newSubgameNamespace]) return;

    connectNamespace(newSubgameNamespace, {
      onConnect: (newSocket) => {
        setSubgameSocket(newSocket);
        setupListenersSubgameSocket(newSocket);
        console.log("서브게임 소켓 세팅 완료");
      },
      onConnectError: () => {
        alert("실시간 통신 연결에 실패하였습니다.");
        handleAbortExit();
      },
      onDisconnect: () => {
        removeEventListenersNamespace(listeningEventList);
        clearTournamentData();
      },
    });
  };

  const disconnectRoomSocket = () => {
    if (!sockets[roomNamespace]) return;

    roomSocket.emitWithTime("exited", { my_player_id: myPlayerData.id });
    disconnectNamespace(roomNamespace);
    setRoomSocket(null);
  };

  const disconnectSubgameSocket = () => {
    if (!sockets[subgameNamespace]) return;

    disconnectNamespace(sockets[subgameNamespace]);
    setSubgameNamespace(null);
  };

  const setupListenersRoomSocket = (newRoomSocket) => {
    setupEventListenersSocket(newRoomSocket, [
      {
        event: "update_room",
        handler: (data) => {
          if (!data) {
            // 방에 입장해있는 사람이 아닌 경우
            alert("접속이 불가한 방입니다.");
            navigate("/game/list");
          }
          setWaitingRoomData(data);
          console.log("update_room 이벤트 수신: ", data);
        },
      },
      {
        event: "destroyed",
        handler: () => {
          if (myPlayerData.host === false) alert("호스트가 나가 방이 사라졌습니다.");
          navigate("/game/list");
        },
      },
      {
        event: "update_tournament",
        handler: (data) => {
          setBracketData(data);
          console.log("update_tournament 이벤트 수신: ", data);
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

  const setupListenersSubgameSocket = (newSubgameSocket) => {
    setupEventListenersSocket(newSubgameSocket, [
      {
        event: "start", // 서브게임 시작
        handler: (data) => {
          console.log("start 이벤트 수신");
          setSubgameData({ is_start: true, is_ended: false, start_time: data.t_event, winner: null });
        },
      },
      {
        event: "ended", // 서브게임 종료
        handler: (data) => {
          console.log("ended 이벤트 수신");
          setSubgameData({ is_start: false, is_ended: true, start_time: null, winner: data.winner });
          disconnectSubgameSocket();
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

  return (
    <Game.Provider
      value={{
        // data
        gameData,
        roomData,
        playersData,
        myPlayerData,
        configData,
        bracketData,
        subgameData,
        // socket
        roomSocket,
        subgameSocket,
        roomNamespace,
        connectRoomSocket,
        connectNextSubgameSocket,
        disconnectRoomSocket,
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
