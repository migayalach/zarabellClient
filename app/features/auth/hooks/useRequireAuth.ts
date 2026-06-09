"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

export const useRequireAuth = () => {
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth");
    }
  }, [loading, isAuthenticated, router]);
};
