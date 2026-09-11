import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewProvider,
  deleteOneProvider,
  getAllProviders,
  getOneProviderByID,
  updateOneProvider,
  filterProviders,
} from "../services/providers.services";

import {
  IProvider,
  IProviderCreate,
  IProviderUpdate,
  IPaginationProvider,
  IErrorProvider,
  IResponseProviders,
  IResponseProvider,
  IFilterProviders,
  TProviderActionWatch,
} from "../types";

interface IProviderState {
  info: IPaginationProvider | null;
  results: IProvider[];
  currentProvider: IProvider | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  actionWatch: TProviderActionWatch | null;
}

const initialState: IProviderState = {
  info: null,
  results: [],
  currentProvider: null,
  loading: false,
  error: null,
  success: false,
  actionWatch: null,
};

export const getAllListProvider = createAsyncThunk<
  IResponseProviders,
  number | undefined,
  { rejectValue: IErrorProvider }
>("providers/getAllProviders", async (page, { rejectWithValue }) => {
  try {
    return await getAllProviders(page);
  } catch (error) {
    return rejectWithValue(error as IErrorProvider);
  }
});

export const getProviderByID = createAsyncThunk<
  IResponseProvider,
  number,
  { rejectValue: IErrorProvider }
>("providers/getProviderByID", async (idProvider, { rejectWithValue }) => {
  try {
    return await getOneProviderByID(idProvider);
  } catch (error) {
    return rejectWithValue(error as IErrorProvider);
  }
});

export const createProvider = createAsyncThunk<
  IResponseProvider,
  IProviderCreate,
  { rejectValue: IErrorProvider }
>("providers/createProvider", async (infoProvider, { rejectWithValue }) => {
  try {
    return await createNewProvider(infoProvider);
  } catch (error) {
    return rejectWithValue(error as IErrorProvider);
  }
});

export const updateOneProviderByID = createAsyncThunk<
  IResponseProvider,
  IProviderUpdate,
  { rejectValue: IErrorProvider }
>("providers/updateProvider", async (infoProvider, { rejectWithValue }) => {
  try {
    return await updateOneProvider(infoProvider);
  } catch (error) {
    return rejectWithValue(error as IErrorProvider);
  }
});

export const deleteOneProviderByID = createAsyncThunk<
  IResponseProvider,
  number,
  { rejectValue: IErrorProvider }
>("providers/deleteProvider", async (idProvider, { rejectWithValue }) => {
  try {
    return await deleteOneProvider(idProvider);
  } catch (error) {
    return rejectWithValue(error as IErrorProvider);
  }
});

export const providerFilters = createAsyncThunk<
  IResponseProviders,
  {
    filters?: IFilterProviders;
    page?: number | undefined;
  },
  { rejectValue: IErrorProvider }
>("providers/filter", async ({ filters, page }, { rejectWithValue }) => {
  try {
    return await filterProviders(filters, page);
  } catch (error) {
    return rejectWithValue(error as IErrorProvider);
  }
});

const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    addInfoWatch: (state, action) => {
      state.actionWatch = action.payload;
    },
    clearInfoWatch: (state) => {
      state.actionWatch = null;
    },
    clearInfoProviderError: (state) => {
      state.error = null;
    },
    clearCurrentProviderData: (state) => {
      state.currentProvider = null;
    },
    resetAllDataProvider: (state) => {
      state.info = null;
      state.results = [];
      state.currentProvider = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // TODO GET ALL
      .addCase(getAllListProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllListProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.results = action.payload.results;
      })
      .addCase(getAllListProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO GET BY ID
      .addCase(getProviderByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProviderByID.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProvider = action.payload.value;
      })
      .addCase(getProviderByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO CREATE
      .addCase(createProvider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentProvider = action.payload.value;
        state.actionWatch = "create";
      })
      .addCase(createProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO UPDATE
      .addCase(updateOneProviderByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOneProviderByID.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentProvider = action.payload.value;
        state.actionWatch = "update";
      })
      .addCase(updateOneProviderByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO DELETE
      .addCase(deleteOneProviderByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOneProviderByID.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentProvider = action.payload.value;
        state.actionWatch = "delete";
      })
      .addCase(deleteOneProviderByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO FILTERS
      .addCase(providerFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(providerFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.results = action.payload.results;
        state.actionWatch = "filters";
      })
      .addCase(providerFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      });
  },
});

export default providerSlice.reducer;

export const {
  clearInfoProviderError,
  clearCurrentProviderData,
  resetAllDataProvider,
  addInfoWatch,
  clearInfoWatch,
} = providerSlice.actions;
