import React, { useEffect, useState } from "react";

import LoadingPage from "./LoadingPage";
import WaitingRoomBox from "../components/room/WaitingRoomBox";

import { get } from "../common/apiBase";
import { API_ENDPOINTS } from "../common/apiEndpoints";
import { useNavigate, useParams } from "react-router-dom";
import ContentContainer from "../components/layout/ContentContainer";

// 차후 필요시 1대1, 토너먼트 방 분리
const GameWaitingRoomPage = () => {
  const { room_id } = useParams();
  const navigate = useNavigate();
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
        navigate(-1);
      }
    };
    fetchWaitingRoomData(room_id);
  }, []);

  return (
    <div className="UserProfilePage">
      <ContentContainer>
        <h1>Game Waiting Room</h1>
        {gameData && roomData && playersData ? (
          <WaitingRoomBox gameData={gameData} roomData={roomData} playersData={playersData} myPlayerId={myPlayerId} />
        ) : (
          <LoadingPage />
        )}
      </ContentContainer>
    </div>
  );
};

export default GameWaitingRoomPage;
