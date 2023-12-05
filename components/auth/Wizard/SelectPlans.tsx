import Avatar from "@mui/material/Avatar";
import Alert from '@mui/material/Alert';
import { TextFieldInput } from "@common/Inputs";
import { CommonFinishAccountProps, FinishAccountForm } from "../FinishAccountModal";
import { DateOfBirthInput, AutocompleteInput } from "@common/Inputs";
import { CountryOption, countryList } from "@data/countries";
import DragAndDrop from "@common/Inputs/DragAndDrop";
import Box from '@mui/material/Box';
import BasicFreeTrialPlan from "@auth/Plans/BasicPlanTrial";
import ChatbotFreeTrialPlan from "@auth/Plans/ChatbotPlanTrial";
import Web3FreeTrialPlan from "@auth/Plans/Web3PlanTrial";

export enum Plans { Basic = 'Basic', Web3 = 'Web3', Chatbot = 'Chatbot' }
export default function SelectPlans(props: CommonFinishAccountProps) {
  const {
    formData,
    setFormData,
  } = props;
  const setFreeTrialPlan = (event: any) => {
    const plan = event.target.id;
    setFormData((prevData: FinishAccountForm) => ({
        ...prevData,
        trialSelected: plan,
    }));
  }
  const trialProps = { formData, setFormData };
  return (
    <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
    >
        <BasicFreeTrialPlan {...trialProps}  />
        <Web3FreeTrialPlan {...trialProps} />
        <ChatbotFreeTrialPlan {...trialProps} />
    </Box>
  );
}
