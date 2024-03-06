import React from "react";
import StyledButton from "../common/StyledButton";
import CustomModal from "../common/CustomModal";
import { useNavigate } from "react-router-dom";
import PlayerInModal from "./PlayerInModal";
import { useAuth } from "../../context/AuthContext";

// todo: 최종 우승자뿐만 아니라 2, 3위까지도 표시할 수 있도록 수정
const TournamentResultModal = ({ bracketData }) => {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();
  const finalSubgame = bracketData.subgames[0][0];
  const winner = finalSubgame.winner === "A" ? finalSubgame.player_a : finalSubgame.player_b;

  return (
    <div className="TournamentResultModal">
      <CustomModal
        hasCloseButton={false}
        title={"게임 결과"}
        footerButtons={
          <>
            <StyledButton name={"홈으로 이동"} styleType={"secondary"} onClick={() => navigate("/")} />
          </>
        }>
        <div className="d-flex align-items-center justify-content-center px-4">
          <PlayerInModal
            nickname={winner.nickname}
            avatar={winner.avatar}
            isMine={winner.nickname === loggedIn?.nickname}
            isWinner={true}
          />
        </div>
        <h3 className="text-center pt-3">The winner is {winner.nickname}!</h3>
      </CustomModal>
    </div>
  );
};

export default TournamentResultModal;
