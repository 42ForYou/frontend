import React from "react";
import PongScene from "../../components/game/PongScene";
import { useGame } from "../../context/GameContext";
import LoadingPage from "../LoadingPage";

// todo: 렌더에 필요한 데이터 추가
const PongScenePage = () => {
  const { configData, trackBall } = useGame();

  if (!configData || !trackBall) return <LoadingPage />;

  return <PongScene />;
};

export default PongScenePage;
