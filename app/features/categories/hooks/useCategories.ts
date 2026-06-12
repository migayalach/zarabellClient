"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectCategoriesResults,
  selectCategoryError,
  selectCategoryInfo,
  selectCategoryLoading,
  selectCurrentCategory,
  selectSuccesCategoryFlag,
} from "../store/category.selector";
import {
  clearCurrentCategoryData,
  clearSuccessFlagCategory,
  createCategory,
  deleteOneCategoryByID,
  getAllListCategories,
  getCategoryByID,
  resetAllDataCategory,
  updateOneCategoryByID,
} from "../store/category.slice";
import { ICategory } from "../types";

export const useCategory = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectCategoryInfo);
  const results = useAppSelector(selectCategoriesResults);
  const currentCategory = useAppSelector(selectCurrentCategory);
  const loading = useAppSelector(selectCategoryLoading);
  const error = useAppSelector(selectCategoryError);
  const successCategory = useAppSelector(selectSuccesCategoryFlag);

  const getAllCategoriess = (page?: number) => {
    dispatch(getAllListCategories(page));
  };

  const getOneCategory = (idCategory: number) => {
    dispatch(getCategoryByID(idCategory));
  };

  const createNewCategory = (nameCategory: string) => {
    dispatch(createCategory(nameCategory));
  };

  const deleteOneCategory = (idCategory: number) => {
    dispatch(deleteOneCategoryByID(idCategory));
  };

  const updateOneCategory = (dataCategory: ICategory) => {
    dispatch(updateOneCategoryByID(dataCategory));
  };

  const clearDataCurrentCategory = () => {
    dispatch(clearCurrentCategoryData());
  };

  const resetCurrentStateCategory = () => {
    dispatch(clearSuccessFlagCategory());
  };

  const resetDataCategory = () => {
    dispatch(resetAllDataCategory());
  };

  return {
    info,
    results,
    successCategory,
    currentCategory,
    loading,
    error,
    getAllCategoriess,
    getOneCategory,
    createNewCategory,
    deleteOneCategory,
    updateOneCategory,
    clearDataCurrentCategory,
    resetCurrentStateCategory,
    resetDataCategory,
  };
};
