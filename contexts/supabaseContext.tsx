import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient, Session, User } from "@supabase/supabase-js";
import axios from "axios";
import {
  FinishAccountDataToSetup,
  FinishAccountForm,
} from "@auth/FinishAccountModal";
import {
  setUserSubscriptionData,
  setVerifyEmailCode,
} from "@redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { UtilsIoStore } from "@redux/reducers";
import {
  setOpenActivateAccount,
  setOpenFinishAccount,
  setOpenSelectPlan,
  setOpenStripe,
} from "@redux/reducers/modalSlice";
import { useRouter } from "next/router";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(supabaseUrl, supabaseKey);

interface SupabaseContextType {
  session: Session | null;
  user: User | null;
  checkProfile: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  verifyEmail: (formData: FinishAccountForm) => Promise<void>;
  verifyCode: (code: string) => Promise<void>;
  setPlan: (plan: string) => Promise<void>;
  openStripeCheckout: (formData: FinishAccountForm) => Promise<void>;
  signOut: () => Promise<void>;
}

export enum ProfileCheckErrorMessage {
  NoAccount = "No subscription found for this user",
  NotActivated = "User not activated",
  MustSelectPlan = "Must select a plan",
  FreeTrialFinishedOrHaveNotPaid = "Need to pay or start trial",
}

export const SupabaseContext = createContext<SupabaseContextType>({
  session: null,
  user: null,
  checkProfile: (email: string) => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  verifyEmail: (formData: FinishAccountForm) => Promise.resolve(),
  verifyCode: (code: string) => Promise.resolve(),
  setPlan: (plan: string) => Promise.resolve(),
  openStripeCheckout: (formData: FinishAccountForm) => Promise.resolve(),
  signOut: () => Promise.resolve(),
});

export const SupabaseProvider = (props: React.PropsWithChildren<any>) => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const { currentSubscriptionData } = useSelector(
    (state: UtilsIoStore) => state.auth
  );
  const { openFinishAccount, openActivateAccount, openSelectPlan, openStripe } =
    useSelector((state: UtilsIoStore) => state.modal);
  const openStripeFunc = (val: boolean) => dispatch(setOpenStripe(val));
  const openSelectPlanFunc = (val: boolean) => {
    router.push("/select-plan");
    dispatch(setOpenSelectPlan(val));
  };

  const openActivateAccountFunc = (val: boolean) => {
    router.push("/activate-account");
    dispatch(setOpenActivateAccount(val));
  };

  const openFinishAccountFunc = (val: boolean) => {
    router.push("/finish-account");
    dispatch(setOpenFinishAccount(val));
  };

  async function setSessionAndUser() {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    setUser(data.session?.user ?? null);
  }

  useEffect(() => {
    setSessionAndUser();
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, updatedSession) => {
        setSession(updatedSession);
        setUser(updatedSession?.user ?? null);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  async function checkProfile(email: string) {
    const { data } = await axios.post("/api/auth/profile_check", { email });
    console.log("profile check response:", data);
    if (!data.success) {
      if (data.error_message === ProfileCheckErrorMessage.NoAccount)
        openFinishAccountFunc(true);
      if (data.error_message === ProfileCheckErrorMessage.NotActivated)
        openActivateAccountFunc(true);
      if (data.error_message === ProfileCheckErrorMessage.MustSelectPlan) openSelectPlanFunc(true);
      if (data.error_message === ProfileCheckErrorMessage.FreeTrialFinishedOrHaveNotPaid) openStripeFunc(true);
    } else {
      if (openFinishAccount) openFinishAccountFunc(false);
      if (openActivateAccount) openActivateAccountFunc(false);
      if (openSelectPlan) openSelectPlanFunc(false);
      if (openStripe) openStripeFunc(false);
    }
  }

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("supabase.auth.token");
  };

  const verifyEmail = async (formData: FinishAccountForm) => {
    try {
      const userDataToSetup: FinishAccountDataToSetup = {
        username: formData.username!,
        avatar: formData.avatar!,
        dob: new Date(formData.dateOfBirth!),
        country_of_residence: formData.country!.name,
        last_logged_in: new Date(),
        created_at: new Date(),
      };
      const { data } = await axios.post(
        "/api/auth/send-verification-code",
        userDataToSetup
      );

      dispatch(setVerifyEmailCode(data.verificationCode));
      dispatch(setUserSubscriptionData(data.userSubscription));
    } catch (error) {
      console.error("Verify Email Error:", error);
    }
  };

  const verifyCode = async (code: string) => {
    const { data } = await axios.post("/api/auth/verify-code", {
      code,
      userSubscriptionId: currentSubscriptionData?.id,
    });

    dispatch(setVerifyEmailCode(data.verifyCode));
    dispatch(setUserSubscriptionData(data.subscriptionUser));
  };

  const setPlan = async (planName: string) => {
    const { data } = await axios.post("/api/auth/set-plan", {
      planName,
      userSubscriptionId: currentSubscriptionData?.id,
    });

    dispatch(setUserSubscriptionData(data.subscriptionUser));
  };

  const openStripeCheckout = async (formData: FinishAccountForm) => {
    const { data: planData } = await axios.get(
      `/api/stripe/plans?planName=${
        formData!.trialSelected
      }&userSubscriptionId=${currentSubscriptionData?.id!}}`
    );
    console.log('planData:', planData);
    const { data } = await axios.post("/api/stripe/checkout", {
      priceId: planData.priceId,
      subId: planData.id,
      email: currentSubscriptionData?.username,
    });

    if (data.session && data.session.url) {
      window.open(data.session.url, "_self");
    }
  };

  const { children } = props;
  const supabaseContextValue: SupabaseContextType = {
    session,
    user,
    signInWithGoogle,
    checkProfile,
    verifyEmail,
    verifyCode,
    setPlan,
    openStripeCheckout,
    signOut,
  };

  return (
    <SupabaseContext.Provider value={supabaseContextValue}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = (): SupabaseContextType =>
  useContext(SupabaseContext);
