import axios from "axios";
import { URL_SERVER } from "@/app/helpers/constans.helpers";

let refreshPromise: Promise<string> | null = null;

const doRefresh = async (): Promise<string> => {
  const res = await axios.post(
    URL_SERVER,
    { query: `mutation { refreshToken { success access_token } }` },
    { withCredentials: true },
  );
  const token = res.data?.data?.refreshToken?.access_token;
  if (!token) throw new Error("Refresh failed");
  localStorage.setItem("accessToken", token);
  return token;
};

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
  async (response) => {
    const errors = response.data?.errors;
    if (errors?.length) {
      const original = response.config as typeof response.config & {
        _retry?: boolean;
      };
      const isAuthError = errors.some((e: { message: string }) =>
        /unauthorized|jwt expired|invalid token/i.test(e.message),
      );

      if (
        isAuthError &&
        !original._retry &&
        localStorage.getItem("accessToken")
      ) {
        original._retry = true;
        try {
          refreshPromise ??= doRefresh().finally(() => (refreshPromise = null));
          const token = await refreshPromise;
          original.headers.Authorization = `Bearer ${token}`;
          return api(original); // reintenta la petición original
        } catch {
          localStorage.removeItem("accessToken");
        }
      }

      return Promise.reject({ message: errors[0].message, errors });
    }
    return response;
  },
  (error) =>
    Promise.reject(
      error.response?.data ?? { message: "Server connection error" },
    ),
);
