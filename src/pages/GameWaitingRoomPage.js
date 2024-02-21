import React, { useEffect } from "react";
import WaitingRoomBox from "../components/waiting_room/WaitingRoomBox";
import { useParams, useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import LoadingPage from "./LoadingPage";

const GameWaitingRoomPage = () => {
  const { roomSocket, gameData, roomData, playersData, connectRoomSocket, setupListenersRoomSocket } = useGame();
  const navigate = useNavigate();
  const { room_id } = useParams();

  // 마운트시에 room 소켓 연결 수립
  useEffect(() => {
    connectRoomSocket(room_id);
    console.log("연결 수립 시도");
  }, []);

  // room 소켓의 연결이 수립되면 리스너를 세팅
  useEffect(() => {
    if (!roomSocket || !gameData) return;

    const navigateToPlayPage = () => {
      navigate(`/game/play/${gameData.game_id}`);
    };

    setupListenersRoomSocket();
    roomSocket.on("update_tournament", navigateToPlayPage);

    return () => {
      roomSocket.off("update_tournament", navigateToPlayPage);
    };
  }, [roomSocket, gameData]);

  if (!roomData) return <LoadingPage />;

  return (
    <div className="GameWaitingRoomPage">
      {gameData && roomData && playersData && (
        <WaitingRoomBox gameData={gameData} roomData={roomData} playersData={playersData} />
      )}
    </div>
  );
};

export default GameWaitingRoomPage;
