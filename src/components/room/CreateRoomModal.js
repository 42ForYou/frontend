import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomModal from "../common/CustomModal";
import AuthContext, { useAuth } from "../../context/AuthContext";
import { post } from "../../utils/apiBase";
import { API_ENDPOINTS } from "../../utils/apiEndpoints";
import RadioSelector from "../common/RadioSelector";
import DropdownSelector from "../common/DropdownSelector";
import { hasKeys, updateProperty } from "../../utils/objectUtils";
import StyledButton from "../common/StyledButton";

const RoomTitleForm = ({ updateRoomData }) => {
  const { loggedIn } = useAuth();
  const initRoomTitle = loggedIn ? `${loggedIn.nickname}의 게임 방` : "";
  const [roomTitle, setRoomTitle] = useState(initRoomTitle);

  useEffect(() => {
    updateRoomData("room.title", initRoomTitle);
  }, []);

  const handleChangeRoomTitle = (e) => {
    const newRoomTitle = e.target.value;
    setRoomTitle(newRoomTitle);
    updateRoomData("room.title", newRoomTitle);
  };

  return (
    <div className="form-group">
      <label htmlFor="roomTitle">
        <b>방 이름</b>
      </label>
      <input
        type="text"
        className="form-control"
        id="roomTitle"
        placeholder="방 이름을 입력하세요"
        value={roomTitle}
        onChange={handleChangeRoomTitle}
      />
    </div>
  );
};

const RoomModeSelectForm = ({ updateRoomData }) => {
  const modeOptions = [
    { value: "dual", label: "1vs1" },
    { value: "tournament", label: "토너먼트" },
  ];

  useEffect(() => {
    updateRoomData("game.is_tournament", false);
    updateRoomData("game.n_players", 2);
  }, []);

  const handleModeChange = (value) => {
    const isTournament = value === "tournament";
    updateRoomData("game.is_tournament", isTournament);
    updateRoomData("game.n_players", isTournament ? 4 : 2);
  };

  return <RadioSelector title="모드 선택" options={modeOptions} reflectSelect={handleModeChange} />;
};

const RoomGameOptionForm = ({ updateRoomData }) => {
  const scoreOptions = [
    { value: 3, label: "3점" },
    { value: 5, label: "5점" },
    { value: 10, label: "10점" },
  ];
  const timeOptions = [
    { value: 30, label: "30초" },
    { value: 60, label: "60초" },
    { value: 90, label: "90초" },
  ];

  useEffect(() => {
    updateRoomData("game.game_point", scoreOptions[0].value);
    updateRoomData("game.time_limit", timeOptions[0].value);
  }, []);

  const handleScoreChange = (value) => {
    updateRoomData("game.game_point", value);
  };

  const handleTimeChange = (value) => {
    updateRoomData("game.time_limit", value);
  };

  return (
    <>
      <div className="col">
        <DropdownSelector title={"목표 득점"} options={scoreOptions} reflectSelect={handleScoreChange} />
      </div>
      <div className="col">
        <DropdownSelector title={"제한 시간"} options={timeOptions} reflectSelect={handleTimeChange} />
      </div>
    </>
  );
};

const CreateRoomModal = ({ handleClose }) => {
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState({});

  const handleUpdateRoomData = (path, value) => {
    setRoomData((prevRoomData) => updateProperty(prevRoomData, path, value));
    // 함수형 업데이트: 비동기적으로 수행되는 setState 함수가 이전 state값을 기반으로 동작하도록 보장
  };

  const handleSubmit = () => {
    const postRoomData = async () => {
      try {
        console.log("방 생성 요청 시작");
        const resData = await post(API_ENDPOINTS.ROOM_LIST(), roomData);
        const createdGameId = resData.data.game.game_id;
        navigate(`/game/waiting/${createdGameId}`);
        handleClose();
      } catch (error) {
        console.error("방 생성 요청 실패:", error);
        alert("방 생성에 실패하였습니다.");
      }
    };

    const keysToCheck = ["game.is_tournament", "game.time_limit", "game.game_point", "game.n_players", "room.title"];
    if (!hasKeys(roomData, keysToCheck)) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    postRoomData();
  };

  return (
    <CustomModal
      hasCloseButton={false}
      handleClose={handleClose}
      title={"게임 방 생성하기"}
      footerButtons={
        <>
          <StyledButton name={"취소"} styleType={"secondary"} onClick={handleClose} />
          <StyledButton name={"확인"} styleType={"primary"} onClick={handleSubmit} />
        </>
      }>
      <form>
        <div className="row">
          <RoomTitleForm updateRoomData={handleUpdateRoomData} />
        </div>
        <div className="row mt-3">
          <RoomModeSelectForm updateRoomData={handleUpdateRoomData} />
        </div>
        <div className="row mt-3">
          <RoomGameOptionForm updateRoomData={handleUpdateRoomData} />
        </div>
      </form>
    </CustomModal>
  );
};

export default CreateRoomModal;
