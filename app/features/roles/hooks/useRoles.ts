"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectCurrentRole,
  selectSuccesRoleFlag,
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
  clearSuccessFlagRole,
} from "../store/role.slice";

import { IRole } from "../types";

export const useRoles = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectRolesInfo);
  const results = useAppSelector(selectRolesResults);
  const currentRole = useAppSelector(selectCurrentRole);
  const loading = useAppSelector(selectRolesLoading);
  const error = useAppSelector(selectRolesError);
  const successRole = useAppSelector(selectSuccesRoleFlag);

  const getAllRoles = (page?: number) => {
    dispatch(getAllListRole(page));
  };

  const getOneRole = (idRole: number) => {
    dispatch(getRoleByID(idRole));
  };

  const createNewRole = (dataRole: Omit<IRole, "idRole">) => {
    dispatch(createRole(dataRole));
  };

  const deleteOneRole = (idRole: number) => {
    dispatch(deleteOneRoleByID(idRole));
  };

  const updateOneRole = (dataRole: IRole) => {
    dispatch(updateOneRoleByID(dataRole));
  };

  const clearDataCurrentRole = () => {
    dispatch(clearCurrentRoleData());
  };

  const resetCurrentStateRole = () => {
    dispatch(clearSuccessFlagRole());
  };

  const resetDataRole = () => {
    dispatch(resetAllDataRole());
  };

  return {
    info,
    results,
    successRole,
    currentRole,
    loading,
    error,
    getAllRoles,
    getOneRole,
    createNewRole,
    deleteOneRole,
    updateOneRole,
    clearDataCurrentRole,
    resetCurrentStateRole,
    resetDataRole,
  };
};
