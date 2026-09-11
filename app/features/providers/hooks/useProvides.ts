"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectCurrentProvider,
  selectProvidersError,
  selectProvidersInfo,
  selectProvidersLoading,
  selectProvidersResults,
  selectInfoWatchProvider,
} from "../store/provider.selector";
import {
  clearCurrentProviderData,
  createProvider,
  deleteOneProviderByID,
  getAllListProvider,
  getProviderByID,
  resetAllDataProvider,
  updateOneProviderByID,
  addInfoWatch,
  clearInfoWatch,
  providerFilters,
  clearInfoProviderError,
} from "../store/provider.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { IFilterProviders, IProviderCreate, IProviderUpdate } from "../types";

export const useProviders = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectProvidersInfo);
  const results = useAppSelector(selectProvidersResults);
  const currentProvider = useAppSelector(selectCurrentProvider);
  const loading = useAppSelector(selectProvidersLoading);
  const error = useAppSelector(selectProvidersError);
  const watch = useAppSelector(selectInfoWatchProvider);

  const getAllProviders = async (page?: number) => {
    const result = await dispatch(getAllListProvider(page));
    return unwrapResult(result);
  };

  const filterProviders = async (filters: IFilterProviders, page?: number) => {
    const result = await dispatch(providerFilters({ filters, page }));
    return unwrapResult(result);
  };

  const getOneProvider = async (idProvider: number) => {
    const result = await dispatch(getProviderByID(idProvider));
    return unwrapResult(result);
  };

  const createNewProvider = async (infoProvider: IProviderCreate) => {
    const result = await dispatch(createProvider(infoProvider));
    return unwrapResult(result);
  };

  const deleteOneProvider = async (idProvider: number) => {
    const result = await dispatch(deleteOneProviderByID(idProvider));
    return unwrapResult(result);
  };

  const updateOneProvider = async (infoProvider: IProviderUpdate) => {
    const result = await dispatch(updateOneProviderByID(infoProvider));
    return unwrapResult(result);
  };

  const clearDataCurrentProvider = () => {
    dispatch(clearCurrentProviderData());
  };

  const resetDataProvider = () => {
    dispatch(resetAllDataProvider());
  };

  const clearInfoWatchProvider = () => {
    dispatch(clearInfoWatch());
  };

  const clearErrorProvider = () => {
    dispatch(clearInfoProviderError());
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
    filterProviders,
    addInfoWatch,
    clearInfoWatchProvider,
    watch,
    clearErrorProvider,
  };
};
