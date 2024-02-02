import React, { useState } from "react";
import { patchImage } from "../common/apiBase";

const ImageUpload = ({ apiUrl }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      alert("이미지를 선택해주세요.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.readAsArrayBuffer(selectedImage);
      reader.onload = async (e) => {
        const imageData = e.target.result;
        const resData = await patchImage(apiUrl, imageData);
        console.log("서버 응답:", resData);
        alert("이미지 업로드 성공");
      };
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드 실패");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">이미지 업로드</button>
    </form>
  );
};

export default ImageUpload;
