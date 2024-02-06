import React, { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";

import LoadingPage from "./LoadingPage";
import WaitingRoomBox from "../components/GameWaitingBox";

import { get } from "../common/apiBase";
import { API_ENDPOINTS } from "../common/apiEndPoints";
import { useNavigate, useParams } from "react-router-dom";

const gameDataDummy = {
  is_tournament: true, // 또는 false
  game_point: 10,
  time_limit: 60,
  n_players: 4,
};

const roomDataDummy = {
  id: 1,
  title: "게임 방 1",
  host: "호스트 닉네임",
  join_players: 2,
};

const playersDataDummy = [
  {
    nickname: "플레이어 1",
    avatar: "https://image.news1.kr/system/photos/2014/2/3/747428/article.jpg/dims/optimize",
  },
  {
    nickname: "플레이어 2",
    avatar: "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5917829644/B.jpg?576000000",
  },
  {
    nickname: "플레이어 3",
    avatar:
      "https://mstatic1.e-himart.co.kr/contents/goods/00/19/48/46/59/0019484659__MW64027_5000188269__M_640_640.jpg",
  },
  {
    nickname: "플레이어 4",
    avatar: "https://ae01.alicdn.com/kf/Sdcfdc1db56d44e82b7fe60fbc11b2daaX.jpg?width=800&height=800&hash=1600",
  },
];

// 차후 필요시 1대1, 토너먼트 방 분리
const GameWaitingPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [gameData, setGameData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [playersData, setPlayersData] = useState(null);

  useEffect(() => {
    console.log("초기값세팅");
    setGameData(gameDataDummy);
    setRoomData(roomDataDummy);
    setPlayersData(playersDataDummy);
  }, []);

  // useEffect(() => {
  //   const fetchWaitingRoomData = async () => {
  //     try {
  //       const resData = await get(API_ENDPOINTS.GAME_ROOM(roomId));
  //       const { game, room, players } = resData.data;
  //       setGameData(game);
  //       setRoomData(room);
  //       setPlayersData(players);
  //     } catch (error) {
  //       // todo: 에러 케이스 별 처리
  //       // 에러 케이스1: 존재하지 않는 방 접근
  //       // 에러 케이스2: 해당 방에 입장해있지 않은 유저가 접속 시도
  //       // 에러 케이스3: 그 외 다른 사유(서버 응답 없음 등)
  //       alert("게임 방에 접속할 수 없습니다. 이전 페이지로 돌아갑니다");
  //       navigate(-1);
  //     }
  //   };
  //   fetchWaitingRoomData();
  // }, [roomId]);

  return (
    <div className="UserProfilePage">
      {gameData && roomData && playersData ? (
        <PageContainer hasNavigationBar={true}>
          <WaitingRoomBox gameData={gameData} roomData={roomData} playersData={playersData} />
        </PageContainer>
      ) : (
        <LoadingPage hasNavigationBar={true} />
      )}
    </div>
  );
};

export default GameWaitingPage;
