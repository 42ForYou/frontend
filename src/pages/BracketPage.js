import React from "react";
import Bracket from "../components/game/Bracket";

const player = (intra_id, nickname, avatar) => {
  return {
    intra_id: intra_id,
    nickname: nickname,
    avatar: avatar,
  };
};

const BracketPage = () => {
  const { bracketData } = useTournament();

  return <Bracket subgames={bracketData.subgames} />;
};

export default BracketPage;
