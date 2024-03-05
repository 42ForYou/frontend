import React from "react";
import CustomModal from "../common/CustomModal";

const SubgameResultModal = ({ content }) => {
  return (
    <div className="SubgameResultModal">
      <CustomModal hasCloseButton={false} title={"서브게임 결과"}>
        <div className="content">{content}</div>
      </CustomModal>
    </div>
  );
};

export default SubgameResultModal;
