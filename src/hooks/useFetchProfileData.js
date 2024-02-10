import { useState, useEffect } from "react";
import { get } from "../utils/apiBase";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

// 특정 사용자의 프로필 데이터를 비동기적으로 가져오는 커스텀 훅
// 이 훅을 사용하는 컴포넌트가 마운트될 때 자동으로 데이터를 가져와야 하므로 useEffect를 사용
const useFetchProfileData = (intraId) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const resData = await get(API_ENDPOINTS.USER_PROFILE(intraId));
        setProfileData(resData.data.user);
        setIsLoading(false);
      } catch (error) {
        setError({
          code: error.response?.status,
          msg: error.response?.data.message || error.message,
        });
        setIsLoading(false);
      }
    };

    if (intraId) {
      fetchProfileData();
    }
  }, [intraId]);

  return { profileData, isLoading, error };
};

export default useFetchProfileData;
