import React from "react";

const Avatar = ({ src, alt }) => {
  const defaultImage =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  return (
    <div className="Avatar">
      <img
        src={src || defaultImage}
        alt={alt || "프로필 이미지"}
        style={{
          width: "100px", // 원하는 크기로 조정 가능
          height: "100px", // 원하는 크기로 조정 가능
          borderRadius: "50%", // 원형으로 만들기
          objectFit: "cover", // 이미지 비율 유지
          border: "2px solid #f000f0",
        }}
      />
    </div>
  );
};

export default Avatar;
