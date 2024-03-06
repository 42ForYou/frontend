import React from "react";
import Avatar from "../common/Avatar";

const WinOrLose = ({ isWinner }) => {
  return <div style={{ fontWeight: "bold" }}>{isWinner ? "WINNER!" : "LOSER..."}</div>;
};

const PlayerInModal = ({ nickname, avatar, isMine, isWinner = undefined }) => {
  return (
    <div className="player-in-modal text-center">
      {isWinner !== undefined && <WinOrLose isWinner={isWinner} />}
      <Avatar src={avatar} diameter={130} />
      <p className="pt-2 mb-0" style={{ color: `${isMine ? "yellow" : ""}` }}>
        {nickname}
      </p>
    </div>
  );
};

export default PlayerInModal;
