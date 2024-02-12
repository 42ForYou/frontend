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
      className="avatar-img rounded-circle"
      style={{ width: `${diameter}px`, height: `${diameter}px` }}
      onError={handleImageLoadFailed}
    />
  );

  const renderOnlineStatusIndicator = () => {
    if (isOnline === null) return null;
    return <span className={`online-indicator ${isOnline ? "online" : "offline"}`}></span>;
  };

  return (
    <div className="avatar" style={{ width: `${diameter}px`, height: `${diameter}px` }}>
      {to ? <Link to={to}>{renderImage()}</Link> : renderImage()}
      {isEditing && (
        <button onClick={onImageUploadClick} className="edit-button">
          <i className="fas fa-edit edit-icon"></i>
        </button>
      )}
      {renderOnlineStatusIndicator()}
    </div>
  );
};

export default Avatar;
