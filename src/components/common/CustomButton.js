import React from "react";

const CustomButton = ({ label, color, onClick, overrideStyle, disabled, opacity }) => {
  const getBackgroundColor = (color) => {
    switch (color) {
      case "red":
        return "#E57373AA";
      case "yellow":
        return "#D4E157AA";
      case "green":
        return "#81C784AA";
      case "blue":
        return "#64B5F6AA";
      case "dark red":
        return "#EB2323AB";
      case "dark yellow":
        return "#FDD835AA";
      case "dark green":
        return "#388E3CAA";
      case "dark blue":
        return "#1976D2AA";
      default:
        return "#C5CAE9AA";
    }
  };

  // opacity 값이 존재하면 그 값을 사용하고, 없으면 disabled 상태에 따라 0.5 또는 1을 반환
  const getOpacity = (disabled, opacity) => {
    if (opacity) {
      return opacity;
    }
    if (disabled) {
      return 0.5;
    }
    return 1;
  };

  const buttonStyle = {
    color: "white", // 텍스트 색상
    backgroundColor: getBackgroundColor(color), // 배경색
    border: "solid 2px white", // 하얀색 테두리
    borderRadius: "10px",
    padding: "6px 10px",
    opacity: getOpacity(disabled, opacity),
    ...overrideStyle,
  };

  return (
    <button type="button" className="CustomButton" onClick={onClick} style={buttonStyle} disabled={disabled}>
      {label}
    </button>
  );
};

export default CustomButton;
