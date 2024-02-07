import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Avatar = ({ src, alt, to, isEditing = false, onImageUploadClick, diameter = 100 }) => {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  const getImageSrc = (src) => {
    if (!src || src === "default.jpg") return `${process.env.ASSETS_URL}/images/default-avatar.jpg`;
    return `${process.env.API_BASE_URL}/images/avatar/${src}`;
  };

  const handleImageLoadFailed = () => {
    setImageSrc(`${process.env.ASSETS_URL}/images/loading-failed.png`);
  };

  const renderImage = () => (
    <img
      src={getImageSrc(imageSrc)}
      alt={alt || "아바타 이미지"}
      className="rounded-circle"
      style={{ objectFit: "cover", border: "2px solid #f000f0", width: `${diameter}px`, height: `${diameter}px` }}
      onError={handleImageLoadFailed}
    />
  );

  return (
    <div className="Avatar position-relative" style={{ width: `${diameter}px`, height: `${diameter}px` }}>
      {to ? <Link to={to}>{renderImage()}</Link> : renderImage()}
      {isEditing && (
        <button
          onClick={onImageUploadClick}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            position: "absolute",
            top: "0",
            right: "0",
          }}>
          <i className="fas fa-edit" style={{ fontSize: "24px", color: "#000" }}></i>
        </button>
      )}
    </div>
  );
};

export default Avatar;
