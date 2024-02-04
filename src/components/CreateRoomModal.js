import React, { useContext, useState } from "react";
import CustomModal from "./CustomModal";
import AuthContext from "../context/AuthContext";
import { post } from "../common/apiBase";
import { API_ENDPOINTS } from "../common/apiEndpoints";

const CreateRoomModal = ({ handleClose }) => {
  const { loggedInUser } = useContext(AuthContext);
  const initialRoomTitle = loggedInUser ? `${loggedInUser.nickname}의 게임 방` : "";
  const [roomTitle, setRoomTitle] = useState(initialRoomTitle);
  const [selectedMode, setSelectedMode] = useState("1vs1");
  const [timeOption, setTimeOption] = useState("시간 옵션1");
  const [scoreOption, setScoreOption] = useState("스코어 옵션1");

  const postRoomData = async () => {
    const roomData = {
      game: {
        is_tournament: selectedMode === "tournament",
        time_limit: timeOption,
        game_point: scoreOption,
        n_players: selectedMode === "tournament" ? 4 : 2,
      },
      room: {
        title: roomTitle,
      },
    };

    try {
      const resData = await post(API_ENDPOINTS.ROOM_LIST(), roomData);
      console.log(resData);
      alert("방이 성공적으로 생성되었습니다.");
    } catch (error) {
      alert("방 생성에 실패하였습니다.");
    }
  };

  const handleModeChange = (e) => {
    setSelectedMode(e.target.value);
  };

  const handleSubmit = () => {
    if (!roomTitle || !timeOption || !scoreOption) {
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
        <div>
          <button className="btn btn-secondary" onClick={handleClose}>
            취소
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            확인
          </button>
        </div>
      }>
      <form>
        {/* 방 이름 입력 */}
        <div className="form-group row mb-3">
          <label htmlFor="roomTitle">
            <b>방 이름</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="roomTitle"
            placeholder="방 이름 입력"
            value={roomTitle}
            onChange={(e) => setRoomTitle(e.target.value)}
          />
        </div>

        {/* 모드 선택 */}
        <div className="form-group row mb-3">
          <label>
            <b>모드 선택</b>
          </label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="modeOptions"
              id="1vs1"
              value="1vs1"
              checked={selectedMode === "1vs1"}
              onChange={handleModeChange}
            />
            <label className="form-check-label" htmlFor="1vs1">
              1vs1
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="modeOptions"
              id="tournament"
              value="tournament"
              checked={selectedMode === "tournament"}
              onChange={handleModeChange}
            />
            <label className="form-check-label" htmlFor="tournament">
              토너먼트
            </label>
          </div>
        </div>

        {/* 게임 옵션 */}
        <div>
          <b>게임 옵션</b>
          <div className="form-group row mb-3">
            <div className="col">
              <label htmlFor="timeOptions">시간</label>
              <select
                className="form-control"
                id="timeOptions"
                value={timeOption}
                onChange={(e) => setTimeOption(e.target.value)}>
                <option>시간 옵션1</option>
                <option>시간 옵션2</option>
                <option>시간 옵션3</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="scoreOptions">스코어</label>
              <select
                className="form-control"
                id="scoreOptions"
                value={scoreOption}
                onChange={(e) => setScoreOption(e.target.value)}>
                <option>스코어 옵션1</option>
                <option>스코어 옵션2</option>
                <option>스코어 옵션3</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </CustomModal>
  );
};

export default CreateRoomModal;
