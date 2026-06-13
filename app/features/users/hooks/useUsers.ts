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
} from "../store/user.slice";
import { IUserInfo, IUserUpdate } from "../types";

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectUsersInfo);
  const results = useAppSelector(selectUsersResults);
  const currentUser = useAppSelector(selectCurrentUser);
  const loading = useAppSelector(selectUsersLoading);
  const error = useAppSelector(selectUsersError);
  const watch = useAppSelector(selectInfoWatchUser);

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
  };
};
