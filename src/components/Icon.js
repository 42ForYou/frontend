import React from "react";

const Icon = ({ filename, alt }) => {
  return <img className="icon" src={`${process.env.ASSETS_ICON_URL}/icon/${filename}`} alt={alt} />;
};

export default Icon;
