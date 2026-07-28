import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginError,
  IUserInfo,
  UserStore,
  SignInResponse,
  IResponseCurrentUser,
  PasswordChangeSuccess,
  IPasswordInfo,
  IUpdateProfile,
} from "../types";
import {
  getCurrentInfoUser,
  signInRequest,
  changePassword,
  updateInfoUser,
  resetPasswordUser,
} from "../services/auth.services";

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

export const resetUserPassword = createAsyncThunk<
  { success: boolean },
  number,
  { rejectValue: LoginError }
>("auth/reset-password", async (idUser, { rejectWithValue }) => {
  try {
    return await resetPasswordUser(idUser);
  } catch (error) {
    return rejectWithValue(error as LoginError);
  }
});

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

export const updatePasswordUser = createAsyncThunk<
  PasswordChangeSuccess,
  IPasswordInfo,
  { rejectValue: LoginError }
>("auth/updatePassword", async (data, { rejectWithValue }) => {
  try {
    return await changePassword(data);
  } catch (error) {
    return rejectWithValue(error as LoginError);
  }
});

export const updateInfoProfile = createAsyncThunk<
  IResponseCurrentUser,
  IUpdateProfile,
  { rejectValue: LoginError }
>("auth/updateProfile", async (data, { rejectWithValue }) => {
  try {
    return await updateInfoUser(data);
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
      })

      .addCase(updatePasswordUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePasswordUser.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = action.payload.success;
      })
      .addCase(updatePasswordUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? null;
      })

      .addCase(updateInfoProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInfoProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.value;
        state.initialized = action.payload.success;
      })
      .addCase(updateInfoProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? null;
      });
  },
});

export default authSlice.reducer;
export const { addInfoSession, clearInfoSessionError } = authSlice.actions;
