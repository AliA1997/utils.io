import { useEffect, useState } from "react";
import AuthModal from "../common/Modals/AuthModal";
import { setOpenActivateAccount } from "@redux/reducers/modalSlice";
import { useDispatch } from "react-redux";
import { useSupabase } from "@contexts/supabaseContext";
import Wizard from "@common/Wizard";
import { FinishAccountForm } from "./FinishAccountModal";
import VerificationCode from "./Wizard/VerificationCode";
import SelectPlans from "./Wizard/SelectPlans";
import PayWithStripe from "./Wizard/PayWithStripe";
import { useRouter } from "next/router";

export enum ActivateAccountSteps { 
  VerifyCode = 0,
  SelectPlan = 1,
  PaymentInfo = 2,
}

export default function ActivateAccountModal() {
  const router = useRouter();
  const { openStripeCheckout, verifyCode, setPlan } = useSupabase();
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const steps = ["Code", "Plan"];
  const defaultAccountForm = () => ({
    verificationCode: "",
    trialSelected: "",
  });

  const [formData, setFormData] = useState<FinishAccountForm>(
    defaultAccountForm()
  );
  const [loading, setLoading] = useState<boolean>(false);

  const displayCurrentStep = () => {
    if (activeStep === ActivateAccountSteps.VerifyCode)
      return <VerificationCode formData={formData} setFormData={setFormData} />;
    if (activeStep === ActivateAccountSteps.SelectPlan)
      return <SelectPlans formData={formData} setFormData={setFormData} />;

    return null;
  };

  return (
    <AuthModal
      setOpen={(val: boolean) => {
        router.push("/");
        dispatch(setOpenActivateAccount(val))
      }}
      open={true}
      aria-labelledby="activate-account-title"
      aria-describedby="activate-account-description"
    >
      <Wizard
        onClose={() => dispatch(setOpenActivateAccount(false))}
        onNext={async () => {
          const nextStep = activeStep + 1;
          if (nextStep == ActivateAccountSteps.SelectPlan) await verifyCode(formData.verificationCode!);
          if (nextStep == ActivateAccountSteps.PaymentInfo) await setPlan(formData.trialSelected!);
          setActiveStep(nextStep);
        }}
        onFinish={async () => await openStripeCheckout(formData)}
        canFinish={!!formData.trialSelected}
        onReset={() => setFormData(defaultAccountForm())}
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        loading={loading}
        setLoading={setLoading}
        title="Activate Your Account"
      >
        {displayCurrentStep()}
      </Wizard>
    </AuthModal>
  );
}
