import React from "react";
import CustomModal from "../common/CustomModal";
import PlayerInModal from "./PlayerInModal";

const VStext = () => {
  return (
    <div
      className="vs-text"
      style={{
        fontSize: "3rem",
        fontWeight: "bold",
      }}>
      VS
    </div>
  );
};

const SubgameBracketModal = ({ playerA, playerB, remainingTime }) => {
  return (
    <div className="SubgameBracketModal">
      <CustomModal hasCloseButton={false} title={"Next Game"}>
        <div className="content">
          <div className="d-flex align-items-center justify-content-between px-4">
            <PlayerInModal nickname={playerA.nickname} avatar={playerA.avatar} isMine={playerA.isMine} />
            <div className="d-flex align-items-center">
              <VStext />
            </div>
            <PlayerInModal nickname={playerB.nickname} avatar={playerB.avatar} isMine={playerB.isMine} />
          </div>
          <div className="text-end">
            <p className="pt-3 m-0"> {`게임 시작까지 ${remainingTime}초 남았습니다...`}</p>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default SubgameBracketModal;
