import React from "react";

const ContentContainer = ({ children }) => {
  return <div className="container-fluid full-height p-3">{children}</div>;
};

export default React.memo(ContentContainer);
