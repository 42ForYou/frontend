import React, { useContext, useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import AuthContext from "../context/AuthContext";
import { post } from "../common/apiBase";
import { API_ENDPOINTS } from "../common/apiEndpoints";
import RadioSelector from "./RadioSelector";
import DropdownSelector from "./DropdownSelector";
import { hasKeys, updateProperty } from "../common/objectUtils";

const RoomTitleForm = ({ updateRoomData }) => {
  const { loggedInUser } = useContext(AuthContext);
  const initRoomTitle = loggedInUser ? `${loggedInUser.nickname}의 게임 방` : "";
  const [roomTitle, setRoomTitle] = useState(initRoomTitle);

  const handleChangeRoomTitle = (e) => {
    setRoomTitle(e.target.value);
    updateRoomData("room.title", roomTitle);
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
        placeholder="방 이름 입력"
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
      <DropdownSelector title={"목표 득점"} options={scoreOptions} reflectSelect={handleScoreChange} />
      <DropdownSelector title={"제한 시간"} options={timeOptions} reflectSelect={handleTimeChange} />
    </>
  );
};

const CreateRoomModal = ({ handleClose }) => {
  const [roomData, setRoomData] = useState({});

  const handleUpdateRoomData = (path, value) => {
    setRoomData((prevRoomData) => updateProperty(prevRoomData, path, value));
    console.log(roomData);
    // 함수형 업데이트: 비동기적으로 수행되는 setState 함수가 이전 state값을 기반으로 동작하도록 보장
  };

  const handleSubmit = () => {
    const postRoomData = async () => {
      try {
        const resData = await post(API_ENDPOINTS.ROOM_LIST(), roomData);
        console.log(resData);
        alert("방이 성공적으로 생성되었습니다.");
        handleClose();
      } catch (error) {
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
      title={"방 생성 모달"}
      footerButtons={
        <>
          <button className="btn btn-secondary" onClick={handleClose}>
            취소
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            확인
          </button>
        </>
      }>
      <form>
        <div className="row">
          <RoomTitleForm updateRoomData={handleUpdateRoomData} />
        </div>
        <div className="row">
          <RoomModeSelectForm updateRoomData={handleUpdateRoomData} />
        </div>
        <div className="row">
          <RoomGameOptionForm updateRoomData={handleUpdateRoomData} />
        </div>
      </form>
    </CustomModal>
  );
};

export default CreateRoomModal;
//
