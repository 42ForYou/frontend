import React, { useEffect, useState } from "react";
import Bracket from "../components/game/Bracket";
import PongScene from "../components/game/PongScene";

const player = (intra_id, nickname, avatar) => {
  return {
    intra_id: intra_id,
    nickname: nickname,
    avatar: avatar,
  };
};

const dummy4Players = {
  players: [
    [
      [
        player("intra_id_0_0_0", "nickname_0_0_0", "avatar_0_0_0"),
        player("intra_id_0_0_1", "nickname_0_0_1", "avatar_0_0_1"),
      ],
    ],
    [
      [
        player("intra_id_1_0_0", "nickname_1_0_0", "avatar_1_0_0"),
        player("intra_id_1_0_1", "nickname_1_0_1", "avatar_1_0_1"),
      ],
      [
        player("intra_id_1_1_0", "nickname_1_1_0", "avatar_1_1_0"),
        player("intra_id_1_1_1", "nickname_1_1_1", "avatar_1_1_1"),
      ],
    ],
  ],
};

const dummy2Players = {
  players: [
    [
      [
        player("intra_id_0_0_0", "nickname_0_0_0", "avatar_0_0_0"),
        player("intra_id_0_0_1", "nickname_0_0_1", "avatar_0_0_1"),
      ],
    ],
  ],
};

// todo: PongScenePage, BracketPage 차후 별도의 파일로 분리

const PongScenePage = () => {
  return <PongScene />;
};

const BracketPage = () => {
  return <Bracket players={dummy4Players} />;
  // return <Bracket players={dummy2Players} />;
};

// todo: 해당 게임에 참가하지 않는 유저가 접속 시도시 리다이렉팅
// todo: 현 상태에 따라 대진표 혹은 게임 플레이 화면을 보여줌
const GamePlayPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // 컴포넌트 마운트 후 소켓 수신할 이벤트를 등록
  useEffect(() => {}, []);

  return (
    <div className="GamePlayPage">
      <div>{isPlaying ? <PongScenePage /> : <BracketPage />}</div>
    </div>
  );
};

export default GamePlayPage;
