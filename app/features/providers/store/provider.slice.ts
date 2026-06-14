import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewProvider,
  deleteOneProvider,
  getAllProviders,
  getOneProviderByID,
  updateOneProvider,
} from "../services/providers.services";

import {
  IProvider,
  IProviderCreate,
  IProviderUpdate,
  IPaginationProvider,
  IErrorProvider,
  IResponseProviders,
  IResponseProvider,
} from "../types";

interface IProviderState {
  info: IPaginationProvider | null;
  results: IProvider[];
  currentProvider: IProvider | null;
  loading: boolean;
  error: string | null;
}

const initialState: IProviderState = {
  info: null,
  results: [],
  currentProvider: null,
  loading: false,
  error: null,
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

const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
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
        state.results.unshift(action.payload.value);
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
        const updated = action.payload.value;
        state.results = state.results.map((item) =>
          item.idProvider === updated.idProvider ? updated : item,
        );
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
        const idProvider = action.payload.value.idProvider;
        state.results = state.results.filter((item) => item.idProvider !== idProvider);
      })
      .addCase(deleteOneProviderByID.rejected, (state, action) => {
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
} = providerSlice.actions;
