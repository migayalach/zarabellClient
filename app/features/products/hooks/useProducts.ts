"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectCurrentProduct,
  selectProductsError,
  selectProductsInfo,
  selectProductsLoading,
  selectProductsResults,
} from "../store/product.selector";
import {
  clearCurrentProductData,
  createProduct,
  deleteOneProductByID,
  getAllListProducts,
  getProductByID,
  resetAllDataProduct,
  updateOneProductByID,
} from "../store/product.slice";
import { IProductCreate, IProductUpdate } from "../types";
import { unwrapResult } from "@reduxjs/toolkit";

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectProductsInfo);
  const results = useAppSelector(selectProductsResults);
  const currentProduct = useAppSelector(selectCurrentProduct);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  const getAllProducts = async (page?: number) => {
    const result = await dispatch(getAllListProducts(page));
    return unwrapResult(result);
  };

  const getOneProduct = async (idProduct: number) => {
    const result = await dispatch(getProductByID(idProduct));
    return unwrapResult(result);
  };

  const createNewProduct = async (dataProduct: IProductCreate) => {
    const result = await dispatch(createProduct(dataProduct));
    return unwrapResult(result);
  };

  const deleteOneProduct = async (idProduct: number) => {
    const result = await dispatch(deleteOneProductByID(idProduct));
    return unwrapResult(result);
  };

  const updateOneProduct = async (dataProduct: IProductUpdate) => {
    const result = await dispatch(updateOneProductByID(dataProduct));
    return unwrapResult(result);
  };

  const clearDataCurrentProduct = () => {
    dispatch(clearCurrentProductData());
  };

  const resetDataProduct = () => {
    dispatch(resetAllDataProduct());
  };

  return {
    info,
    results,
    currentProduct,
    loading,
    error,
    getAllProducts,
    getOneProduct,
    createNewProduct,
    deleteOneProduct,
    updateOneProduct,
    clearDataCurrentProduct,
    resetDataProduct,
  };
};
