import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import PhoneIcon from '@mui/icons-material/Phone';
import { CountryPhoneCode, countryPhoneCode } from '@data/countries';
import Avatar from '@mui/material/Avatar';
import InfoIcon from '@mui/icons-material/Info';
import MouseOverPopover from '../Containers';

interface PhoneNumberInputProps {
  value: string;
  countryCodeValue: string;
  onChange: (value: string) => void;
  onCountryCodeChange: (value: string) => void;
}

interface PhoneNumberInputAvatarProps {
    flagIcon: string;
    altText: string;
}
const PhoneNumberInputAvatar = (props: PhoneNumberInputAvatarProps) => (
    <Avatar src={props.flagIcon} alt={props.altText} sx={{ width: 40, height: 20, borderRadius: 0, marginX: 'auto' }} />
)

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({  countryCodeValue, value, onChange, onCountryCodeChange }) => {
  const [countryCode, setCountryCode] = useState<CountryPhoneCode | undefined>(undefined);

  const handleCountryCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const countryCodeValue = event.target.value;
    const countryCodeToSet = countryPhoneCode.find((cpc) => cpc.dialCode === countryCodeValue);
    onCountryCodeChange(countryCodeToSet?.dialCode!);
    setCountryCode(countryCodeToSet);
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = event.target.value;
    onChange(phoneNumber);
  };

  const defaultCountryCode = countryPhoneCode.find((cpc) => cpc.name === 'United States')

  useEffect(() => {
    if(!countryCodeValue){
        onCountryCodeChange(defaultCountryCode?.dialCode!);
    }
  }, []);

  return (
      <Box position='relative' display='flex' justifyContent='space-between' sx={{ width: 400 }}>
        <TextField
            select
            label="Country Code"
            value={countryCode}
            onChange={handleCountryCodeChange}
            variant="outlined"
            margin="normal"
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <PhoneIcon />
                    {!countryCode && (<PhoneNumberInputAvatar flagIcon={defaultCountryCode?.flagIcon!} altText={defaultCountryCode?.name!} />)}
                </InputAdornment>
            ),
            }}
        >
            {countryPhoneCode.map((cpc, index) => (
                <MenuItem key={index} value={cpc.dialCode}>
                    <PhoneNumberInputAvatar flagIcon={cpc.flagIcon} altText={cpc.name} />
                </MenuItem>
            ))}
            {/* <MenuItem value="+1">USA</MenuItem>
            <MenuItem value="+44">UK</MenuItem>
            <MenuItem value="+91">India</MenuItem> */}
            {/* Add more countries as needed */}
        </TextField>
        <TextField
            label="Phone Number"
            value={value}
            onChange={handlePhoneNumberChange}
            variant="outlined"
            margin="normal"
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                <span>{countryCode ? countryCode?.dialCode : defaultCountryCode?.dialCode}</span>
                </InputAdornment>
            ),
            }}
        />
    </Box>
  );
};

export default PhoneNumberInput;
