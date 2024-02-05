import React from "react";
import { Link } from "react-router-dom";

const Avatar = ({ src, alt, to, isEditing = false, onImageUploadClick, diameter = 100 }) => {
  const defaultImage =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
  const imageSrc = src || defaultImage;
  const imageAlt = alt || "프로필 이미지";

  const handleImageLoadFailed = (e) => {
    e.target.src = defaultImage;
  };

  const renderImage = () => (
    <img
      src={imageSrc}
      alt={imageAlt}
      className="rounded-circle"
      style={{ objectFit: "cover", border: "2px solid #f000f0", width: `${diameter}px` }}
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
