import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginError,
  IUserInfo,
  UserStore,
  SignInResponse,
  IResponseCurrentUser,
} from "../types";
import { getCurrentInfoUser, signInRequest } from "../services/auth.services";

export interface SignState {
  info: IUserInfo | null;
  loading: boolean;
  initialized: boolean;
  error: string | null;
}

const initialState: SignState = {
  info: null,
  loading: false,
  initialized: false,
  error: null,
};

export const signInSession = createAsyncThunk<
  SignInResponse,
  UserStore,
  { rejectValue: LoginError }
>("auth/signIn", async (data, { rejectWithValue }) => {
  try {
    return await signInRequest(data);
  } catch (error) {
    return rejectWithValue(error as LoginError);
  }
});

export const getCurrentUserInfo = createAsyncThunk<
  IResponseCurrentUser,
  void,
  { rejectValue: LoginError }
>("auth/getCurrentUser", async (_, { rejectWithValue }) => {
  try {
    return await getCurrentInfoUser();
  } catch (error) {
    return rejectWithValue(error as LoginError);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addInfoSession: (state, action) => {
      state.loading = false;
      state.info = action.payload;
    },
    clearInfoSessionError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInSession.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.value;
        state.initialized = action.payload.success;
      })
      .addCase(signInSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? null;
      })

      .addCase(getCurrentUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.value;
        state.initialized = action.payload.success;
      })
      .addCase(getCurrentUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.error = action.payload?.message ?? null;
      });
  },
});

export default authSlice.reducer;
export const { addInfoSession, clearInfoSessionError } = authSlice.actions;
