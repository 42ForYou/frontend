import React, { useEffect, useState } from "react";
import { useGame } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import BracketPage from "./BracketPage";
import PongScenePage from "./PongScenePage";

// todo: 게임 플레이 중 나가는 경우 백측과 협의 후 처리 필요
const GamePlayPage = () => {
  const navigate = useNavigate();
  const { roomData, myPlayerId, resetWaitingRoomData, setBracketData, setMatchData, matchData } = useGame();
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
        resetWaitingRoomData();
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
