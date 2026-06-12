"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectCurrentProduct,
  selectProductsError,
  selectProductsInfo,
  selectProductsLoading,
  selectProductsResults,
  selectSuccesProductFlag,
} from "../store/product.selector";
import {
  clearCurrentProductData,
  clearSuccessFlagProduct,
  createProduct,
  deleteOneProductByID,
  getAllListProducts,
  getProductByID,
  resetAllDataProduct,
  updateOneProductByID,
} from "../store/product.slice";
import { IProduct } from "../types";

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectProductsInfo);
  const results = useAppSelector(selectProductsResults);
  const currentProduct = useAppSelector(selectCurrentProduct);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
  const successProduct = useAppSelector(selectSuccesProductFlag);

  const getAllProducts = (page?: number) => {
    dispatch(getAllListProducts(page));
  };

  const getOneProduct = (idProduct: number) => {
    dispatch(getProductByID(idProduct));
  };

  const createNewProduct = (dataProduct: Omit<IProduct, "idProduct">) => {
    dispatch(createProduct(dataProduct));
  };

  const deleteOneProduct = (idProduct: number) => {
    dispatch(deleteOneProductByID(idProduct));
  };

  const updateOneProduct = (dataProduct: IProduct) => {
    dispatch(updateOneProductByID(dataProduct));
  };

  const clearDataCurrentProduct = () => {
    dispatch(clearCurrentProductData());
  };

  const resetCurrentStateProduct = () => {
    dispatch(clearSuccessFlagProduct());
  };

  const resetDataProduct = () => {
    dispatch(resetAllDataProduct());
  };

  return {
    info,
    results,
    successProduct,
    currentProduct,
    loading,
    error,
    getAllProducts,
    getOneProduct,
    createNewProduct,
    deleteOneProduct,
    updateOneProduct,
    clearDataCurrentProduct,
    resetCurrentStateProduct,
    resetDataProduct,
  };
};
