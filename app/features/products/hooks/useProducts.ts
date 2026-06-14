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

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectProductsInfo);
  const results = useAppSelector(selectProductsResults);
  const currentProduct = useAppSelector(selectCurrentProduct);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);

  const getAllProducts = (page?: number) => {
    dispatch(getAllListProducts(page));
  };

  const getOneProduct = (idProduct: number) => {
    dispatch(getProductByID(idProduct));
  };

  const createNewProduct = (dataProduct: IProductCreate) => {
    dispatch(createProduct(dataProduct));
  };

  const deleteOneProduct = (idProduct: number) => {
    dispatch(deleteOneProductByID(idProduct));
  };

  const updateOneProduct = (dataProduct: IProductUpdate) => {
    dispatch(updateOneProductByID(dataProduct));
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
