import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewCategory,
  deleteOneCategory,
  updateOneCategory,
  getAllCategories,
  getOneCategoryByID,
} from "../services/categories.services";
import {
  IErrorCategory,
  IPaginationCaterogy,
  IResponseCategory,
  ICategory,
  IResponseCaterogies,
} from "../types";

interface ICategoryState {
  info: IPaginationCaterogy | null;
  results: ICategory[];
  currentCategory: ICategory | null;
  loading: boolean;
  error: string | null;
}

const initialState: ICategoryState = {
  info: null,
  results: [],
  currentCategory: null,
  loading: false,
  error: null,
};

export const getAllListCategories = createAsyncThunk<
  IResponseCaterogies,
  number | undefined,
  { rejectValue: IErrorCategory }
>("categories/getAllCategories", async (page, { rejectWithValue }) => {
  try {
    return await getAllCategories(page);
  } catch (error) {
    return rejectWithValue(error as IErrorCategory);
  }
});

export const getCategoryByID = createAsyncThunk<
  IResponseCategory,
  number,
  { rejectValue: IErrorCategory }
>("categories/getCategoryByID", async (idCategory, { rejectWithValue }) => {
  try {
    return await getOneCategoryByID(idCategory);
  } catch (error) {
    return rejectWithValue(error as IErrorCategory);
  }
});

export const createCategory = createAsyncThunk<
  IResponseCategory,
  string,
  { rejectValue: IErrorCategory }
>("categories/createCategory", async (nameCategory, { rejectWithValue }) => {
  try {
    return await createNewCategory(nameCategory);
  } catch (error) {
    return rejectWithValue(error as IErrorCategory);
  }
});

export const updateOneCategoryByID = createAsyncThunk<
  IResponseCategory,
  ICategory,
  { rejectValue: IErrorCategory }
>("categories/updateCategory", async (dataCategory, { rejectWithValue }) => {
  try {
    return await updateOneCategory(dataCategory);
  } catch (error) {
    return rejectWithValue(error as IErrorCategory);
  }
});

export const deleteOneCategoryByID = createAsyncThunk<
  IResponseCategory,
  number,
  { rejectValue: IErrorCategory }
>("categories/deleteCategory", async (idCategory, { rejectWithValue }) => {
  try {
    return await deleteOneCategory(idCategory);
  } catch (error) {
    return rejectWithValue(error as IErrorCategory);
  }
});

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearInfoCategoryError: (state) => {
      state.error = null;
    },
    clearCurrentCategoryData: (state) => {
      state.currentCategory = null;
    },
    resetAllDataCategory: (state) => {
      state.info = null;
      state.results = [];
      state.currentCategory = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // TODO GET ALL
      .addCase(getAllListCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllListCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.results = action.payload.results;
      })
      .addCase(getAllListCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO GET BY ID
      .addCase(getCategoryByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryByID.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCategory = action.payload.value;
      })
      .addCase(getCategoryByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO CREATE
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.results.unshift(action.payload.value);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO UPDATE
      .addCase(updateOneCategoryByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOneCategoryByID.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.value;
        state.results = state.results.map((item) =>
          item.idCategory === updated.idCategory ? updated : item,
        );
      })
      .addCase(updateOneCategoryByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO DELETE
      .addCase(deleteOneCategoryByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOneCategoryByID.fulfilled, (state, action) => {
        state.loading = false;
        const idCategory = action.payload.value.idCategory;
        state.results = state.results.filter(
          (item) => item.idCategory !== idCategory,
        );
      })
      .addCase(deleteOneCategoryByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      });
  },
});

export default categorySlice.reducer;

export const {
  clearInfoCategoryError,
  clearCurrentCategoryData,
  resetAllDataCategory,
} = categorySlice.actions;
