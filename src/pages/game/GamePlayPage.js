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
  const [remainingTime, setRemainingTime] = useState(0);

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
    const startTime = subgameStatus.start_time * 1000;
    const delay = startTime - now;

    console.log("서브게임 시뮬레이션까지 대기시간: ", delay / 2);

    const updateRemainingTime = () => {
      const currentNow = new Date().getTime();
      const timeLeft = Math.max(startTime - currentNow, 0) / 1000 / 2;
      setRemainingTime(Math.ceil(timeLeft));

      if (timeLeft > 0) {
        setTimeout(updateRemainingTime, 1000); // 1초 후에 다시 업데이트
      } else {
        setShowSubgameBracketModal(false);
        setShowBracket(false);
      }
    };

    if (delay > 0) {
      setRemainingTime(Math.ceil(delay / 1000 / 2)); // 처음에 남은 시간을 설정
      setShowSubgameBracketModal(true);
      setTimeout(updateRemainingTime, 1000); // 1초 후에 남은 시간 업데이트 시작
    } else {
      console.log("delay가 0보다 작습니다.");
    }
    console.log("서브게임 시작");

    return () => clearTimeout(updateRemainingTime);
  }, [subgameStatus]);

  useEffect(() => {
    if (!subgameStatus.is_ended) return;
    setShowSubgameResultModal(true);
  }, [subgameStatus]);

  return (
    <div className="GamePlayPage">
      {showBracket ? <BracketPage /> : <PongScenePage />}
      {showTournamentResultModal && <TournamentResultModal bracketData={bracketData} />}
      {showSubgameResultModal && (
        <SubgameResultModal
          playerA={subgameStatus.player_a}
          playerB={subgameStatus.player_b}
          winner={subgameStatus.winner}
        />
      )}
      {showSubgameBracketModal && (
        <SubgameBracketModal
          playerA={subgameStatus.player_a}
          playerB={subgameStatus.player_b}
          remainingTime={remainingTime}
        />
      )}
    </div>
  );
};

export default GamePlayPage;
