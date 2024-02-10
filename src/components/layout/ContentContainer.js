import React from "react";

const ContentContainer = ({ children }) => {
  return <div className="ContentContainer h-100 p-4">{children}</div>;
};

export default React.memo(ContentContainer);
