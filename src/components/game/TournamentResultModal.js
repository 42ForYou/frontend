import React from "react";
import StyledButton from "../common/StyledButton";
import CustomModal from "../common/CustomModal";
import { useNavigate } from "react-router-dom";

const TournamentResultModal = ({ content }) => {
  const navigate = useNavigate();

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
        <div className="content">{content}</div>
      </CustomModal>
    </div>
  );
};

export default TournamentResultModal;
