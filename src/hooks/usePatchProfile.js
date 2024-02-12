import { useContext, useState } from "react";
import AuthContext, { useAuth } from "../context/AuthContext";
import { patchForm } from "../utils/apiBase";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

// 사용자의 프로필 업데이트 요청을 비동기로 처리하는 커스텀 훅
// 사용자가 로그인한 상태에서만 사용 가능
const usePatchProfile = () => {
  const { loggedIn } = useAuth();
  const [error, setError] = useState(null);

  const patchProfileInfo = async (formDataObj, callback, isImage = false) => {
    try {
      const formData = new FormData();
      if (isImage) formData.append("image", formDataObj);
      else formData.append("data", JSON.stringify(formDataObj));

      const resData = await patchForm(API_ENDPOINTS.USER_PROFILE(loggedIn.intra_id), formData);
      const updatedProfile = resData.data.user;

      if (callback) callback(updatedProfile);
      setError(null);

      return { success: true };
    } catch (error) {
      setError({
        code: error.response?.status,
        msg: error.response?.data.message || error.message,
      });
      return {
        success: false,
        errcode: error.response?.status,
        errmsg: error.response?.data.message,
      };
    }
  };

  return { patchProfileInfo, error };
};

export default usePatchProfile;
