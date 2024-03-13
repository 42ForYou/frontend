import React from "react";

const CustomButton = ({ label, color, onClick, overrideStyle, disabled }) => {
  const getBackgroundColor = (color) => {
    switch (color) {
      case "red":
        return "#F08080AA"; // 어두운 파스텔 빨강
      case "yellow":
        return "#F0E68CAA"; // 어두운 파스텔 노랑
      case "green":
        return "#90EE90AA"; // 어두운 파스텔 초록
      case "blue":
        return "#87CEFAAA"; // 어두운 파스텔 파랑
      default:
        return "#E6E6FAAA"; // 기본값은 어두운 파스텔 하얀색 (라벤더)
    }
  };

  const buttonStyle = {
    color: "white", // 텍스트 색상
    backgroundColor: getBackgroundColor(color), // 배경색
    border: "solid 2px white", // 하얀색 테두리
    borderRadius: "10px",
    padding: "6px 10px",
    opacity: disabled ? 0.5 : 1, // 비활성화 상태에 따른 투명도
    ...overrideStyle,
  };

  return (
    <button type="button" className="CustomButton" onClick={onClick} style={buttonStyle} disabled={disabled}>
      {label}
    </button>
  );
};

export default CustomButton;
