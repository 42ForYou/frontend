import React from "react";

const StyledButton = ({ styleType, name, onClick }) => {
  const btnClass = `btn btn-${styleType}`;
  return (
    <button type="button" className={btnClass} onClick={onClick}>
      {name}
    </button>
  );
};

export default StyledButton;
