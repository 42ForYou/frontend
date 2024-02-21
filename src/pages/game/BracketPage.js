import React from "react";
import Bracket from "../../components/game/Bracket";
import { useGame } from "../../context/GameContext";
import LoadingPage from "../LoadingPage";

const player = (intra_id, nickname, avatar) => {
  return {
    intra_id: intra_id,
    nickname: nickname,
    avatar: avatar,
  };
};

const BracketPage = () => {
  const { bracketData } = useGame();

  if (!bracketData) return <LoadingPage />;

  return <Bracket nRanks={bracketData.n_ranks} subgames={bracketData.subgames} />;
};

export default BracketPage;
