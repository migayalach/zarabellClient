"use client";
import { useAppDispatch } from "@/app/store/hooks";
import {
  clearCurrentBranchData,
  clearInfoBranchError,
  createBranch,
  deleteOneBranchByID,
  getAllListBranchs,
  getBranchByID,
  resetAllDataBranch,
  resetBranchCreateUpdateData,
  resetStateActionBranch,
  updateOneBranchByID,
  branchFilters,
} from "../store/branch.slice";
import { IBranchCreate, IBranchUpdate, IFilterBranch } from "../types";
import { unwrapResult } from "@reduxjs/toolkit";

export const useBranchsActions = () => {
  const dispatch = useAppDispatch();

  const getAllBranchs = async (page?: number) => {
    const result = await dispatch(getAllListBranchs(page));
    return unwrapResult(result);
  };

  const filterBranchs = async (filters: IFilterBranch, page?: number) => {
    const result = await dispatch(branchFilters({ filters, page }));
    return unwrapResult(result);
  };

  const getOneBranchByID = async (idBranch: number) => {
    const result = await dispatch(getBranchByID(idBranch));
    return unwrapResult(result);
  };

  const createNewBranch = async (data: IBranchCreate) => {
    const result = await dispatch(createBranch(data));
    return unwrapResult(result);
  };

  const updateBranch = async (data: IBranchUpdate) => {
    const result = await dispatch(updateOneBranchByID(data));
    return unwrapResult(result);
  };

  const deleteBranch = async (idBranch: number) => {
    const result = await dispatch(deleteOneBranchByID(idBranch));
    return unwrapResult(result);
  };

  const clearCurrentBranch = () => {
    dispatch(clearCurrentBranchData());
  };

  const resetBranch = () => {
    dispatch(resetAllDataBranch());
  };

  const resetBranchActCreateUpdate = () => {
    dispatch(resetBranchCreateUpdateData());
  };

  const clearErrorBranch = () => {
    dispatch(clearInfoBranchError());
  };

  const resetBranchActionState = () => {
    dispatch(resetStateActionBranch());
  };

  return {
    getAllBranchs,
    getOneBranchByID,
    createNewBranch,
    updateBranch,
    deleteBranch,
    clearCurrentBranch,
    resetBranch,
    resetBranchActCreateUpdate,
    clearErrorBranch,
    resetBranchActionState,
    filterBranchs
  };
};
