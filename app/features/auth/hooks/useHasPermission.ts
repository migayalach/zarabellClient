"use client";

import { useAuth } from "./useAuth";

export const useHasPermission = (allowedRoles?: number[]) => {
  const { user } = useAuth();

  if (!user) return false;

  if (!allowedRoles) return true;

  return allowedRoles.includes(user.idRole);
};
