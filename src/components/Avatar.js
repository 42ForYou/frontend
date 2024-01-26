import React from "react";
import { Link } from "react-router-dom";

const Avatar = ({ src, alt, to }) => {
  const defaultImage =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  return (
    <div className="Avatar">
      {to ? (
        <Link to={to}>
          <img
            src={src || defaultImage}
            alt={alt || "프로필 이미지"}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #f000f0",
            }}
          />
        </Link>
      ) : (
        <img
          src={src || defaultImage}
          alt={alt || "프로필 이미지"}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #f000f0",
          }}
        />
      )}
    </div>
  );
};

export default Avatar;
