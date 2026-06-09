import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginError, LoginInfo, LoginSuccess, UserStore } from "../types";
import { signInRequest } from "../services/auth.services";

export interface SignState {
  info: LoginInfo | null;
  access_token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: SignState = {
  info: null,
  access_token: null,
  loading: false,
  error: null,
};

export const signInSession = createAsyncThunk<
  LoginSuccess,
  UserStore,
  { rejectValue: LoginError }
>("auth/signIn", async (data, { rejectWithValue }) => {
  try {
    return await signInRequest(data);
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
        state.info = action.payload.user;
        state.access_token = action.payload.token;
      })
      .addCase(signInSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? null;
      });
  },
});

export default authSlice.reducer;
export const { addInfoSession, clearInfoSessionError } = authSlice.actions;
