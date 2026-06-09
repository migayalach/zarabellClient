import { api } from "@/app/shared/api/axios";
import { UserStore } from "../types";

export const signInRequest = async (data: UserStore) => {
  const response = await api.post("api/auth/signIn", {
    emailUser: data.email,
    passwordUser: data.password,
  });

  return response.data;
};