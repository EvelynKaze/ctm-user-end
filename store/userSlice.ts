import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  _id: string;
  clerkId: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  roi: number;
  role?: string;
  kycStatus?: boolean;
  currentValue: number;
  accountStatus?: boolean;
  totalInvestment: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  id?: string;
}

interface UserState {
  userData: UserData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userData: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setUserError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearUserData: (state) => {
      state.userData = null;
      state.error = null;
      state.isLoading = false;
    },
    updateUserPortfolio: (state, action: PayloadAction<{
      totalInvestment?: number;
      currentValue?: number;
      roi?: number;
    }>) => {
      if (state.userData) {
        state.userData = {
          ...state.userData,
          ...action.payload,
        };
      }
    },
  },
});

export const {
  setUserLoading,
  setUserData,
  setUserError,
  clearUserData,
  updateUserPortfolio,
} = userSlice.actions;

export default userSlice.reducer;