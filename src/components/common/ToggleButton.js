import React from "react";

const ToggleButton = ({ title, isToggled, onToggle, loading }) => {
  const handleToggle = () => {
    if (!loading) {
      onToggle();
    }
  };

  const buttonClasses = `btn ${loading ? "disabled" : ""}`;

  return (
    <div className="ToggleButton">
      <button onClick={handleToggle} className={buttonClasses} disabled={loading}>
        {loading ? "Loading..." : isToggled ? `${title} ON` : `${title} OFF`}
      </button>
    </div>
  );
};

export default ToggleButton;
