"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

export const useRequirePermission = (allowedRoles?: number[]) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (
      !loading &&
      user &&
      allowedRoles &&
      !allowedRoles.includes(user.idRole)
    ) {
      router.replace("/home");
    }
  }, [user, loading, router, allowedRoles]);

  return (
    loading ||
    !user ||
    (allowedRoles && !allowedRoles.includes(user.idRole))
  );
};