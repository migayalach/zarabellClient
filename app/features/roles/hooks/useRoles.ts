"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectCurrentRole,
  selectRolesError,
  selectRolesInfo,
  selectRolesLoading,
  selectRolesResults,
} from "../store/role.selector";
import {
  getAllListRole,
  getRoleByID,
  createRole,
  updateOneRoleByID,
  deleteOneRoleByID,
  clearCurrentRoleData,
  resetAllDataRole,
} from "../store/role.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { IRole } from "../types";

export const useRoles = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectRolesInfo);
  const results = useAppSelector(selectRolesResults);
  const currentRole = useAppSelector(selectCurrentRole);
  const loading = useAppSelector(selectRolesLoading);
  const error = useAppSelector(selectRolesError);

  const getAllRoles = async (page?: number) => {
    const result = await dispatch(getAllListRole(page));
    return unwrapResult(result);
  };

  const getOneRole = async (idRole: number) => {
    const result = await dispatch(getRoleByID(idRole));
    return unwrapResult(result);
  };

  const createNewRole = async (nameRole: string) => {
    const result = await dispatch(createRole(nameRole));
    return unwrapResult(result);
  };

  const deleteOneRole = async (idRole: number) => {
    const result = await dispatch(deleteOneRoleByID(idRole));
    return unwrapResult(result);
  };

  const updateOneRole = async (dataRole: IRole) => {
    const result = await dispatch(updateOneRoleByID(dataRole));
    return unwrapResult(result);
  };

  const clearDataCurrentRole = () => {
    dispatch(clearCurrentRoleData());
  };

  const resetDataRole = () => {
    dispatch(resetAllDataRole());
  };

  return {
    info,
    results,
    currentRole,
    loading,
    error,
    getAllRoles,
    getOneRole,
    createNewRole,
    deleteOneRole,
    updateOneRole,
    clearDataCurrentRole,
    resetDataRole,
  };
};
