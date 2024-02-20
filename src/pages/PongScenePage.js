import React, { useEffect } from "react";
import PongScene from "../components/game/PongScene";

const PongScenePage = () => {
  const { roomData, matchData } = useGame();
  const roomNamespace = `/game/room/${roomData?.id}`;

  useEffect(() => {
    const matchNamespace = `${roomNamespace}/${matchData.rank}/${matchData.idx_in_rank}`;
    setupEventListeners(matchNamespace, [
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
      removeEventListeners(matchNamespace, [
        "update_time_left",
        "ended",
        "update_scores",
        "update_track_ball",
        "update_track_paddle",
      ]);
      // disconnectNamespace(matchNamespace);
    };
  }, [matchNamespace, matchData]);

  return <PongScene />;
};

export default PongScenePage;
