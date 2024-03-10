// todo: httpApiBase로 이름 변경

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// 요청 인터셉터: 요청이 발송되기 전에 로그 기록
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`${config.method.toUpperCase()} 요청 ${config.url} 발송`);
    return config;
  },
  (error) => {
    console.log("요청 발송 실패:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 에러 처리(리프레시 토큰으로 재발급 시도) 및 성공 로그 기록
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`${response.config.method.toUpperCase()} 요청 ${response.config.url} 성공`);
    return response;
  },
  (error) => {
    if (error.config && error.config._retry) {
      console.log("리프레시 토큰을 이용한 액세스 토큰 재발급에 실패했습니다.");
    } else if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.log("토큰이 유효하지 않습니다. 리프레시 토큰으로 재시도합니다.");
      error.config._retry = true;
      window.dispatchEvent(new CustomEvent("invalid-access-token", { detail: error.config }));
    }
    return Promise.reject(error);
  }
);

const get = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getWithoutCredentials = async (url) => {
  try {
    const response = await axiosInstance.get(url, { withCredentials: false });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const post = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, { data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const put = async (url, data) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const del = async (url) => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const patch = async (url, data) => {
  try {
    const response = await axiosInstance.patch(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const patchForm = async (url, formData) => {
  try {
    const response = await axiosInstance.patch(url, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { axiosInstance, get, getWithoutCredentials, post, put, del, patch, patchForm };
