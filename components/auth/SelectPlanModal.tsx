import { useEffect, useState } from "react";
import AuthModal from "../common/Modals/AuthModal";
import { setOpenSelectPlan } from "@redux/reducers/modalSlice";
import { useDispatch } from "react-redux";
import { useSupabase } from "@contexts/supabaseContext";
import Wizard from "@common/Wizard";
import { FinishAccountForm, } from "./FinishAccountModal";
import VerificationCode from "./Wizard/VerificationCode";
import SelectPlans from "./Wizard/SelectPlans";
import PayWithStripe from "./Wizard/PayWithStripe";
import { useRouter } from "next/router";


export enum  SelectPlanSteps { 
    SelectPlan = 0,
    PaymentInfo = 1,
  }

export default function SelectPlanModal() {
  const router = useRouter();
  const { openStripeCheckout, setPlan } = useSupabase();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const steps = ["Select Plan"];
  const defaultAccountForm = () => ({
    trialSelected: "",
  });

  const [formData, setFormData] = useState<FinishAccountForm>(
    defaultAccountForm()
  );

  const displayCurrentStep = () => {
    if (activeStep === SelectPlanSteps.SelectPlan)
      return <SelectPlans formData={formData} setFormData={setFormData} />;

    return null;
  };

  return (
    <AuthModal
      setOpen={(val: boolean) => {
        router.push("/");
        dispatch(setOpenSelectPlan(val));
      }}
      open={true}
      aria-labelledby="select-plan-title"
      aria-describedby="select-plan-description"
    >
      <Wizard
        onClose={() => dispatch(setOpenSelectPlan(false))}
        onNext={async () => {
          setLoading(true);
          const nextStep = activeStep + 1;
          try {
            setActiveStep(nextStep);
          } finally {
            setLoading(false);
          }
        }}
        onFinish={async () => {
          await setPlan(formData.trialSelected!);
          await openStripeCheckout(formData);
        }}
        canFinish={!!formData.trialSelected}
        onReset={() => setFormData(defaultAccountForm())}
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        loading={loading}
        setLoading={setLoading}
        title="Select Your Plan"
        hideStepper={true}
      >
        {displayCurrentStep()}
      </Wizard>
    </AuthModal>
  );
}
