import React from "react";

const StyledButton = ({ styleType, name, onClick, overrideStyle, disabled }) => {
  const btnClass = `btn btn-${styleType}`;
  const buttonStyle = {
    ...overrideStyle,
    opacity: disabled ? 0.5 : 1, // 비활성화 상태일 때 투명도를 조절하여 비활성화 효과를 줌
  };

  return (
    <button
      type="button"
      className={`StyledButton ${btnClass}`}
      onClick={onClick}
      style={buttonStyle}
      disabled={disabled}>
      {name}
    </button>
  );
};

export default StyledButton;
