import React, { useState, useEffect } from "react";

const ToggleButton = ({ title, initIsToggled, toggleEvent, loading }) => {
  const [isToggled, setIsToggled] = useState(initIsToggled);

  useEffect(() => {
    setIsToggled(initIsToggled);
  }, [initIsToggled]);

  const handleToggle = () => {
    if (!loading) {
      setIsToggled(!isToggled);
      toggleEvent(!isToggled);
    }
  };

  return (
    <div className="ToggleButton">
      {title}
      <button onClick={handleToggle} disabled={loading}>
        {loading ? "Loading..." : isToggled ? "ON" : "OFF"}
      </button>
    </div>
  );
};

export default ToggleButton;
