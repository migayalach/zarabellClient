"use client";

import { useAppDispatch } from "@/app/store/hooks";
import { refreshTokenUser } from "../store/auth.slice";

export const useRefreshToken = () => {
  const dispatch = useAppDispatch();

  const refresh = async () => {
    const result = await dispatch(refreshTokenUser());

    console.log("REFRESH RESULT:", result);

    return result;
  };

  return {
    refresh,
  };
};
