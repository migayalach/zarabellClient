"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { signInSession, clearInfoSessionError } from "../store/auth.slice";

export const useSignIn = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();

  const signIn = async (data: { email: string; password: string }) => {
    const results = await dispatch(signInSession(data));
    if (signInSession.fulfilled.match(results)) {
      localStorage.setItem("accessToken", results.payload.access_token);
      router.push("/home");
    }
  };

  useEffect(() => {
    if (auth.error) {
      const timer = setTimeout(() => {
        dispatch(clearInfoSessionError());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [auth.error, dispatch]);

  return {
    signIn,
    loading: auth.loading,
    error: auth.error,
  };
};
