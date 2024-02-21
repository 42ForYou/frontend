import React from "react";
import StyledButton from "../common/StyledButton";
import CustomModal from "../common/CustomModal";
import { useNavigate } from "react-router-dom";

const GameResultModal = ({ result }) => {
  const navigate = useNavigate();

  return (
    <div className="GameResultModal">
      <CustomModal
        hasCloseButton={false}
        title={"게임 결과"}
        footerButtons={
          <>
            <StyledButton name={"홈으로 이동"} styleType={"secondary"} onClick={() => navigate("/")} />
          </>
        }>
        <div className="result">{result}</div>
      </CustomModal>
    </div>
  );
};

export default GameResultModal;
