import React, { useEffect, useState } from "react";
import { useGame } from "../../context/GameContext";
import BracketPage from "./BracketPage";
import PongScenePage from "./PongScenePage";
import { useNavigate } from "react-router-dom";
import GameResultModal from "../../components/game/GameResultModal";

const GamePlayPage = () => {
  const navigate = useNavigate();
  const { roomSocket, bracketData, subgameData, connectNextSubgameSocket } = useGame();
  const [showBracket, setShowBracket] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [rankOngoing, setRankOngoing] = useState(null);

  useEffect(() => {
    if (!roomSocket) {
      alert("입장이 불가한 게임입니다.");
      navigate("/game/list");
    }
  });

  // 새로운 대진표가 옴
  useEffect(() => {
    if (!bracketData) return;

    console.log("대진표 데이터가 갱신되었습니다.");

    const newRank = bracketData.rank_ongoing;
    // 1. 현재 "강"의 대진표가 갱신
    if (rankOngoing === newRank) return;
    // 2. 토너먼트 종료
    else if (newRank < 0) {
      alert("토너먼트가 종료되었습니다.");
      setShowBracket(true);
      setShowModal(true);
      // 결과 팝업창 띄우기
    }
    // 3. 다음 "강"으로 넘어감
    else {
      connectNextSubgameSocket(bracketData);
      setRankOngoing(newRank);
      setShowBracket(true);
    }
  }, [bracketData]);

  useEffect(() => {
    if (!subgameData.is_start) return;

    const now = new Date().getTime();
    const delay = subgameData.start_time * 1000 - now;
    console.log("서브게임 시작 시간: ", subgameData.start_time * 1000);
    console.log("현재 시간: ", now);
    if (delay > 0) {
      setTimeout(() => {
        setShowBracket(false);
      }, delay);
    } else {
      // todo: 예외 처리
      console.log("delay가 0보다 작습니다.");
      setShowBracket(false);
    }
  }, [subgameData]);

  return (
    <div className="GamePlayPage">
      {showBracket ? <BracketPage /> : <PongScenePage />}
      {showModal && <GameResultModal result={"게임 결과"} />}
    </div>
  );
};

export default GamePlayPage;
