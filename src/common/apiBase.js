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
    throw error;
  }
};

const getWithoutCredentials = async (url) => {
  try {
    const response = await axiosInstance.get(url, { withCredentials: false });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const post = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const put = async (url, data) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const del = async (url) => {
  try {
    const response = await axiosInstance.del(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const patchForm = async (url, formData) => {
  try {
    const response = await axiosInstance.patch(url, formData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { get, getWithoutCredentials, post, put, del, patchForm };
