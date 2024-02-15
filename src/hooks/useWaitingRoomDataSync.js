import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { get } from "../utils/apiBase";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

const useWaitingRoomDataSync = (roomId) => {
  const { sockets, connectNamespace, disconnectNamespace, setupEventListeners, removeEventListeners } = useSocket();
  const [gameData, setGameData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [playersData, setPlayersData] = useState(null);
  const [myPlayerId, setMyPlayerId] = useState(null);
  const namespace = `/game/room/${roomId}`;

  const setNewRoomData = (newRoomData) => {
    const { game, room, players, my_player_id } = newRoomData;
    setGameData(game);
    setRoomData(room);
    setPlayersData(players);
    // todo: 소켓 통신의 경우에도 my_player_id를 받는지 확인
    setMyPlayerId(my_player_id);
  };

  useEffect(() => {
    connectNamespace(namespace);

    const fetchWaitingRoomData = async (roomId) => {
      try {
        const resData = await get(API_ENDPOINTS.ROOM(roomId));
        setNewRoomData(resData.data);
      } catch (error) {
        console.log("방 데이터 로드 실패: ", error);
      }
    };

    fetchWaitingRoomData(roomId);
  }, [namespace]);

  useEffect(() => {
    if (!sockets[namespace]) return;
    const eventListeners = [
      {
        event: "update_room",
        handler: (data) => {
          setNewRoomData(data);
        },
      },
    ];
    setupEventListeners(namespace, eventListeners);

    return () => {
      removeEventListeners(
        namespace,
        eventListeners.map((listener) => listener.event)
      );
      disconnectNamespace(namespace);
    };
  }, [sockets, namespace]);

  return { gameData, roomData, playersData, myPlayerId };
};

export default useWaitingRoomDataSync;
