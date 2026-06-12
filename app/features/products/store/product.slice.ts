import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewProduct,
  deleteOneProduct,
  getAllProducts,
  getOneProductByID,
  updateOneProduct,
} from "../services/products.services";
import {
  IErrorProduct,
  IPaginationProduct,
  IProduct,
  IResponseProduct,
  IResponseProducts,
} from "../types";

interface IProductState {
  info: IPaginationProduct | null;
  results: IProduct[];
  currentProduct: IProduct | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: IProductState = {
  info: null,
  results: [],
  currentProduct: null,
  loading: false,
  error: null,
  success: false,
};

export const getAllListProducts = createAsyncThunk<
  IResponseProducts,
  number | undefined,
  { rejectValue: IErrorProduct }
>("products/getAllProducts", async (page, { rejectWithValue }) => {
  try {
    return await getAllProducts(page);
  } catch (error) {
    return rejectWithValue(error as IErrorProduct);
  }
});

export const getProductByID = createAsyncThunk<
  IResponseProduct,
  number,
  { rejectValue: IErrorProduct }
>("products/getProductByID", async (idProduct, { rejectWithValue }) => {
  try {
    return await getOneProductByID(idProduct);
  } catch (error) {
    return rejectWithValue(error as IErrorProduct);
  }
});

export const createProduct = createAsyncThunk<
  IResponseProduct,
  Omit<IProduct, "idProduct">,
  { rejectValue: IErrorProduct }
>("products/createProduct", async (dataProduct, { rejectWithValue }) => {
  try {
    return await createNewProduct(dataProduct);
  } catch (error) {
    return rejectWithValue(error as IErrorProduct);
  }
});

export const updateOneProductByID = createAsyncThunk<
  IResponseProduct,
  IProduct,
  { rejectValue: IErrorProduct }
>("products/updateProduct", async (dataProduct, { rejectWithValue }) => {
  try {
    return await updateOneProduct(dataProduct);
  } catch (error) {
    return rejectWithValue(error as IErrorProduct);
  }
});

export const deleteOneProductByID = createAsyncThunk<
  IResponseProduct,
  number,
  { rejectValue: IErrorProduct }
>("products/deleteProduct", async (idProduct, { rejectWithValue }) => {
  try {
    return await deleteOneProduct(idProduct);
  } catch (error) {
    return rejectWithValue(error as IErrorProduct);
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearInfoProductError: (state) => {
      state.error = null;
    },
    clearCurrentProductData: (state) => {
      state.currentProduct = null;
    },
    clearSuccessFlagProduct: (state) => {
      state.success = false;
    },
    resetAllDataProduct: (state) => {
      state.info = null;
      state.results = [];
      state.currentProduct = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // TODO GET ALL
      .addCase(getAllListProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllListProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.results = action.payload.results;
        state.success = action.payload.success;
      })
      .addCase(getAllListProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO GET BY ID
      .addCase(getProductByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductByID.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload.value;
        state.success = action.payload.success;
      })
      .addCase(getProductByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO CREATE
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.results.unshift(action.payload.value);
        state.success = action.payload.success;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO UPDATE
      .addCase(updateOneProductByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOneProductByID.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.value;
        state.results = state.results.map((item) =>
          item.idProduct === updated.idProduct ? updated : item,
        );
        state.success = action.payload.success;
      })
      .addCase(updateOneProductByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO DELETE
      .addCase(deleteOneProductByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOneProductByID.fulfilled, (state, action) => {
        state.loading = false;
        const idProduct = action.payload.value.idProduct;
        state.results = state.results.filter(
          (item) => item.idProduct !== idProduct,
        );
        state.success = action.payload.success;
      })
      .addCase(deleteOneProductByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      });
  },
});

export default productsSlice.reducer;

export const {
  clearInfoProductError,
  clearCurrentProductData,
  clearSuccessFlagProduct,
  resetAllDataProduct,
} = productsSlice.actions;
