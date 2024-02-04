import React, { useState } from "react";
import CustomModal from "./CustomModal";

const CreateRoomModal = ({ handleClose }) => {
  const [roomName, setRoomName] = useState(""); // 추후 호스트 닉네임으로 기본값 설정 예정
  const [selectedMode, setSelectedMode] = useState("1vs1");
  const [timeOption, setTimeOption] = useState("시간 옵션1");
  const [scoreOption, setScoreOption] = useState("스코어 옵션1");
  const [selectedRound, setSelectedRound] = useState("2");

  // todo: 백엔드 서버로 방 생성 요청 보내는 함수 구현
  const sendCreateRoomRequest = () => {};

  const handleModeChange = (e) => {
    setSelectedMode(e.target.value);
    console.log({ roomName, selectedMode, timeOption, scoreOption, selectedRound });
  };

  const handleRoundChange = (e) => {
    setSelectedRound(e.target.value);
  };

  const handleSubmit = () => {
    if (!roomName || !timeOption || !scoreOption || (selectedMode === "tournament" && !selectedRound)) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // 백엔드 서버로 방 생성 요청 보내기
    console.log("방 생성 요청: ", { roomName, selectedMode, timeOption, scoreOption, selectedRound });
    // sendCreateRoomRequest({ roomName, selectedMode, timeOption, scoreOption, selectedRound });
  };

  return (
    <CustomModal
      hasCloseButton={false}
      handleClose={handleClose}
      title={"방 생성 모달"}
      footerButtons={
        <div>
          <button className="btn btn-primary" onClick={handleSubmit}>
            확인
          </button>
          <button className="btn btn-secondary" onClick={handleClose}>
            취소
          </button>
        </div>
      }>
      <form>
        {/* 방 이름 입력 */}
        <div className="form-group row mb-3">
          <label htmlFor="roomName">
            <b>방 이름</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="roomName"
            placeholder="방 이름 입력"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
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

        {/* 라운드 수 선택 (토너먼트 모드 선택시에만 표시) */}
        {selectedMode === "tournament" && (
          <div className="form-group">
            <label>라운드 수</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="roundOptions"
                id="rounds2"
                value="2"
                checked={selectedRound === "2"}
                onChange={handleRoundChange}
              />
              <label className="form-check-label" htmlFor="rounds2">
                2 Round
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="roundOptions"
                id="rounds3"
                value="3"
                checked={selectedRound === "3"}
                onChange={handleRoundChange}
              />
              <label className="form-check-label" htmlFor="rounds3">
                3 Round
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="roundOptions"
                id="rounds4"
                value="4"
                checked={selectedRound === "4"}
                onChange={handleRoundChange}
              />
              <label className="form-check-label" htmlFor="rounds4">
                4 Round
              </label>
            </div>
          </div>
        )}
      </form>
    </CustomModal>
  );
};

export default CreateRoomModal;
