import React from "react";
import Avatar from "../common/Avatar";

const PlayerInModal = ({ nickname, avatar, isMine }) => {
  return (
    <div className="player-in-modal text-center">
      <Avatar src={avatar} diameter={130} />
      <p className="pt-2 mb-0" style={{ color: `${isMine ? "yellow" : ""}`, fontWeight: "bold" }}>
        {nickname}
      </p>
    </div>
  );
};

export default PlayerInModal;
