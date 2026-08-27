"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectCurrentUser,
  selectUsersError,
  selectUsersInfo,
  selectUsersLoading,
  selectUsersResults,
  selectInfoWatchUser,
} from "../store/user.selector";
import {
  getAllListUsers,
  getUserByID,
  createUser,
  updateOneUserByID,
  deleteOneUserByID,
  clearCurrentUserData,
  resetAllDataUser,
  addInfoWatch,
  clearInfoWatch,
  userFilters,
} from "../store/user.slice";
import { IFilterUser, IUserInfo, IUserUpdate } from "../types";
import { unwrapResult } from "@reduxjs/toolkit";

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectUsersInfo);
  const results = useAppSelector(selectUsersResults);
  const currentUser = useAppSelector(selectCurrentUser);
  const loading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);
  const watch = useAppSelector(selectInfoWatchUser);

  const getAllUsers = async (page?: number) => {
    const result = await dispatch(getAllListUsers(page));
    return unwrapResult(result);
  };

  const filterUsers = async (filters: IFilterUser, page?: number) => {
    const result = await dispatch(userFilters({ filters, page }));
    return unwrapResult(result);
  };

  const getOneUser = async (idUser: number) => {
    const result = await dispatch(getUserByID(idUser));
    return unwrapResult(result);
  };

  const createNewUser = async (
    dataUser: Omit<IUserInfo, "idUser" | "stateUser" | "nameRole">,
  ) => {
    const result = await dispatch(createUser(dataUser));
    return unwrapResult(result);
  };

  const deleteOneUser = async (idUser: number) => {
    const result = await dispatch(deleteOneUserByID(idUser));
    return unwrapResult(result);
  };

  const updateOneUser = async (dataUser: IUserUpdate) => {
    const result = await dispatch(updateOneUserByID(dataUser));
    return unwrapResult(result);
  };

  const clearDataCurrentUser = () => {
    dispatch(clearCurrentUserData());
  };

  const resetDataUser = () => {
    dispatch(resetAllDataUser());
  };

  const addInfoWatchAction = (action: string) => {
    dispatch(addInfoWatch(action));
  };

  const clearInfoWatchAction = () => {
    dispatch(clearInfoWatch());
  };

  return {
    info,
    results,
    currentUser,
    loading,
    error,
    watch,
    getAllUsers,
    getOneUser,
    createNewUser,
    deleteOneUser,
    updateOneUser,
    clearDataCurrentUser,
    resetDataUser,
    addInfoWatchAction,
    clearInfoWatchAction,
    filterUsers,
  };
};
