import axios from "axios";

// todo: 환경 변수로 변경
const API_BASE_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 7000,
  withCredentials: true,
});

const get = async (url) => {
  try {
    const response = await axiosInstance.get(url);
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
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(`GET 요청 ${url} 실패`);
    throw error;
  }
};

const post = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
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
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(`DELETE 요청 ${url} 실패`);
    throw error;
  }
};

export { get, getWithoutCredentials, post, put, del };
