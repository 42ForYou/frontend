import React, { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
import WaitingRoomBox from "../components/waiting_room/WaitingRoomBox";
import { useNavigate, useParams } from "react-router-dom";
import useWaitingRoomDataSync from "../hooks/useWaitingRoomDataSync";
import { useSocket } from "../context/SocketContext";

// 차후 필요시 1대1, 토너먼트 방 분리
const GameWaitingRoomPage = () => {
  const { room_id } = useParams();
  const { gameData, roomData, playersData, myPlayerId } = useWaitingRoomDataSync(room_id);
  const navigate = useNavigate();
  const socket = useSocket().sockets[`/game/room/${room_id}`];

  const handleLeaveWaitingRoom = (e) => {
    console.log("사용자가 방을 떠남");
    if (socket) {
      socket.emit("leave", { my_player_id: myPlayerId });
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleLeaveWaitingRoom);
    return () => {
      window.removeEventListener("beforeunload", handleLeaveWaitingRoom);
    };
  }, [socket, myPlayerId]);

  useEffect(() => {
    if (!roomData) {
      alert("방 정보를 불러오는데 실패했습니다.");
      navigate(-1);
    }
  }, [roomData, navigate]);

  return (
    <div className="GameWaitingRoomPage">
      {gameData && roomData && playersData ? (
        <WaitingRoomBox gameData={gameData} roomData={roomData} playersData={playersData} myPlayerId={myPlayerId} />
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default GameWaitingRoomPage;
