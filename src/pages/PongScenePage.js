import React, { useEffect } from "react";
import PongScene from "../components/game/PongScene";

const PongScenePage = () => {
  const { roomData, subgameData } = useGame();
  const roomNamespace = `/game/room/${roomData?.id}`;

  useEffect(() => {
    const matchNamespace = `${roomNamespace}/${subgameData.rank}/${subgameData.idx_in_rank}`;
    setupEventListenersNamespace(matchNamespace, [
      {
        event: "update_time_left",
        handler: null,
      },
      {
        event: "ended",
        handler: null,
      },
      {
        event: "update_scores",
        handler: null,
      },
      {
        event: "update_track_ball",
        handler: null,
      },
      {
        event: "update_track_paddle",
        handler: null,
      },
    ]);

    return () => {
      removeEventListenersNamespace(matchNamespace, [
        "update_time_left",
        "ended",
        "update_scores",
        "update_track_ball",
        "update_track_paddle",
      ]);
      // disconnectNamespace(matchNamespace);
    };
  }, [matchNamespace, subgameData]);

  return <PongScene />;
};

export default PongScenePage;
