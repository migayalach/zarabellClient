"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { getCurrentUserInfo } from "../store/auth.slice";

export const useRestoreSession = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      dispatch(getCurrentUserInfo());
    }
  }, [dispatch]);
};
