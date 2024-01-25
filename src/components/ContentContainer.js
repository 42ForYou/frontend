import React from "react";

const ContentContainer = ({ children }) => {
  // React.Children.forEach(children, (child, index) => {
  //   console.log(`Child ${index + 1}: `, child);
  // });

  return <div className="ContentContainer">{children}</div>;
};

export default ContentContainer;
