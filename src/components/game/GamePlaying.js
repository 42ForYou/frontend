import React, { useState, useEffect } from "react";
import PongScene from "./PongScene";
import Bracket from "./Bracket";

const player = (intra_id, nickname, avatar) => {
  return {
    intra_id: intra_id,
    nickname: nickname,
    avatar: avatar,
  };
};

const players = {
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

const GamePlaying = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // 컴포넌트 마운트 후 소켓 수신할 이벤트를 등록
  useEffect(() => {}, []);

  return <div>{isPlaying ? <PongScene /> : <Bracket players={players} />}</div>;
};

export default GamePlaying;
