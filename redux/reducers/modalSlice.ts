// counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  openLogin: boolean;
  openSignup: boolean;
  openStripe: boolean;
  openSelectPlan: boolean;
  openActivateAccount: boolean;
  openFinishAccount: boolean;
}

const initialState: ModalState = {
  openLogin: false,
  openSignup: false,
  openStripe: false,
  openSelectPlan: false,
  openActivateAccount: false,
  openFinishAccount: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenLogin(state, action: PayloadAction<boolean>) {
      state.openLogin = action.payload;
    },
    setOpenSignup(state, action: PayloadAction<boolean>) {
      state.openSignup = action.payload;
    },
    setOpenStripe(state, action: PayloadAction<boolean>) {
      state.openStripe = action.payload;
    },
    setOpenSelectPlan(state, action: PayloadAction<boolean>) {
      state.openSelectPlan = action.payload;
    },
    setOpenActivateAccount(state, action: PayloadAction<boolean>) {
      state.openActivateAccount = action.payload;
    },
    setOpenFinishAccount(state, action: PayloadAction<boolean>) {
      state.openFinishAccount = action.payload;
    },
  },
});

export const { setOpenLogin, setOpenSignup, setOpenStripe, setOpenSelectPlan, setOpenActivateAccount, setOpenFinishAccount } = modalSlice.actions;
export default modalSlice.reducer;
