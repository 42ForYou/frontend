// todo: httpApiBase로 이름 변경
// todo: 모든 데이터는 data로 감싸져오기 때문에 data.data로 반환하는 것 고려

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

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

export { get, getWithoutCredentials, post, put, del, patch, patchForm };
