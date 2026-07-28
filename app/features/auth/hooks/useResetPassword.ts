"use client";

import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/app/store/hooks";
import { resetUserPassword } from "../store/auth.slice";

export function useResetPassword() {
  const dispatch = useAppDispatch();

  const resetPassword = async (idUser: number) => {
    const result = await dispatch(resetUserPassword(idUser));
    return unwrapResult(result);
  };

  return {
    resetPassword,
  };
}
