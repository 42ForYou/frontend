import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { patchForm } from "../common/apiBase";
import { API_ENDPOINTS } from "../common/apiEndpoints";

const useProfileData = () => {
  const { setLoggedInUser } = useContext(AuthContext);

  const updateProfileData = async (intraId, formData, updateStateCallback) => {
    try {
      console.log("formData: ", formData);
      const resData = await patchForm(API_ENDPOINTS.USER_PROFILE(intraId), formData);
      const updatedProfile = resData.data.user;
      setLoggedInUser(updatedProfile);
      updateStateCallback(updatedProfile);
      return { success: true, message: "프로필 정보가 성공적으로 업데이트 되었습니다." };
    } catch (error) {
      // todo: 에러코드 넘기기
      console.error(error);
      return { success: false, message: "프로필 정보 업데이트에 실패하였습니다." };
    }
  };

  return { updateProfileData };
};

export default useProfileData;
