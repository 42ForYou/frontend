import React from "react";
import SubgameBracketModal from "../components/game/SubgameBracketModal";
import SubgameResultModal from "../components/game/SubgameResultModal";
import TournamentResultModal from "../components/game/TournamentResultModal";

const subgame = {
  // 4강전 2경기
  player_a: {
    intra_id: "yeonhkim3",
    nickname: "kimyeonhababo",
    avatar: "./pengdori.jpg",
  },
  player_b: {
    intra_id: "yeonhkim4",
    nickname: "baboyona",
    avatar: "./pengdori.jpg",
  },
  // winner: null, // 경기가 끝나면 정해짐
  winner: "A", // 경기가 끝나면 정해짐
};

const bracketData = {
  n_ranks: 2,
  rank_ongoing: 1,
  subgames: [
    [
      {
        // 4강전 1경기
        player_a: {
          intra_id: "플레이어 1",
          nickname: "yeonhkimbabo",
          avatar: "./pengdori.jpg",
        },
        player_b: {
          intra_id: "플레이어 2",
          nickname: "baboyeonhkim",
          avatar: "./pengdori.jpg",
        },
        winner: "A", // 경기가 끝나면 정해짐
      },
    ],
    [
      {
        // 4강전 1경기
        player_a: {
          intra_id: "yeonhkim",
          nickname: "yeonhkimbabo",
          avatar: "./pengdori.jpg",
        },
        player_b: {
          intra_id: "yeonhkim2",
          nickname: "baboyeonhkim",
          avatar: "./pengdori.jpg",
        },
        winner: null, // 경기가 끝나면 정해짐
      },
      {
        // 4강전 2경기
        player_a: {
          intra_id: "yeonhkim3",
          nickname: "kimyeonhababo",
          avatar: "./pengdori.jpg",
        },
        player_b: {
          intra_id: "yeonhkim4",
          nickname: "baboyona",
          avatar: "./pengdori.jpg",
        },
        winner: null, // 경기가 끝나면 정해짐
      },
    ],
  ],
};

const TestPage = () => {
  return (
    <div>
      <h1>TestPage</h1>
      <TournamentResultModal bracketData={bracketData} />
      {/* <SubgameBracketModal playerA={subgame.player_a} playerB={subgame.player_b} remainingTime={42} /> */}
      {/* <SubgameResultModal playerA={subgame.player_a} playerB={subgame.player_b} winner={subgame.winner} /> */}
    </div>
  );
};

export default TestPage;
