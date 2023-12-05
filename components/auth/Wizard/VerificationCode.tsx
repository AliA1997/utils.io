import Avatar from "@mui/material/Avatar";
import Alert from '@mui/material/Alert';
import { TextFieldInput } from "@common/Inputs";
import { CommonFinishAccountProps, FinishAccountForm } from "@auth/FinishAccountModal";
import { DateOfBirthInput, AutocompleteInput } from "@common/Inputs";
import { CountryOption, countryList } from "@data/countries";
import DragAndDrop from "@common/Inputs/DragAndDrop";

export default function FinishAccount2(props: CommonFinishAccountProps) {
  const {
    formData,
    setFormData,
} = props;
    
const handleVerificationCodeChange = (event: any) => {
    const value = event.target.value;
    setFormData((prevData: FinishAccountForm) => ({
        ...prevData,
        verificationCode: value,
    }));
}
  return (
    <>
      <TextFieldInput
        label="Email Verification Code"
        name="email-verfication-code"
        value={formData.verificationCode}
        onChange={handleVerificationCodeChange}
      />
      <Alert sx={{ width: 400 }} severity="info">Verification Code was sent to you via email from supabase.io</Alert>
    </>
  );
}
