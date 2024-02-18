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

const PongScenePage = () => {
  const { roomData, matchData } = useTournament();
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

const BracketPage = () => {
  const { bracketData } = useTournament();

  return <Bracket subgames={bracketData.subgames} />;
};

// todo: 게임 플레이 중 나가는 경우 백측과 협의 후 처리 필요
const GamePlayPage = () => {
  const navigate = useNavigate();
  const { roomData, myPlayerId, resetTournamentData, setBracketData, setMatchData, matchData } = useTournament();
  const { connectNamespace, disconnectNamespace, setupEventListeners, removeEventListeners } = useSocket();
  const roomNamespace = `/game/room/${roomData?.id}`;
  const [matchNamespace, setMatchNamespace] = useState("");
  const [showBracket, setShowBracket] = useState(true);

  const connectMatchSocket = (matchNamespace) => {
    connectNamespace(matchNamespace, {
      onConnectError: () => {
        alert("실시간 통신 연결에 실패하였습니다.");
        handleAbortExit();
      },
      onDisconnect: () => {
        resetTournamentData();
      },
    });
  };

  const setupMatchEventListeners = (matchNamespace) => {
    setupEventListeners(matchNamespace, [
      {
        event: "start",
        handler: () => {
          setShowBracket(false);
        },
      },
      {
        event: "config",
        handler: (data) => {
          setMatchData({ ...matchData, config: data }); // setMatchConfig -> setMatchData로 수정
        },
      },
    ]);
  };

  const updateBracketHandler = (data) => {
    const rank = data.rank_ongoing;
    const idx_in_rank = data.players.findIndex((rank) =>
      rank.some((pair) => pair.some((player) => player.intra_id === myPlayerId))
    );
    const newMatchNamespace = `${roomNamespace}/${rank}/${idx_in_rank}`;
    setMatchNamespace(newMatchNamespace);
    connectMatchSocket(newMatchNamespace);
    setBracketData(data);
    setShowBracket(true);
  };

  useEffect(() => {
    if (!roomData || !roomData.id) {
      alert("게임에 입장할 수 없습니다.");
      navigate(-1);
      return;
    }

    setupEventListeners(roomNamespace, [
      {
        event: "update_tournament",
        handler: updateBracketHandler,
      },
    ]);

    return () => {
      removeEventListeners(roomNamespace, ["update_tournament"]);
      disconnectNamespace(roomNamespace);
    };
  }, [roomNamespace, navigate, setupEventListeners, removeEventListeners, disconnectNamespace, updateBracketHandler]);

  useEffect(() => {
    setupMatchEventListeners(matchNamespace);

    return () => {
      removeEventListeners(matchNamespace, ["start", "config"]);
      disconnectNamespace(matchNamespace);
    };
  }, [matchNamespace, setupMatchEventListeners, removeEventListeners, disconnectNamespace]);

  return <div className="GamePlayPage">{showBracket ? <BracketPage /> : <PongScenePage />}</div>;
};

export default GamePlayPage;
