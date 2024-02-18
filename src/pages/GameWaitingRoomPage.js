import React, { useEffect } from "react";
import WaitingRoomBox from "../components/waiting_room/WaitingRoomBox";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import { del } from "../utils/apiBase";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import { useTournament } from "../context/TournamentContext";
import { useAuth } from "../context/AuthContext";

const GameWaitingRoomPage = () => {
  const { loggedIn } = useAuth();
  const {
    setGameData,
    setRoomData,
    setPlayersData,
    gameData,
    roomData,
    playersData,
    myPlayerId,
    bracketData,
    setBracketData,
    resetTournamentData,
  } = useTournament();
  const navigate = useNavigate();
  const { sockets, connectNamespace, disconnectNamespace, setupEventListeners, removeEventListeners } = useSocket();
  const namespace = `/game/room/${roomData?.id}`;

  const updateRoomHandler = (data) => {
    setGameData(data.game);
    setRoomData(data.room);
    setPlayersData(data.players);
    console.log("방 정보 업데이트: ", data);
  };

  const roomDestroyedHandler = () => {
    if (loggedIn.nickname !== roomData.host) alert("호스트가 나가 방이 사라졌습니다.");
    navigate("/game/list");
  };

  const updateBracketHandler = (data) => {
    setBracketData(data);
    navigate(`/game/play/${gameData.id}`);
  };

  // todo: 소켓 통신 연결 실패하고 방 나가기 요청도 실패할시 처리가 안됨
  // 소켓 통신 연결 후에 방 입장을 해야하나?
  const handleAbortExit = async () => {
    try {
      const resData = await del(API_ENDPOINTS.PLAYERS(myPlayerId));
      navigate("/game/list");
      console.log("방 나가기 성공", resData);
    } catch (error) {
      console.log("방 나가기 요청 실패: ", error);
    }
  };

  useEffect(() => {
    if (!roomData || !roomData.id) {
      alert("방에 입장할 수 없습니다.");
      navigate(-1);
    }
    connectNamespace(namespace, {
      onConnectError: () => {
        alert("실시간 통신 연결에 실패하였습니다.");
        handleAbortExit();
      },
      onDisconnect: () => {
        resetTournamentData();
      },
    });

    setupEventListeners(namespace, [
      {
        event: "update_room",
        handler: updateRoomHandler,
      },
      { event: "destroyed", handler: roomDestroyedHandler },
      {
        event: "update_tournament",
        handler: updateBracketHandler,
      },
    ]);

    return () => {
      removeEventListeners(namespace, ["update_room", "destroyed", "updateBracketHandler"]);
      if (!bracketData) {
        disconnectNamespace(namespace);
      }
    };
  }, [namespace]);

  useEffect(() => {
    if (sockets[namespace]) {
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = "";
        sockets[namespace].emitWithTime("exited", { my_player_id: myPlayerId });
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      setupEventListeners(namespace, [
        {
          event: "update_room",
          handler: updateRoomHandler,
        },
        { event: "destroyed", handler: roomDestroyedHandler },
      ]);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [sockets[namespace]]);

  return (
    <div className="GameWaitingRoomPage">
      {gameData && roomData && playersData && (
        <WaitingRoomBox gameData={gameData} roomData={roomData} playersData={playersData} />
      )}
    </div>
  );
};

export default GameWaitingRoomPage;
