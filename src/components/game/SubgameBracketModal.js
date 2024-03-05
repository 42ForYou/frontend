import React from "react";
import CustomModal from "../common/CustomModal";

const SubgameBracketModal = ({ content }) => {
  return (
    <div className="SubgameBracketModal">
      <CustomModal hasCloseButton={false} title={"서브게임 대진표"}>
        <div className="content">{content}</div>
      </CustomModal>
    </div>
  );
};

export default SubgameBracketModal;
