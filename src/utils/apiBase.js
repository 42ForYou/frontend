// todo: httpApiBase로 이름 변경

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// 에러 발생시 리프레시 토큰으로 재시도
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.config._retry) {
      console.log("리프레시 토큰을 이용한 액세스 토큰 재발급에 실패했습니다.");
    } else if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.log("토큰이 유효하지 않습니다. 리프레시 토큰으로 재시도합니다.");
      error.config._retry = true;
      window.dispatchEvent(new CustomEvent("invalid-access-token", { detail: error.config }));
    }
  }
);

const get = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    console.log(`GET 요청 ${url} 성공`);
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(`GET 요청 ${url} 실패`);
    throw error;
  }
};

const getWithoutCredentials = async (url) => {
  try {
    const response = await axiosInstance.get(url, { withCredentials: false });
    console.log(`GET 요청 ${url} 성공`);
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(`GET 요청 ${url} 실패`);
    throw error;
  }
};

const post = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, { data });
    console.log(`POST 요청 ${url} 성공`);
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(`POST 요청 ${url} 실패`);
    throw error;
  }
};

const put = async (url, data) => {
  try {
    const response = await axiosInstance.put(url, data);
    console.log(`PUT 요청 ${url} 성공`);
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(`PUT 요청 ${url} 실패`);
    throw error;
  }
};

const del = async (url) => {
  try {
    const response = await axiosInstance.delete(url);
    console.log(`DELETE 요청 ${url} 성공`);
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(`DELETE 요청 ${url} 실패`);
    throw error;
  }
};

const patch = async (url, data) => {
  try {
    const response = await axiosInstance.patch(url, data);
    console.log(`PATCH 요청 ${url} 성공`);
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(`PATCH 요청 ${url} 실패`);
    throw error;
  }
};

const patchForm = async (url, formData) => {
  try {
    const response = await axiosInstance.patch(url, formData);
    console.log(`PATCH 요청 ${url} 성공`);
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(`PATCH 요청 ${url} 실패`);
    throw error;
  }
};

export { axiosInstance, get, getWithoutCredentials, post, put, del, patch, patchForm };
