"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectCurrentUser,
  selectSuccesUserFlag,
  selectUsersError,
  selectUsersInfo,
  selectUsersLoading,
  selectUsersResults,
} from "../store/user.selector";
import {
  getAllListUsers,
  getUserByID,
  createUser,
  updateOneUserByID,
  deleteOneUserByID,
  clearCurrentUserData,
  clearSuccessFlagUser,
  resetAllDataUser,
} from "../store/user.slice";

import {
  IUserInfo,
  IUserUpdate,
} from "../types";

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectUsersInfo);
  const results = useAppSelector(selectUsersResults);
  const currentUser = useAppSelector(selectCurrentUser);
  const loading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);
  const successUser = useAppSelector(selectSuccesUserFlag);

  const getAllUsers = (page?: number) => {
    dispatch(getAllListUsers(page));
  };

  const getOneUser = (idUser: number) => {
    dispatch(getUserByID(idUser));
  };

  const createNewUser = (
    dataUser: Omit<IUserInfo, "idUser" | "stateUser" | "nameRole">,
  ) => {
    dispatch(createUser(dataUser));
  };

  const deleteOneUser = (idUser: number) => {
    dispatch(deleteOneUserByID(idUser));
  };

  const updateOneUser = (dataUser: IUserUpdate) => {
    dispatch(updateOneUserByID(dataUser));
  };

  const clearDataCurrentUser = () => {
    dispatch(clearCurrentUserData());
  };

  const resetCurrentStateUser = () => {
    dispatch(clearSuccessFlagUser());
  };

  const resetDataUser = () => {
    dispatch(resetAllDataUser());
  };

  return {
    info,
    results,
    successUser,
    currentUser,
    loading,
    error,
    getAllUsers,
    getOneUser,
    createNewUser,
    deleteOneUser,
    updateOneUser,
    clearDataCurrentUser,
    resetCurrentStateUser,
    resetDataUser,
  };
};
