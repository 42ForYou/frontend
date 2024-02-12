import React from "react";

const ToggleButton = ({ title, isToggled, onToggle, loading }) => {
  const handleToggle = () => {
    if (!loading) {
      onToggle();
    }
  };

  return (
    <div className="ToggleButton">
      <button onClick={handleToggle} disabled={loading}>
        {loading ? "Loading..." : isToggled ? `${title} ON` : `${title} OFF`}
      </button>
    </div>
  );
};

export default ToggleButton;
