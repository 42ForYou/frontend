import React from "react";
import { Link } from "react-router-dom";

const defaultImage =
  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

const imageSizeStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "2px solid #f000f0",
};

const Avatar = ({ src, alt, to }) => {
  const imageSrc = src === "default.jpg" ? defaultImage : src || defaultImage;
  const imageAlt = alt || "프로필 이미지";
  const imageElement = <img src={imageSrc} alt={imageAlt} style={imageSizeStyle} />;

  return <div className="Avatar">{to ? <Link to={to}>{imageElement}</Link> : imageElement}</div>;
};

export default Avatar;
