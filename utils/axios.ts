import axios, { AxiosInstance } from "axios";

const baseURL = process.env.API || "";

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});

export default axiosInstance;

export const authAxios: AxiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${
      typeof window !== "undefined" ? localStorage?.getItem("auth__key") : null
    }`,
  },
});
