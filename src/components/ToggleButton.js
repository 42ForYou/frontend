import React, { useState } from "react";

const ToggleButton = ({ title, initIsToggled }) => {
  const [isToggled, setIsToggled] = useState(initIsToggled);

  const toggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="ToggleButton">
      {title}
      <button onClick={toggle}>{isToggled ? "ON" : "OFF"}</button>
    </div>
  );
};

export default ToggleButton;
