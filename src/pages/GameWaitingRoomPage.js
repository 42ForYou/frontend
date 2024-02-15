import React, { useEffect } from "react";
import LoadingPage from "./LoadingPage";
import WaitingRoomBox from "../components/waiting_room/WaitingRoomBox";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useWaitingRoomDataSync from "../hooks/useWaitingRoomDataSync";
import { useSocket } from "../context/SocketContext";
import { del } from "../utils/apiBase";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

// 차후 필요시 1대1, 토너먼트 방 분리
const GameWaitingRoomPage = () => {
  const location = useLocation();
  const myPlayerId = location.state.myPlayerId;
  const navigate = useNavigate();
  const { room_id: roomId } = useParams();
  const { gameData, roomData, playersData, isLoading, loadError } = useWaitingRoomDataSync(roomId);
  const {
    connectNamespace,
    disconnectNamespace,
    sockets,
    setupEventListeners,
    removeEventListeners,
    emitWithTimestamp,
  } = useSocket();
  const namespace = `/game/room/${roomId}`;

  const handleDestroyRoom = () => {
    alert("방이 삭제되었습니다.");
    navigate(-1);
  };

  // todo: 소켓 통신 연결 실패하고 방 나가기 요청도 실패할시 처리가 안됨
  const handleExitWaitingRoom = async () => {
    try {
      const resData = await del(API_ENDPOINTS.PLAYERS(myPlayerId));
      navigate(-1);
      console.log("방 나가기 성공", resData);
    } catch (error) {
      console.log("방 나가기 요청 실패: ", error);
    }
    emitWithTimestamp(namespace, "exited", { player_id: myPlayerId });
  };

  useEffect(() => {
    connectNamespace(namespace, {
      onConnect: () => console.log(`${namespace} connected`),
      onConnectError: (err) => {
        console.error("소켓 연결 에러", err);
        alert("실시간 통신 연결에 실패하였습니다.");
        handleExitWaitingRoom();
      },
      onDisconnect: (reason) => console.log(`${namespace} disconnected`, reason),
    });

    setupEventListeners(namespace, [{ event: "destroyed", handler: handleDestroyRoom }]);

    return () => {
      removeEventListeners(namespace, ["destroyed"]);
      disconnectNamespace(namespace);
    };
  }, [namespace, connectNamespace, disconnectNamespace]);

  useEffect(() => {
    if (!isLoading && loadError) {
      alert("방 정보를 불러오는데 실패했습니다.");
      handleExitWaitingRoom();
    }
  }, [isLoading, loadError, navigate]);

  // todo: 소켓 연결 상태 확인하여 페이지 렌더할 것인지 결정
  const isConnected = sockets[namespace]?.connected || false;

  return (
    <div className="GameWaitingRoomPage">
      {!isLoading && loadError ? (
        <WaitingRoomBox gameData={gameData} roomData={roomData} playersData={playersData} />
      ) : (
        <LoadingPage />
      )}
      {/* {waitingRoomData && isConnected ? <WaitingRoomBox {...waitingRoomData} /> : <LoadingPage />} */}
    </div>
  );
};

export default GameWaitingRoomPage;
