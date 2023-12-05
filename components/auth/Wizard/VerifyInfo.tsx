import Avatar from "@mui/material/Avatar";
import Alert from '@mui/material/Alert';
import { TextFieldInput } from "@common/Inputs";
import { CommonFinishAccountProps, FinishAccountForm } from "@auth/FinishAccountModal";
import { DateOfBirthInput, AutocompleteInput } from "@common/Inputs";
import { CountryOption, countryList } from "@data/countries";
import DragAndDrop from "../../common/Inputs/DragAndDrop";
import PhoneNumberInput from "../../common/Inputs/PhoneNumberInput";

export default function FinishAccount1(props: CommonFinishAccountProps) {
  const {
    formData,
    setFormData,
  } = props;
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData: FinishAccountForm) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handlePhoneNumberChange = (val: string) => {
    setFormData((prevData: FinishAccountForm) => ({
      ...prevData,
      phoneNumber: val,
    }));
  }
  const handleCountryCodeChange = (val: string) => {
    setFormData((prevData: FinishAccountForm) => ({
      ...prevData,
      countryCode: val,
    }));
  }
  const handleDOBChange = (value: Date | null) => {
    setFormData((prevData) => ({
      ...prevData,
      dateOfBirth: value,
    }));
  };
  return (
    <>
      <Avatar
        src={formData.avatar}
        alt={formData.username + " " + "Avatar"}
        sx={{
          width: "200px",
          height: "200px",
          backgroundColor: "#000000",
          marginBottom: 5,
        }}
      />
      <TextFieldInput
        label="Username"
        name="username"
        value={formData.username}
        sx={{
            "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000000",
                opacity: 0.5,
                cursor: 'not-allowed'
              },
              width: 400,
              fontFamily: "Poppins",
              cursor: 'not-allowed'
        }}
        disabled={true}
      />
      {/* <PhoneNumberInput
        value={formData.phoneNumber}
        countryCodeValue={formData.countryCode}
        onChange={handlePhoneNumberChange}
        onCountryCodeChange={handleCountryCodeChange}
      /> */}
      <DateOfBirthInput
        label="Date of Birth"
        value={formData.dateOfBirth!}
        onChange={handleDOBChange}
        sx={{ width: 400, marginY: 2, fontFamily: "Poppins" }}
      />
      <AutocompleteInput<CountryOption>
        textFieldProps={{
          label: "Country of Residence",
          name: "country",
        }}
        labelKey="name"
        options={countryList}
        getOptionLabel={(option: any) => option.name}
        value={formData.country!}
        onChange={(val: CountryOption | null) => {
          setFormData((prevData) => ({
            ...prevData,
            country: val,
          }));
        }}
        sx={{ marginTop: 0 }}
      />
      <Alert sx={{ width: 400 }} severity="info">You will billed based on your country of residence.</Alert>
    </>
  );
}
