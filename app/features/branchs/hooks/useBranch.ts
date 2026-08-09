"use client";

import { useAppSelector } from "@/app/store/hooks";
import {
  selectActionBranch,
  selectBranchsError,
  selectBranchsInfo,
  selectBranchsLoading,
  selectBranchsResults,
  selectCurrentBranch,
  selectSuccessBranch,
} from "../store/branch.selector";

export const useBranchs = () => {
  const info = useAppSelector(selectBranchsInfo);
  const results = useAppSelector(selectBranchsResults);
  const currentBranch = useAppSelector(selectCurrentBranch);
  const loading = useAppSelector(selectBranchsLoading);
  const error = useAppSelector(selectBranchsError);
  const success = useAppSelector(selectSuccessBranch);
  const actionBranch = useAppSelector(selectActionBranch);

  return {
    info,
    results,
    currentBranch,
    loading,
    error,
    success,
    actionBranch,
  };
};
