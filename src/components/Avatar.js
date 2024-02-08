import React from "react";
import { Link } from "react-router-dom";

const Avatar = ({ src, alt, to, isEditing = false, onImageUploadClick = null, diameter = 100, isOnline = null }) => {
  const getImageSrc = (src) => {
    if (!src || src === "default.jpg") return `${process.env.ASSETS_URL}/images/default-avatar.jpg`;
    return `${process.env.API_BASE_URL}/images/avatar/${src}`;
  };

  const handleImageLoadFailed = (e) => {
    e.target.src = `${process.env.ASSETS_URL}/images/loading-failed.png`;
  };

  const renderImage = () => (
    <img
      src={getImageSrc(src)}
      alt={alt || "아바타 이미지"}
      className="rounded-circle"
      style={{
        objectFit: "cover",
        border: "2px solid #f000f0",
        width: `${diameter}px`,
        height: `${diameter}px`,
      }}
      onError={handleImageLoadFailed}
    />
  );

  const renderOnlineStatusIndicator = () => {
    if (isOnline === null) return null;
    return (
      <span
        style={{
          width: "27px",
          height: "27px",
          borderRadius: "50%",
          backgroundColor: isOnline ? "#00ff00" : "#ff0000",
          position: "absolute",
          top: "0",
          right: "0",
          border: "3px solid white",
        }}></span>
    );
  };

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
      {renderOnlineStatusIndicator()}
    </div>
  );
};

export default Avatar;
