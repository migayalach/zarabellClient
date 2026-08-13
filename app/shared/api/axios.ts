import axios from "axios";
import { URL_SERVER } from "@/app/helpers/constans.helpers";

export const api = axios.create({
  baseURL: URL_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(
      error.response?.data ?? {
        message: "Server connection error",
      },
    );
  },
);
