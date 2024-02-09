import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { patchForm } from "../common/apiBase";
import { API_ENDPOINTS } from "../common/apiEndpoints";

const useProfileData = () => {
  const { loggedInUser } = useContext(AuthContext);
  const { setLoggedInUser } = useContext(AuthContext);

  const patchProfileInfo = async (formDataObj, callback, isImage = false) => {
    try {
      const formData = new FormData();
      if (isImage) formData.append("image", formDataObj);
      else formData.append("data", JSON.stringify(formDataObj));
      const resData = await patchForm(API_ENDPOINTS.USER_PROFILE(loggedInUser.intra_id), formData);
      const updatedProfile = resData.data.user;
      setLoggedInUser(updatedProfile);
      callback(updatedProfile);
      return { success: true, message: "patchProfileInfo 성공" };
    } catch (error) {
      console.error(error);
      return { success: false, message: "patchProfileInfo 실패" };
    }
  };

  return { patchProfileInfo };
};

export default useProfileData;
