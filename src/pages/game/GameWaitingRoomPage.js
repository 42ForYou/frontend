import React, { useEffect } from "react";
import WaitingRoomBox from "../../components/waiting_room/WaitingRoomBox";
import { useParams, useNavigate } from "react-router-dom";
import { useGame } from "../../context/GameContext";
import LoadingPage from "../LoadingPage";

const GameWaitingRoomPage = () => {
  const {
    roomNamespace,
    gameData,
    roomData,
    playersData,
    myPlayerData,
    connectRoomSocket,
    setupListenersRoomSocket,
    removeListenersRoomSocket,
  } = useGame();
  const navigate = useNavigate();
  const { room_id } = useParams();

  // 마운트시에 room 소켓 연결 수립
  useEffect(() => {
    connectRoomSocket(room_id);
  }, [room_id]);

  // room 소켓의 연결이 수립되면 리스너를 세팅
  useEffect(() => {
    if (!roomNamespace || !gameData) return;

    const navigateToPlayPage = () => {
      navigate(`/game/play/${gameData.game_id}`);
    };
    const events = [{ event: "update_tournament", handler: navigateToPlayPage }];
    setupListenersRoomSocket(events);

    return () => {
      removeListenersRoomSocket(events);
    };
  }, [roomNamespace, gameData]);

  if (!roomData) return <LoadingPage />;

  return (
    <div className="GameWaitingRoomPage">
      {gameData && roomData && playersData && (
        <WaitingRoomBox gameData={gameData} roomData={roomData} playersData={playersData} myPlayerData={myPlayerData} />
      )}
    </div>
  );
};

export default GameWaitingRoomPage;
