import React, { useState, useEffect } from "react";
import { useSocket } from "../../context/SocketContext";
import PongScene from "./PongScene";
import TournamentBracket from "./TournamentBracket";

const roundsData = [
  {
    matches: [
      { participant1: "Player 1", participant2: "Player 2" },
      { participant1: "Player 3", participant2: "Player 4" },
    ],
  },
  {
    matches: [{ participant1: "Winner 1", participant2: "Winner 2" }],
  },
  // 추가 라운드 정보를 이곳에 포함할 수 있습니다.
];

const GameOngoing = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // 컴포넌트 마운트 후 소켓 수신할 이벤트를 등록
  useEffect(() => {}, []);

  return <div>{isPlaying ? <PongScene /> : <TournamentBracket rounds={roundsData} />}</div>;
};

export default GameOngoing;
