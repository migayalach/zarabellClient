"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectCurrentProvider,
  selectProvidersError,
  selectProvidersInfo,
  selectProvidersLoading,
  selectProvidersResults,
} from "../store/provider.selector";

import {
  clearCurrentProviderData,
  createProvider,
  deleteOneProviderByID,
  getAllListProvider,
  getProviderByID,
  resetAllDataProvider,
  updateOneProviderByID,
} from "../store/provider.slice";

import { IProviderCreate, IProviderUpdate } from "../types";

export const useProviders = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectProvidersInfo);
  const results = useAppSelector(selectProvidersResults);
  const currentProvider = useAppSelector(selectCurrentProvider);
  const loading = useAppSelector(selectProvidersLoading);
  const error = useAppSelector(selectProvidersError);

  const getAllProviders = (page?: number) => {
    dispatch(getAllListProvider(page));
  };

  const getOneProvider = (idProvider: number) => {
    dispatch(getProviderByID(idProvider));
  };

  const createNewProvider = (infoProvider: IProviderCreate) => {
    dispatch(createProvider(infoProvider));
  };

  const deleteOneProvider = (idProvider: number) => {
    dispatch(deleteOneProviderByID(idProvider));
  };

  const updateOneProvider = (infoProvider: IProviderUpdate) => {
    dispatch(updateOneProviderByID(infoProvider));
  };

  const clearDataCurrentProvider = () => {
    dispatch(clearCurrentProviderData());
  };

  const resetDataProvider = () => {
    dispatch(resetAllDataProvider());
  };

  return {
    info,
    results,
    currentProvider,
    loading,
    error,
    getAllProviders,
    getOneProvider,
    createNewProvider,
    deleteOneProvider,
    updateOneProvider,
    clearDataCurrentProvider,
    resetDataProvider,
  };
};
