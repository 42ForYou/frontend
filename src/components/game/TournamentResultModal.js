import React from "react";
import StyledButton from "../common/StyledButton";
import CustomModal from "../common/CustomModal";
import { useNavigate } from "react-router-dom";
import PlayerInModal from "./PlayerInModal";
import { useGame } from "../../context/GameContext";
import { useAuth } from "../../context/AuthContext";

const getWinnerNickname = (subgame) => {
  if (subgame.winner === "A") return subgame.player_a.nickname;
  else return subgame.player_b.nickname;
};

const rankToString = (rank) => {
  if (rank === 0) return "결승전";
  else if (rank === 1) return "4강";
};

const TournamentFinalResult = ({ finalSubgame }) => {
  const { loggedIn } = useAuth();
  const winnerNickname = getWinnerNickname(finalSubgame);

  return (
    <>
      <h3 className="text-center">이번 토너먼트의 우승자: {winnerNickname}</h3>
      <h3 className="text-center">
        {winnerNickname === loggedIn.nickname ? "우승을 축하합니다!" : "아쉽게 우승을 놓쳤습니다."}
      </h3>
      {/* <div className="d-flex align-items-center justify-content-center px-4">
        <PlayerInModal
          nickname={winner.nickname}
          avatar={winner.avatar}
          isMine={winner.nickname === loggedIn?.nickname}
          isWinner={true}
        />
      </div>
      <h3 className="text-center pt-3">The winner is {winner.nickname}!</h3> */}
    </>
  );
};

const TournamentMiddleResult = ({ myFinalSubgame }) => {
  return (
    <>
      <h3 className="text-center">You are out of the game</h3>
      <h4 className="text-center">{getWinnerNickname(myFinalSubgame)}에게 패배했습니다.</h4>
    </>
  );
};

const TournamentResultModal = ({ bracketData }) => {
  const { getMyFinalSubgameAndRank } = useGame();
  const { subgame: myFinalSubgame, rank: myFinalRank } = getMyFinalSubgameAndRank(bracketData.subgames);
  const navigate = useNavigate();

  return (
    <div className="TournamentResultModal">
      <CustomModal
        hasCloseButton={false}
        title={"게임 결과"}
        footerButtons={<StyledButton name={"홈으로 이동"} styleType={"secondary"} onClick={() => navigate("/")} />}>
        {bracketData.rank_ongoing === -1 ? (
          <TournamentFinalResult finalSubgame={bracketData.subgames[0][0]} />
        ) : (
          <TournamentMiddleResult myFinalSubgame={myFinalSubgame} />
        )}
        <h4 className="text-center">나의 최종 진출: {rankToString(myFinalRank)}</h4>
      </CustomModal>
    </div>
  );
};

export default TournamentResultModal;
