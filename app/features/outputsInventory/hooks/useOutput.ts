"use client";

import { useAppSelector } from "@/app/store/hooks";
import {
  selectCurrentOutput,
  selectOutputError,
  selectOutputInfo,
  selectOutputLoading,
  selectOutputResults,
  selectSuccessOutput,
} from "../store/outputsInventory.selector";

export const useOutput = () => {
  const info = useAppSelector(selectOutputInfo);
  const results = useAppSelector(selectOutputResults);
  const currentOutput = useAppSelector(selectCurrentOutput);
  const loading = useAppSelector(selectOutputLoading);
  const error = useAppSelector(selectOutputError);
  const success = useAppSelector(selectSuccessOutput);

  return {
    info,
    results,
    currentOutput,
    loading,
    error,
    success,
  };
};
