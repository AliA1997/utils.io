import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import Autocomplete, {
  AutocompleteInputChangeReason,
  AutocompleteProps,
} from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select, { SelectProps } from "@mui/material/Select";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { SxProps } from "@mui/material/styles";
import { CircularProgress, useMediaQuery } from "@mui/material";
import { CopyButton } from "@common/Buttons";
import Image from 'next/image';

export const TextFieldInput = (props: TextFieldProps) => {
  return (
    <TextField
      sx={{ width: 400, fontFamily: "Poppins", ...props.sx }}
      {...props}
      color="secondary"
    />
  );
};

interface AutocompleteInputProps<T> {
  value: T | null;
  labelKey: string;
  options: T[];
  getOptionLabel: (option: T) => string;
  onChange: (val: T | null) => void;
  textFieldProps: TextFieldProps;
  sx?: SxProps;
  optionsSx?: SxProps;
}

export function AutocompleteInput<T>(
  props: React.PropsWithChildren<AutocompleteInputProps<T>>
) {
  const [inputValue, setInputValue] = useState("");
  const { options, getOptionLabel, onChange, labelKey, textFieldProps, optionsSx } = props;
  const handleChange = (event: React.SyntheticEvent, value: T | null) => {
    onChange(value);
  };

  useEffect(() => {
    if (!inputValue) onChange(null);
  }, [inputValue]);
  return (
    <Autocomplete
      options={options}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField sx={{ width: 400 }} {...params} {...textFieldProps} />
      )}
      sx={{ color: "black", marginTop: 2, fontFamily: "Poppins", ...props.sx }}
      onChange={handleChange}
      value={props.value}
      inputValue={inputValue}
      clearOnEscape={true}
      clearOnBlur={true}
      onInputChange={(
        _: any,
        newInputValue: string,
        reason: AutocompleteInputChangeReason
      ) => {
        if (reason === "clear") onChange(null);
        else setInputValue(newInputValue);
      }}
      PaperComponent={({ children }) => (
        <Paper
          style={{ marginTop: "8px", position: "absolute", bottom: -40, left: 0 }}
        >
          {children}
        </Paper>
      )}
      renderOption={(props, option) => {
        return (
          <MenuItem {...props} sx={{ width: 400, ...optionsSx }}>{(option as any)[labelKey]}</MenuItem>
        )
      }}
    />
  );
}

interface PasswordInputProps {
  onChange?: (val: string) => void;
  sx?: any;
}
export const PasswordInput = (props: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = (event: any) => {
    setPassword(event.target.value);
    if (props.onChange) props.onChange(event.target.value);
  };

  return (
    <TextField
      sx={{ width: 400, fontFamily: "Poppins", ...props.sx }}
      label="Password"
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={handleChangePassword}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

interface EmailInputProps {
  onChange: (val: string, isValid: boolean) => void;
  value: string;
  sx?: any;
}
export const EmailInput = (props: EmailInputProps) => {
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (!props.value) setEmailError("");
  }, [props.value]);

  const handleChangeEmail = (event: any) => {
    const inputEmail = event.target.value;
    // Email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(inputEmail);
    setEmailError(isValidEmail ? "" : "Invalid email");

    if (props.onChange) props.onChange(inputEmail, isValidEmail);
  };

  return (
    <TextField
      label="Email"
      type="email"
      value={props.value}
      onChange={handleChangeEmail}
      error={!!emailError}
      helperText={emailError}
      sx={{ marginBottom: 2, width: 400, fontFamily: "Poppins", ...props.sx }}
    />
  );
};

interface DateOfBirthInputProps {
  label: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  sx?: SxProps;
}

export const DateOfBirthInput = (props: DateOfBirthInputProps) => {
  const { label, value, onChange, sx } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker label={label} value={value} onChange={onChange} sx={sx} />
    </LocalizationProvider>
  );
};

interface SelectInputProps<T> extends SelectProps {
  options: { label: string; value: T }[];
}

export function SelectInput<T>(props: SelectInputProps<T>) {
  const { options } = props;
  const [selectedOption, setSelectedOption] = useState<T | undefined>(
    undefined
  );

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
    // if(props)
  };

  return (
    <FormControl>
      <InputLabel>Select an option</InputLabel>
      <Select value={selectedOption} onChange={handleChange} {...props}>
        {options.map((option: { label: string; value: T }, idx: number) => (
          <MenuItem key={idx} value={option.value as string}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

type TextAreaOutputProps = Pick<TextFieldProps, "rows" | "value" | "sx" | "label" | "onChange" | "required" | "fullWidth"> & { 
  hideCopyButton?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export const TextAreaOutput = ({  hideCopyButton, ...restOfProps }: TextAreaOutputProps) => {
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // console.log('restOfProps:', restOfProps)
  return (
    <Stack sx={{ 
      width: isNotMobile ? 800 : 400,
      justifyContent: 'center',
      slignItems: 'center',
      flexDirection: 'column'
    }} position="relative">
      {restOfProps.loading ? (
    <Box sx={{ 
      width: isNotMobile ? 800 : 400,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      display: 'flex',
      textAlign: 'center',

    }} position="relative">
      <>
        <Typography
          color="#000000"
          sx={{
            fontFamily: "Poppins",
            fontWeight: 700,
            marginBottom: 3,
            pt: 5,
          }}
        >Building something for you</Typography>
        <Image width={400} height={400} src="/prompt-loading.gif" alt="product card img" />
        </>
     </Box>

      )    : 
      <>
        {!hideCopyButton && <CopyButton textToCopy={restOfProps.value as string} />}
        <TextField
          multiline
          rows={isNotMobile ? 15 : 10}
          sx={{
            width: isNotMobile ? 800 : 400,
            fontFamily: "Poppins",
            ...restOfProps.sx,
          }}
          inputProps={{
            sx: {
              '&:disabled': {
                color: '#000000',
                opacity: 1,
                WebkitTextFillColor: '#000000 !important',
              }
            }
          }}
          fullWidth
          value={restOfProps.value}
          disabled={restOfProps.disabled ?? false}
          {...restOfProps}
        ></TextField>
      </>}
    </Stack>
  );
};
