"use client";

import { unwrapResult } from "@reduxjs/toolkit";
import { updateInfoProfile, updatePasswordUser } from "../store/auth.slice";
import { useAppDispatch } from "@/app/store/hooks";
import { IPassword, IUpdateProfile } from "../types";

export const useProfile = () => {
  const dispatch = useAppDispatch();

  const updateProfile = async (data: IUpdateProfile) => {
    const result = await dispatch(updateInfoProfile(data));
    return unwrapResult(result);
  };

  const updatePassword = async (data: IPassword) => {
    const result = await dispatch(updatePasswordUser(data));
    return unwrapResult(result);
  };

  return {
    updateProfile,
    updatePassword,
  };
};
