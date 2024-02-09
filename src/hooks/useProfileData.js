import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { patchForm } from "../common/apiBase";
import { API_ENDPOINTS } from "../common/apiEndpoints";

const useProfileData = () => {
  const { setLoggedInUser } = useContext(AuthContext);

  const patchUserProfile = async (intraId, formDataObj, updateStateCallback) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(formDataObj));
      const resData = await patchForm(API_ENDPOINTS.USER_PROFILE(intraId), formData);
      const updatedProfile = resData.data.user;
      setLoggedInUser(updatedProfile);
      updateStateCallback(updatedProfile);
      return { success: true, message: "patchUserProfile 성공" };
    } catch (error) {
      console.error(error);
      return { success: false, message: "patchUserProfile 실패" };
    }
  };

  return { patchUserProfile };
};

export default useProfileData;
