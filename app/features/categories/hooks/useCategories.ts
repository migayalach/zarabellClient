"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectCategoriesResults,
  selectCategoryError,
  selectCategoryInfo,
  selectCategoryLoading,
  selectCurrentCategory,
} from "../store/category.selector";
import {
  clearCurrentCategoryData,
  createCategory,
  deleteOneCategoryByID,
  getAllListCategories,
  getCategoryByID,
  resetAllDataCategory,
  updateOneCategoryByID,
} from "../store/category.slice";
import { ICategory } from "../types";
import { unwrapResult } from "@reduxjs/toolkit";

export const useCategory = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectCategoryInfo);
  const results = useAppSelector(selectCategoriesResults);
  const currentCategory = useAppSelector(selectCurrentCategory);
  const loading = useAppSelector(selectCategoryLoading);
  const error = useAppSelector(selectCategoryError);

  const getAllCategories = async (page?: number) => {
    const result = await dispatch(getAllListCategories(page));
    return unwrapResult(result);
  };

  const getOneCategory = async (idCategory: number) => {
    const result = await dispatch(getCategoryByID(idCategory));
    return unwrapResult(result);
  };

  const createNewCategory = async (nameCategory: string) => {
    const result = await dispatch(createCategory(nameCategory));
    return unwrapResult(result);
  };

  const deleteOneCategory = async (idCategory: number) => {
    const result = await dispatch(deleteOneCategoryByID(idCategory));
    return unwrapResult(result);
  };

  const updateOneCategory = async (dataCategory: ICategory) => {
    const result = await dispatch(updateOneCategoryByID(dataCategory));
    return unwrapResult(result);
  };

  const clearDataCurrentCategory = () => {
    dispatch(clearCurrentCategoryData());
  };

  const resetDataCategory = () => {
    dispatch(resetAllDataCategory());
  };

  return {
    info,
    results,
    currentCategory,
    loading,
    error,
    getAllCategories,
    getOneCategory,
    createNewCategory,
    deleteOneCategory,
    updateOneCategory,
    clearDataCurrentCategory,
    resetDataCategory,
  };
};
