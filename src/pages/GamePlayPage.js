import React, { useEffect, useState } from "react";
import Bracket from "../components/game/Bracket";
import PongScene from "../components/game/PongScene";
import { useTournament } from "../context/TournamentContext";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

const player = (intra_id, nickname, avatar) => {
  return {
    intra_id: intra_id,
    nickname: nickname,
    avatar: avatar,
  };
};

const dummy4Players = {
  players: [
    [
      [
        player("intra_id_0_0_0", "nickname_0_0_0", "avatar_0_0_0"),
        player("intra_id_0_0_1", "nickname_0_0_1", "avatar_0_0_1"),
      ],
    ],
    [
      [
        player("intra_id_1_0_0", "nickname_1_0_0", "avatar_1_0_0"),
        player("intra_id_1_0_1", "nickname_1_0_1", "avatar_1_0_1"),
      ],
      [
        player("intra_id_1_1_0", "nickname_1_1_0", "avatar_1_1_0"),
        player("intra_id_1_1_1", "nickname_1_1_1", "avatar_1_1_1"),
      ],
    ],
  ],
};

const dummy2Players = {
  players: [
    [
      [
        player("intra_id_0_0_0", "nickname_0_0_0", "avatar_0_0_0"),
        player("intra_id_0_0_1", "nickname_0_0_1", "avatar_0_0_1"),
      ],
    ],
  ],
};

// todo: PongScenePage, BracketPage 차후 별도의 파일로 분리

const PongScenePage = () => {
  const { bracketData, roomData } = useTournament();
  const rank = bracketData.rank_ongoing;
  const idx_in_rank = bracketData.players.findIndex((rank) =>
    rank.some((pair) => pair.some((player) => player.intra_id === myPlayerId))
  );
  const roomNamespace = `/game/room/${roomData?.id}`;
  const matchNamespace = `${roomNamespace}/${rank}/${idx_in_rank}`;

  useEffect(() => {
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
  }, [matchNamespace]);

  return <PongScene />;
};

const BracketPage = () => {
  const { bracketData } = useTournament();

  return <Bracket players={bracketData.players} />;
};

const GamePlayPage = () => {
  const navigate = useNavigate();
  const { roomData, myPlayerId, resetTournamentData, setBracketData } = useTournament();
  const { connectNamespace, disconnectNamespace, setupEventListeners, removeEventListeners } = useSockek();
  const { sockets } = useSocket();
  const roomNamespace = `/game/room/${roomData?.id}`;
  const [showBracket, setShowBracket] = useState(true);

  const connectMatchSocket = (matchNamespace) => {
    connectNamespace(matchNamespace, {
      onConnectError: (err) => {
        alert("실시간 통신 연결에 실패하였습니다.");
        handleAbortExit();
      },
      onDisconnect: (reason) => {
        resetTournamentData();
      },
    });
  };

  const updateBracketHandler = (data) => {
    setBracketData(data);
    setShowBracket(true);
    const matchNamespace = `${roomNamespace}/${data.n_ranks}/${data.rank_ongoing}`;
    connectMatchSocket(matchNamespace);
  };

  useEffect(() => {
    if (!roomData || !roomData.id) {
      alert("게임에 입장할 수 없습니다.");
      navigate(-1);
    }

    setupEventListeners(namespace, [
      {
        event: "update_tournament",
        handler: updateBracketHandler,
      },
    ]);

    return () => {
      removeEventListeners(roomNamespace, ["update_room"]);
      disconnectNamespace(roomNamespace);
    };
  }, [roomNamespace]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      // todo: 게임 플레이 중 나가는 경우 백측과 협의
      // sockets[].emitWithTime("leave", { my_player_id: myPlayerId });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="GamePlayPage">
      <div>{showBracket ? <BracketPage /> : <PongScenePage />}</div>
    </div>
  );
};

export default GamePlayPage;
