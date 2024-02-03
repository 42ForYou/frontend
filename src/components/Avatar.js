import React from "react";
import { Link } from "react-router-dom";

const Avatar = ({ src, alt, to, isEditable = false }) => {
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
      className="rounded-circle" // 부트스트랩 클래스
      style={{ objectFit: "cover", border: "2px solid #f000f0", width: "100px" }}
      onError={handleImageLoadFailed}
    />
  );

  return (
    <div className="Avatar position-relative" style={{ width: "100px", height: "100px" }}>
      {to ? <Link to={to}>{renderImage()}</Link> : renderImage()}
      {isEditable && (
        <i
          className="fas fa-edit position-absolute"
          style={{ top: "0", right: "0", fontSize: "24px", color: "#000", cursor: "pointer" }}></i>
      )}
    </div>
  );
};

export default Avatar;
