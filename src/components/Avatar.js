import React, { useState } from "react";
import { Link } from "react-router-dom";

const baseImageURL = `${process.env.API_BASE_URL}/images/avatar`;

const Avatar = ({ src, alt, to, isEditing = false, onImageUploadClick }) => {
  const [imageSrc, setImageSrc] = useState(src || "default.jpg");
  const imageAlt = alt || "아바타 이미지";

  const handleImageLoadFailed = (e) => {
    setImageSrc("loading-failed.png");
  };

  const renderImage = () => (
    <img
      src={`${baseImageURL}/${imageSrc}`}
      alt={imageAlt}
      className="rounded-circle"
      style={{ objectFit: "cover", border: "2px solid #f000f0", width: "100px", height: "100px" }}
      onError={handleImageLoadFailed}
    />
  );

  return (
    <div className="Avatar position-relative" style={{ width: "100px", height: "100px" }}>
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
