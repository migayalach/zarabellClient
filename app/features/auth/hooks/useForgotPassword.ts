"use client";

import {
  forgotPasswordRequest,
  resetPasswordByEmail,
} from "../services/auth.services";

export const useForgotPassword = () => {
  const forgotPassword = async (emailUser: string) => {
    return await forgotPasswordRequest(emailUser);
  };

  const resetPassword = async (token: string, password: string) => {
    return await resetPasswordByEmail(token, password);
  };

  return {
    forgotPassword,
    resetPassword,
  };
};
