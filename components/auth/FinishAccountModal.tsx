import React, { CSSProperties, useEffect, useState } from "react";
import {
  AutocompleteInput,
  EmailInput,
  PasswordInput,
  TextFieldInput,
} from "@common/Inputs";
import { CountryOption } from "@data/countries";
import { UtilsIoStore } from "@redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AuthModal from "@common/Modals/AuthModal";
import { setOpenFinishAccount } from "@redux/reducers/modalSlice";
import { useSupabase } from "@contexts/supabaseContext";
import VerifyInfo from "@auth/Wizard/VerifyInfo";
import VerificationCode from "@auth/Wizard/VerificationCode";
import SelectPlans from "@auth/Wizard/SelectPlans";
import PayWithStripe from "./Wizard/PayWithStripe";
import Wizard from "@common/Wizard";
import { useRouter } from "next/router";

export interface FinishAccountForm {
  avatar?: string;
  username?: string;
  dateOfBirth?: Date | null;
  // phoneNumber: string;
  // countryCode: string;
  country?: CountryOption | null;
  verificationCode?: string;
  trialSelected?: string;
}

export interface FinishAccountDataToSetup {
  username: string;
  avatar: string;
  dob: Date;
  country_of_residence: string;
  last_logged_in: Date;
  created_at: Date;
}

export interface CommonFinishAccountProps {
  formData: FinishAccountForm;
  setFormData: React.Dispatch<React.SetStateAction<FinishAccountForm>>;
}
export enum FinishAccountSteps { 
  VerifyInfo = 0,
  VerifyCode = 1,
  SelectPlan = 2,
  PaymentInfo = 3,
}

const FinishAccountModal = () => {
  const router = useRouter();
  const { user, verifyEmail, verifyCode, openStripeCheckout } = useSupabase();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { currentSubscriptionData } = useSelector((state: UtilsIoStore) => state.auth);

  const steps = ["Verify", "Code", "Plan"];
  const dispatch = useDispatch();

  const defaultAccountForm = () => ({
    avatar: user ? `https://robohash.org/${user?.email!}.png` : "",
    username: user ? user?.email! : "",
    dateOfBirth: null,
    country: null,
    verificationCode: "",
    trialSelected: "",
  });

  const [formData, setFormData] = useState<FinishAccountForm>(defaultAccountForm());
  const needToVerifyCode = (step: number) => step !== FinishAccountSteps.VerifyInfo && !currentSubscriptionData?.activated
  const doUpdateSubscription = (step: number) => !needToVerifyCode(step) && activeStep === FinishAccountSteps.PaymentInfo
  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        avatar: `https://robohash.org/${user?.email!}.png`,
        username: user?.email!,
      }));
    }
  }, [user]);

  const displayCurrentStep = () => {
    if (activeStep === FinishAccountSteps.VerifyInfo)
      return <VerifyInfo formData={formData} setFormData={setFormData} />;
    if (activeStep === FinishAccountSteps.VerifyCode)
      return <VerificationCode formData={formData} setFormData={setFormData} />;
    if (activeStep === FinishAccountSteps.SelectPlan)
      return <SelectPlans formData={formData} setFormData={setFormData} />;
    if (activeStep === FinishAccountSteps.PaymentInfo)
      return <PayWithStripe formData={formData} setFormData={setFormData} />;

    return null;
  };

  return (
    <AuthModal
      setOpen={(val: boolean) => {
        router.push("/");
        dispatch(setOpenFinishAccount(val));
      }}
      open={true}
      aria-labelledby="finish-account-title"
      aria-describedby="finish-account-description"
    >
      <Wizard
        onClose={() => dispatch(setOpenFinishAccount(false))}
        onNext={async () => {
          const nextStep = activeStep + 1;
          setLoading(true);
          try {
            if (nextStep === FinishAccountSteps.VerifyCode) await verifyEmail(formData);
            if (nextStep === FinishAccountSteps.SelectPlan) await verifyCode(formData.verificationCode!);
            setActiveStep(nextStep);
          } finally {
            setLoading(false);
          }
        }}
        onFinish={async () => await openStripeCheckout(formData)}
        canFinish={!!formData.trialSelected}
        onReset={() => setFormData(defaultAccountForm())}
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        loading={loading}
        setLoading={setLoading}
        title="Setup Your Account"
      >
        {displayCurrentStep()}
      </Wizard>
    </AuthModal>
  );
};

export default FinishAccountModal;
