import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DASHBOARD_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
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
