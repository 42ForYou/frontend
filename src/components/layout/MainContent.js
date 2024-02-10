import React from "react";

const MainContent = ({ children }) => {
  return (
    <div className="row">
      <div className="col">{children}</div>
    </div>
  );
};

export default MainContent;
