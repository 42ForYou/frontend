import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

const useRoomData = (roomId) => {
  const socket = useSocket();
  const [gameData, setGameData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [playersData, setPlayersData] = useState(null);
  const [myPlayerId, setMyPlayerId] = useState(null);

  useEffect(() => {
    const fetchWaitingRoomData = async (roomId) => {
      try {
        const resData = await get(API_ENDPOINTS.ROOM(roomId));
        const { game, room, players, my_player_id } = resData.data;
        setGameData(game);
        setRoomData(room);
        setPlayersData(players);
        setMyPlayerId(my_player_id);
        console.log(resData);
      } catch (error) {
        console.log("방 데이터 로드 실패: ", error);
      }
    };
    fetchWaitingRoomData(roomId);
  }, []);

  useEffect(() => {
    if (!socket) return;

    // 방 입장 소켓 이벤트 있을시 여기서 emit

    const handleRoomUpdated = (data) => {
      const { game, room, players, my_player_id } = data;
      setGameData(game);
      setRoomData(room);
      setPlayersData(players);
      setMyPlayerId(my_player_id);
    };

    socket.on("info_room", handleRoomUpdated);

    return () => {
      // 방 퇴장 소켓 이벤트 있을시 여기서 emit
      socket.off("info_room", handleRoomUpdated);
    };
  }, [socket, roomId]);

  return { gameData, roomData, playersData, myPlayerId };
};

export default useRoomData;
