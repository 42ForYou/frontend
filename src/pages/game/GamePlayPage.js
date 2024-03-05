import React, { useEffect, useState } from "react";
import { useGame } from "../../context/GameContext";
import BracketPage from "./BracketPage";
import PongScenePage from "./PongScenePage";
import { useNavigate } from "react-router-dom";
import TournamentResultModal from "../../components/game/TournamentResultModal";
import SubgameBracketModal from "../../components/game/SubgameBracketModal";
import SubgameResultModal from "../../components/game/SubgameResultModal";

const GamePlayPage = () => {
  const navigate = useNavigate();
  const { roomNamespace, bracketData, subgameStatus, connectNextSubgameSocket } = useGame();
  const [showBracket, setShowBracket] = useState(true);
  const [showTournamentResultModal, setShowTournamentResultModal] = useState(false);
  const [showSubgameResultModal, setShowSubgameResultModal] = useState(false);
  const [showSubgameBracketModal, setShowSubgameBracketModal] = useState(false);
  const [rankOngoing, setRankOngoing] = useState(null);

  useEffect(() => {
    if (!roomNamespace) {
      alert("입장이 불가한 게임입니다.");
      navigate("/game/list");
    }
  }, []);

  // 새로운 대진표가 옴
  useEffect(() => {
    if (!bracketData) return;

    console.log("대진표 데이터가 갱신되었습니다.");

    const newRank = bracketData.rank_ongoing;
    // 현재 진행중인 "강"의 대진표가 갱신 (데이터만 받고 띄우지는 않는다)
    if (rankOngoing === newRank) return;

    // 이번 강이 종료되었을 때
    setShowBracket(true);
    if (newRank < 0) {
      // 모든 "강" 종료
      setShowTournamentResultModal(true);
    } else {
      // 다음 "강"으로 넘어감
      connectNextSubgameSocket(bracketData);
      setRankOngoing(newRank);
    }
  }, [bracketData]);

  useEffect(() => {
    if (!subgameStatus.is_start) return;

    const now = new Date().getTime();
    const delay = subgameStatus.start_time * 1000 - now;

    setShowSubgameBracketModal(true);
    console.log("서브게임 시작까지 남은 시간: ", delay);

    if (delay > 0) {
      setTimeout(() => {
        setShowSubgameBracketModal(false);
        setShowBracket(false);
      }, delay);
    } else {
      console.log("delay가 0보다 작습니다.");
    }
    console.log("서브게임 시작");
  }, [subgameStatus]);

  useEffect(() => {
    if (!subgameStatus.is_ended) return;
    setShowSubgameResultModal(true);
  }, [subgameStatus]);

  return (
    <div className="GamePlayPage">
      {showBracket ? <BracketPage /> : <PongScenePage />}
      {showTournamentResultModal && <TournamentResultModal content={"게임 결과"} />}
      {showSubgameResultModal && <SubgameResultModal content={"서브게임 결과"} />}
      {showSubgameBracketModal && <SubgameBracketModal content={"서브게임 대진표"} />}
    </div>
  );
};

export default GamePlayPage;
