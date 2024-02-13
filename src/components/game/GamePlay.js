import React, { useState, useEffect } from "react";
import { useSocket } from "../../context/socketContext";
import PongScene from "./PongScene";
import GameBracket from "./GameBracket";

const GamePlay = () => {
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

  return <div>{isPlaying ? <PongScene /> : <GameBracket />}</div>;
};

export default GamePlay;
