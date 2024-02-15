import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { get } from "../utils/apiBase";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

const useFetchWaitingRoomData = (roomId) => {
  const [waitingRoomData, setWaitingRoomData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // HTTP 요청 로딩 상태
  const [loadError, setLoadError] = useState(null); // HTTP 요청 오류
  const { sockets } = useSocket();
  const namespace = `/game/room/${roomId}`;

  useEffect(() => {
    const fetchWaitingRoomData = async () => {
      setIsLoading(true);
      try {
        const res = await get(API_ENDPOINTS.ROOM(roomId));
        setWaitingRoomData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("대기방 데이터 로드 실패: ", error);
        setLoadError(error);
        setIsLoading(false);
      }
    };

    fetchWaitingRoomData();
  }, [roomId]);

  useEffect(() => {
    const socket = sockets[namespace];
    if (socket) {
      const updateRoomHandler = (data) => {
        setWaitingRoomData(data);
      };

      socket.on("update_room", updateRoomHandler);

      return () => {
        socket.off("update_room", updateRoomHandler);
      };
    }
  }, [sockets, namespace]);

  return { waitingRoomData, isLoading, loadError };
};

export default useFetchWaitingRoomData;
