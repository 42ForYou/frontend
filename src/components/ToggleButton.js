import React, { useState } from "react";

const ToggleButton = ({ title, initIsToggled, toggleEvent }) => {
  const [isToggled, setIsToggled] = useState(initIsToggled);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    toggleEvent();
  };

  return (
    <div className="ToggleButton">
      {title}
      <button onClick={handleToggle}>{isToggled ? "ON" : "OFF"}</button>
    </div>
  );
};

export default ToggleButton;
