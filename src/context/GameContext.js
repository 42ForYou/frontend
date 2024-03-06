import React, { useContext, useEffect, useRef, useState } from "react";
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
    isNamespaceConnected,
    connectNamespace,
    disconnectNamespace,
    setupEventListenersNamespace,
    removeEventListenersNamespace,
    setupEventListenersSocket,
    removeEventListenersSocket,
    emitNamespace,
  } = useSocket();
  const { loggedIn } = useAuth();

  // todo: 각 객체별 구조를 알 수 있도록 초기값 설정
  // todo: 추후 "대기방" 객체와 "토너먼트" 객체로 데이터 묶기
  // waiting room data
  const [gameData, setGameData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [playersData, setPlayersData] = useState(null);

  // personal data
  const [myPlayerData, setMyPlayerData] = useState({ id: null, host: false });

  // tournament data
  const [bracketData, setBracketData] = useState(null);

  // todo: 추후 subgame context 로 분리
  // subgame data
  const [subgameConfig, setSubgameConfig] = useState(null);
  const [subgameStatus, setSubgameStatus] = useState({
    is_start: false,
    is_ended: false,
    start_time: null,
    player_a: null,
    player_b: null,
    winner: "",
    time_left: 0,
    score_a: 0,
    score_b: 0,
  });

  const ballTrajectory = useRef(null);
  const paddleATrajectory = useRef(null);
  const paddleBTrajectory = useRef(null);
  const [ballTrajectoryVersion, setBallTrajectoryVersion] = useState(0);
  const [paddleATrajectoryVersion, setpaddleATrajectoryVersion] = useState(0);
  const [paddleBTrajectoryVersion, setpaddleBTrajectoryVersion] = useState(0);

  // socket namespace
  const [roomNamespace, setRoomNamespace] = useState("");
  const [subgameNamespace, setSubgameNamespace] = useState("");
  const roomNamespaceRef = useRef(roomNamespace);
  const subgameNamespaceRef = useRef(subgameNamespace);

  // socket events
  const roomDefaultEvents = [
    {
      event: "update_room",
      handler: (data) => {
        if (!data) {
          // 방에 입장해있는 사람이 아닌 경우
          alert("접속이 불가한 방입니다.");
          navigate("/game/list");
        }
        setWaitingRoomData(data);
        // console.log("update_room 이벤트 수신: ", data);
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
        console.log("update_tournament 이벤트 수신: ", data);
        const findSubgameByPlayerNickname = (subgames, nickname) => {
          for (let n = subgames.length - 1; n >= 0; n--) {
            for (let m = 0; m < subgames[n].length; m++) {
              const subgame = subgames[n][m];
              if (subgame.player_a?.nickname === nickname || subgame.player_b?.nickname === nickname) {
                return subgame;
              }
            }
          }
          return null;
        };

        // 다음 강으로 넘어갔다면 subgameStatus 값 업데이트
        if (!bracketData || data.rank_ongoing < bracketData.rank_ongoing) {
          const mySubgame = findSubgameByPlayerNickname(data.subgames, loggedIn.nickname);
          setSubgameStatus({
            is_start: false,
            is_ended: false,
            start_time: null,
            player_a: mySubgame?.player_a,
            player_b: mySubgame?.player_b,
            winner: "",
          });
          console.log("다음 강으로 넘어가 subgameStatus 값 업데이트");
        }
        setBracketData(data);
      },
    },
    {
      event: "config",
      handler: (data) => {
        console.log("config 이벤트 수신: ", data);
        setSubgameConfig(data.config);
      },
    },
  ];
  const subgameDefualtEvents = [
    {
      event: "start", // 서브게임 시작
      handler: (data) => {
        console.log("start 이벤트 수신: ", data);
        setSubgameStatus((prevState) => ({ ...prevState, is_start: true, start_time: data.t_event }));
      },
    },
    {
      event: "ended", // 서브게임 종료
      handler: (data) => {
        console.log("ended 이벤트 수신: ", data);
        setSubgameStatus((prevState) => ({ ...prevState, is_ended: true, winner: data.winner }));
        setBallTrajectoryVersion(0);
        setpaddleATrajectoryVersion(0);
        setpaddleBTrajectoryVersion(0);
        disconnectSubgameSocket();
      },
    },
    {
      event: "update_time_left",
      handler: (data) => {
        console.log("update_time_left 이벤트 수신: ", data);
        setSubgameStatus((prevState) => ({ ...prevState, time_left: data.time_left }));
      },
    },
    {
      event: "update_scores",
      handler: (data) => {
        console.log("update_scores 이벤트 수신: ", data);
        setSubgameStatus((prevState) => ({ ...prevState, score_a: data.score_a, score_b: data.score_b }));
      },
    },
    {
      event: "update_track_ball",
      handler: (data) => {
        console.log("update_track_ball 이벤트 수신: ", data);

        const calculateSegmentTimes = (trajectory) => {
          let accumulatedTime = 0;
          const newSegments = trajectory.segments.map((segment) => {
            const length = Math.sqrt(Math.pow(segment.x_e - segment.x_s, 2) + Math.pow(segment.y_e - segment.y_s, 2));
            const duration = length / trajectory.velocity;
            const newSegment = {
              ...segment,
              t_start: accumulatedTime, // 해당 세그먼트의 시작 시간 (맨 처음 세그먼트의 시작 시간은 0)
              duration: duration, // 해당 세그먼트를 통과하는 데 걸리는 시간
            };
            accumulatedTime += duration;
            return newSegment;
          });

          return { ...trajectory, segments: newSegments };
        };

        ballTrajectory.current = calculateSegmentTimes(data);
        setBallTrajectoryVersion((version) => version + 1);
      },
    },
    {
      event: "update_track_paddle",
      handler: (data) => {
        console.log("update_track_paddle 이벤트 수신: ", data);
        if (data.player === "A") {
          paddleATrajectory.current = data;
          setpaddleATrajectoryVersion((version) => version + 1);
        } else if (data.player === "B") {
          paddleBTrajectory.current = data;
          setpaddleBTrajectoryVersion((version) => version + 1);
        }
      },
    },
  ];

  const setWaitingRoomData = async (data) => {
    if (!data) return;
    data.game && setGameData(data.game);
    data.room && setRoomData(data.room);
    data.players && setPlayersData(data.players);
    data.my_player_id && setMyPlayerData((prevState) => ({ ...prevState, id: data.my_player_id }));
    data.am_i_host && setMyPlayerData((prevState) => ({ ...prevState, host: data.am_i_host }));
  };

  const clearWaitingRoomData = () => {
    setGameData(null);
    setRoomData(null);
    setPlayersData(null);
    setMyPlayerData({ id: null, host: false });
  };

  const clearTournamentData = () => {
    setSubgameConfig(null);
    setBracketData(null);
    setSubgameStatus({ is_start: false, is_ended: false, start_time: null, winner: null });
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
    const setupRoomListeners = (newSocket) => {
      setupEventListenersSocket(newSocket, roomDefaultEvents);
    };

    const newRoomNamespace = `/game/room/${newRoomId}`;
    if (isNamespaceConnected(newRoomNamespace)) return;

    connectNamespace(newRoomNamespace, {
      onConnect: (newSocket) => {
        setupRoomListeners(newSocket);
        setRoomNamespace(newRoomNamespace);
        newSocket.emit("entered", {});
        console.log("룸 소켓 세팅 완료");
      },
      onConnectError: () => {
        alert("실시간 통신 연결에 실패하였습니다. (룸 소켓)");
        handleAbortExitRoom();
      },
      onDisconnect: () => {
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
    const setupSubgameListeners = (newSocket) => {
      setupEventListenersSocket(newSocket, subgameDefualtEvents);
    };

    const newSubgameNamespace = `${roomNamespace}${getSubgameNamespace(newBracketData)}`;
    if (isNamespaceConnected(newSubgameNamespace)) return;

    connectNamespace(newSubgameNamespace, {
      onConnect: (newSocket) => {
        setupSubgameListeners(newSocket);
        setSubgameNamespace(newSubgameNamespace);
        console.log("서브게임 소켓 세팅 완료");
      },
      onConnectError: () => {
        alert("실시간 통신 연결에 실패하였습니다. (서브게임 소켓)");
        handleAbortExit();
      },
      onDisconnect: () => {
        clearTournamentData();
      },
    });
  };

  const disconnectRoomSocket = () => {
    const roomNamespace = roomNamespaceRef.current;
    if (!isNamespaceConnected(roomNamespace)) return;

    const listeningEventList = ["update_room", "destroyed", "update_tournament", "config"];

    emitNamespace(roomNamespace, "exited", { my_player_id: myPlayerData.id });
    removeEventListenersNamespace(roomNamespace, listeningEventList);
    disconnectNamespace(roomNamespace);
  };

  const disconnectSubgameSocket = () => {
    const subgameNamespace = subgameNamespaceRef.current;
    if (!isNamespaceConnected(subgameNamespace)) return;

    const listeningEventList = ["start", "ended", "update_time_left", "update_scores", "update_track_paddle"];

    removeEventListenersNamespace(subgameNamespace, listeningEventList);
    disconnectNamespace(subgameNamespace);
  };

  const setupListenersRoomSocket = (events) => {
    setupEventListenersNamespace(roomNamespace, events);
  };

  const setupListenersSubgameSocket = (events) => {
    setupEventListenersNamespace(subgameNamespace, events);
  };

  const removeListenersRoomSocket = (events) => {
    removeEventListenersNamespace(roomNamespace, events);
  };

  const removeListenersSubgameSocket = (events) => {
    removeEventListenersNamespace(subgameNamespace, events);
  };

  const emitRoomSocket = (event, data) => {
    emitNamespace(roomNamespace, event, data);
  };

  const emitSubgameSocket = (event, data) => {
    emitNamespace(subgameNamespace, event, data);
  };

  useEffect(() => {
    roomNamespaceRef.current = roomNamespace;
  }, [roomNamespace]);

  useEffect(() => {
    subgameNamespaceRef.current = subgameNamespace;
  }, [subgameNamespace]);

  // 서브게임 시작 전 초기 config 설정
  useEffect(() => {
    if (subgameConfig && bracketData) {
      setSubgameStatus((prevState) => ({
        ...prevState,
        time_left: subgameConfig?.time_limit,
        score_a: subgameConfig?.player_a_init_point,
        score_b: subgameConfig?.player_b_init_point,
      }));
    }
  }, [subgameConfig, bracketData]);

  // 상태에 의존한 클린업 수행을 위해 useRef 사용
  useEffect(() => {
    return () => {
      console.log("값 초기화 및 소켓 연결 해제");
      disconnectRoomSocket();
      disconnectSubgameSocket();
      clearWaitingRoomData();
      clearTournamentData();
      setRoomNamespace("");
      setSubgameNamespace("");
    };
  }, []);

  return (
    <Game.Provider
      value={{
        // data
        gameData,
        roomData,
        playersData,
        myPlayerData,
        bracketData,
        subgameConfig,
        subgameStatus,
        ballTrajectory,
        paddleATrajectory,
        paddleBTrajectory,
        ballTrajectoryVersion,
        paddleATrajectoryVersion,
        paddleBTrajectoryVersion,
        // socket
        roomNamespace,
        subgameNamespace,
        connectRoomSocket,
        connectNextSubgameSocket,
        disconnectRoomSocket,
        setupListenersRoomSocket,
        setupListenersSubgameSocket,
        removeListenersRoomSocket,
        removeListenersSubgameSocket,
        emitRoomSocket,
        emitSubgameSocket,
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
