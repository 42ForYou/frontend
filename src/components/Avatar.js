import React from "react";
import { Link } from "react-router-dom";

const imageSizeStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "2px solid #f000f0",
};

const Avatar = ({ src, alt, to }) => {
  const defaultImage =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
  const imageSrc = src || defaultImage;
  const imageAlt = alt || "프로필 이미지";

  const handleImageLoadFailed = (e) => {
    e.target.src = defaultImage;
  };
  const imageElement = <img src={imageSrc} alt={imageAlt} style={imageSizeStyle} onError={handleImageLoadFailed} />;

  return <div className="Avatar">{to ? <Link to={to}>{imageElement}</Link> : imageElement}</div>;
};

export default Avatar;
