import React, { useEffect } from "react";
import LoadingPage from "./LoadingPage";
import WaitingRoomBox from "../components/waiting_room/WaitingRoomBox";
import { useNavigate, useParams } from "react-router-dom";
import useWaitingRoomDataSync from "../hooks/useWaitingRoomDataSync";
import { useSocket } from "../context/SocketContext";

// 차후 필요시 1대1, 토너먼트 방 분리
const GameWaitingRoomPage = () => {
  const navigate = useNavigate();
  const { room_id: roomId } = useParams();
  const { gameData, roomData, playersData, myPlayerId, isLoading, loadError } = useWaitingRoomDataSync(roomId);
  const { connectNamespace, disconnectNamespace, sockets, setupEventListeners, removeEventListeners } = useSocket();
  const namespace = `/game/room/${roomId}`;

  const handleDestroyRoom = () => {
    alert("방이 삭제되었습니다.");
    navigate(-1);
  };

  useEffect(() => {
    connectNamespace(namespace, {
      onConnect: () => console.log(`${namespace} connected`),
      onConnectError: (err) => {
        console.error("소켓 연결 에러", err);
        alert("실시간 통신 연결에 실패하였습니다.");
        navigate(-1);
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
      navigate(-1);
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
