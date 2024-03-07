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
  const {
    roomNamespace,
    bracketData,
    subgameStatus,
    connectNextSubgameSocket,
    getMyFinalSubgameAndRank,
    disconnectRoomSocket,
  } = useGame();
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

    if (rankOngoing === bracketData.rank_ongoing) return; // 현재 진행중인 "강"이 같으면 무시
    const newRankOngoing = bracketData.rank_ongoing;
    const myFinalSubgameAndRank = getMyFinalSubgameAndRank(bracketData.subgames);

    console.log("새로운 대진표가 왔습니다.");
    console.log(newRankOngoing, myFinalSubgameAndRank);

    setShowBracket(true);
    setShowSubgameResultModal(false);
    if (newRankOngoing < 0) {
      // 모든 "강"이 끝남
      setShowTournamentResultModal(true);
    } else if (myFinalSubgameAndRank.rank !== newRankOngoing) {
      // 패배하여 다음 "강"으로 넘어가지 못함
      setShowTournamentResultModal(true);
      disconnectRoomSocket();
    } else {
      // 다음 "강"으로 넘어감
      connectNextSubgameSocket(bracketData);
      setRankOngoing(newRankOngoing);
    }
  }, [bracketData]);

  useEffect(() => {
    if (!subgameStatus.is_start) return;

    const now = new Date().getTime();
    const startTime = subgameStatus.start_time * 1000;
    const delay = startTime - now;

    console.log("서브게임 시작 시간: ", startTime);
    console.log("현재 시간: ", now);
    console.log("서브게임 시뮬레이션까지 대기시간: ", delay);

    const updateRemainingTime = () => {
      const currentNow = new Date().getTime();
      const timeLeft = Math.max(startTime - currentNow, 0) / 1000;
      setRemainingTime(Math.ceil(timeLeft));

      if (timeLeft > 0) {
        setTimeout(updateRemainingTime, 1000); // 1초 후에 다시 업데이트
      } else {
        console.log("서브게임 시뮬레이션까지 대기시간이 끝났습니다.");
        setShowSubgameBracketModal(false);
        setShowBracket(false);
      }
    };

    if (delay > 0) {
      setRemainingTime(Math.ceil(delay / 1000)); // 처음에 남은 시간을 설정
      setShowSubgameBracketModal(true);
      setTimeout(updateRemainingTime, 1000); // 1초 후에 남은 시간 업데이트 시작
    } else {
      console.log("delay가 0보다 작습니다.");
    }
    console.log("서브게임 시작");

    return () => clearTimeout(updateRemainingTime);
  }, [subgameStatus.is_start]);

  //
  useEffect(() => {
    if (subgameStatus.is_ended) {
      if (!showSubgameResultModal) setShowSubgameResultModal(true);
      console.log("서브게임 결과 모달창 띄우기");
    } else {
      if (showSubgameResultModal) setShowSubgameResultModal(false);
      console.log("서브게임 결과 모달창 닫기");
    }
  }, [subgameStatus.is_ended]);

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
