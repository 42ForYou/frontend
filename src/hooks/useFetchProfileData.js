import { useState, useEffect, useContext } from "react";
import { get } from "../common/apiBase";
import { API_ENDPOINTS } from "../common/apiEndpoints";

const useFetchProfileData = (intraId) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const resData = await get(API_ENDPOINTS.USER_PROFILE(intraId));
        setProfileData(resData.data.user);
        setIsLoading(false);
      } catch (error) {
        setError(error);
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
