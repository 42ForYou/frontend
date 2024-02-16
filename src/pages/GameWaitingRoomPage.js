import React, { useEffect } from "react";
import WaitingRoomBox from "../components/waiting_room/WaitingRoomBox";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import { del } from "../utils/apiBase";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import { useTournament } from "../context/TournamentContext";

// 차후 필요시 1대1, 토너먼트 방 분리
const GameWaitingRoomPage = () => {
  const { setTournamentData, gameData, roomData, playersData, myPlayerId, resetTournamentData } = useTournament();
  const navigate = useNavigate();
  const { connectNamespace, disconnectNamespace, setupEventListeners, removeEventListeners } = useSocket();
  const namespace = `/game/room/${roomData?.id}`;
  const socket = useSocket().sockets[namespace];

  const updateRoomHandler = (data) => {
    setTournamentData(data);
    console.log("방 정보 업데이트", data);
  };

  const roomDestroyedHandler = () => {
    alert("방이 삭제되었습니다.");
    navigate(-1);
  };

  // todo: 소켓 통신 연결 실패하고 방 나가기 요청도 실패할시 처리가 안됨
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
    // 존재하지 않는 방에 들어갔거나 룸 데이터가 없는 상태로 입장 시도하는 경우
    if (!roomData || !roomData.id) {
      alert("입장할 수 없는 방입니다.");
      navigate(-1);
    }

    connectNamespace(namespace, {
      onConnect: () => console.log(`${namespace} connected`),
      onConnectError: (err) => {
        console.error("소켓 연결 에러", err);
        alert("실시간 통신 연결에 실패하였습니다.");
        handleAbortExit();
      },
      onDisconnect: (reason) => {
        console.log(`${namespace} disconnected`, reason);
        resetTournamentData();
      },
    });

    setupEventListeners(namespace, [
      {
        event: "update_room",
        handler: updateRoomHandler,
      },
      { event: "destroyed", handler: roomDestroyedHandler },
    ]);

    return () => {
      removeEventListeners(namespace, ["update_room", "destroyed"]);
      disconnectNamespace(namespace);
    };
  }, [namespace]);

  // todo: 소켓 연결 상태 확인하여 페이지 렌더할 것인지 결정
  const isConnected = socket?.connected || false;

  return (
    <div className="GameWaitingRoomPage">
      {gameData && roomData && playersData && (
        <WaitingRoomBox gameData={gameData} roomData={roomData} playersData={playersData} />
      )}
    </div>
  );
};

export default GameWaitingRoomPage;
