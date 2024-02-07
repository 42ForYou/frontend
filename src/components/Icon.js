import React from "react";

const Icon = ({ filename, alt }) => {
  return <img className="icon" src={`${process.env.ASSETS_URL}/icons/${filename}`} alt={alt} />;
};

export default Icon;
