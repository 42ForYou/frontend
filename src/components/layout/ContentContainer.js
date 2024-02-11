import React from "react";

const ContentContainer = ({ children }) => {
  return <div className="ContentContainer d-flex flex-column full-height p-3">{children}</div>;
};

export default React.memo(ContentContainer);
