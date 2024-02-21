import React, { useEffect, useState } from "react";
import { useGame } from "../context/GameContext";
import BracketPage from "./BracketPage";
import LoadingPage from "./LoadingPage";

// todo: 게임 플레이 중 나가는 경우 백측과 협의 후 처리 필요
const GamePlayPage = () => {
  const { bracketData, subgameData, connectNextSubgameSocket } = useGame();
  const [showBracket, setShowBracket] = useState(true);
  const [rankOngoing, setRankOngoing] = useState(null);

  // 새로운 대진표가 올 때마다 "강"이 끝났는지 확인 후 업데이트
  useEffect(() => {
    if (!bracketData) return;
    const newRank = bracketData.rank_ongoing;
    if (rankOngoing === newRank) return;
    else if (newRank < 0) {
      // 토너먼트 종료 후 처리 (결과 팝업창 띄우기)
      alert("토너먼트가 종료되었습니다.");
    } else {
      connectNextSubgameSocket(bracketData);
      setRankOngoing(newRank);
    }
  }, [bracketData]);

  useEffect(() => {
    if (bracketData) {
      console.log("대진표 데이터가 갱신되었습니다. 대진표를 띄웁니다");
      setShowBracket(true);
    }
  }, [bracketData]);

  useEffect(() => {
    if (subgameData.is_start && subgameData.config) {
      console.log("매치가 시작하고 설정 데이터가 도착했습니다. 퐁 장면을 띄웁니다");
      // todo: 매치 시작 시간을 기다렸다가 퐁 장면을 띄우도록 수정
      setShowBracket(false);
    }
  }, [subgameData]);

  if (!bracketData) return <LoadingPage />;

  return <div className="GamePlayPage">{showBracket ? <BracketPage /> : "PongScene Page"}</div>;
  // return <div className="GamePlayPage">{showBracket ? <BracketPage /> : <PongScenePage />}</div>;
};

export default GamePlayPage;
