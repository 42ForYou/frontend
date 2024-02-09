import React from "react";

const ToggleButton = ({ title, isToggled, onToggle, loading }) => {
  const handleToggle = () => {
    if (!loading) {
      onToggle();
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
