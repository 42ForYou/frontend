import React from "react";

const StyledButton = ({ styleType, name, onClick, overrideStyle }) => {
  const btnClass = `btn btn-${styleType}`;
  return (
    <button type="button" className={btnClass} onClick={onClick} style={overrideStyle}>
      {name}
    </button>
  );
};

export default StyledButton;
