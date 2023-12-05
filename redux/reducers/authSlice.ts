// counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum CurrentUtilsIOSubscriptions {
  Basic = "Basic",
  Web3 = "Web3",
  Chatbot = "Chatbot",
}

export interface CurrentUtilsIOSubscriptionData {
  id: number;
  username: string;
  avatar: string;
  lastLoggedIn: Date;
  createdAt: Date;
  dob: Date;
  activated: boolean;
  countryOfResidence: string;
  beliefSystem?: number;
  subscription?: CurrentUtilsIOSubscriptions;
  tokensUsed?: number;
  serviceLastUsed?: string;
  basicRequestsLeft?: number;
  web3RequestsLeft?: number;
  chatbotRequestsLeft?: number;
  trialStart?: Date;
  trialEnd?: Date;
  trialFinished?: boolean;
}


export interface CurrentUtilsIOVerifyCodeData {
  expireTime: Date;
  used: boolean;
}

export interface AuthState {
  currentSubscriptionData: CurrentUtilsIOSubscriptionData | undefined;
  verifyEmailCode: CurrentUtilsIOVerifyCodeData | undefined;
}

const initialState: AuthState = {
  currentSubscriptionData: undefined,
  verifyEmailCode: undefined,
};

const modalSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setVerifyEmailCode(state, action: PayloadAction<CurrentUtilsIOVerifyCodeData | undefined>) {
      state.verifyEmailCode = action.payload;
    },
    setUserSubscriptionData(state, action: PayloadAction<CurrentUtilsIOSubscriptionData>) {
      state.currentSubscriptionData = action.payload;
    },
  },
});

export const { setVerifyEmailCode, setUserSubscriptionData } = modalSlice.actions;
export default modalSlice.reducer;
