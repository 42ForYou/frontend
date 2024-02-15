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
  const socket = useSocket();

  // 컴포넌트 마운트 후 수신할 이벤트를 등록
  useEffect(() => {
    if (socket) {
      socket.on("info_tournament", (data) => {
        // todo: 대진표 정보를 받아와 렌더링
      });
      // 컴포넌트가 언마운트 되기 전에 이벤트 리스너를 제거
      return () => {
        socket.off("info_tournament");
      };
    }
  }, []);

  return <div>{isPlaying ? <PongScene /> : <TournamentBracket rounds={roundsData} />}</div>;
};

export default GameOngoing;
