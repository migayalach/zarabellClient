"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { signInSession, clearInfoSessionError } from "../store/auth.slice";

export const useSignIn = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();

  const signIn = (data: { email: string; password: string }) => {
    dispatch(signInSession(data));
  };

  useEffect(() => {
    if (auth.access_token) {
      localStorage.setItem("accessToken", auth.access_token);
      router.push("/home");
    }

    if (auth.error) {
      const timer = setTimeout(() => {
        dispatch(clearInfoSessionError());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [auth.access_token, auth.error, dispatch, router]);

  return {
    signIn,
    loading: auth.loading,
    error: auth.error,
  };
};
