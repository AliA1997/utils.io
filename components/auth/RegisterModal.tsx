import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { CountryOption, countryList } from "@data/countries";
import AuthModal from '@common/Modals/AuthModal';
import { ModalTitle } from "@common/Titles";
import { useDispatch, useSelector } from "react-redux";
import { UtilsIoStore } from "@redux/reducers";
import { setOpenSignup } from "@redux/reducers/modalSlice";
import { CloseButton, PrimaryButton } from "@common/Buttons";
import { AutocompleteInput, EmailInput, PasswordInput, TextFieldInput } from "@common/Inputs";
import { DividerWithText } from "@common/Containers";
import SocialMediaAuthSection from "@common/Modals/SocialMediaAuthSection";
import useDisplayPassword from "@hooks/useDisplayPassword";
import { Logo } from '@common/Containers';
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface RegisterForm {
  avatar: string;
  username: string;
  dateOfBirth: string;
  country: CountryOption | null;
  web3Address: string;
}

interface RegisterModalProps {
  setOpen: (val: boolean) => void;
  setLoginOpen: (val: boolean) => void;
}

export default function RegisterModal(props: RegisterModalProps) {
  const { setLoginOpen, setOpen } = props;
  const router = useRouter();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { openSignup } = useSelector((state: UtilsIoStore) => state.modal);
  const supabase = createClientComponentClient<any>();

  const [formData, setFormData] = useState<RegisterForm>({
    avatar: "",
    username: "",
    dateOfBirth: "",
    country: null,
    web3Address: "",
  });

  return (
    <AuthModal
      setOpen={(val: boolean) => dispatch(setOpenSignup(val))}
      open={true}
      aria-labelledby="register-title"
      aria-describedby="register-description"
    >
      <Box
        sx={{
          height: "100%",
          padding: 2,
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 2,
        }}
      >
        <CloseButton
          iconStyleProps={{ color: "#7248EE", height: 50, width: 50, marginTop: isNotMobile ? 0 : 5 }}
          onClick={() => {
            router.push('/');
            setOpen(false);
          }}
          sx={{
            ":hover": { color: "white", backgroundColor: "#F6F6F6" },
          }}
        />
        <Logo height={150} width={175} />
        <ModalTitle>Create Account</ModalTitle>
        {/* Signup Link */}
        <Typography sx={{ fontFamily: 'Poppins' }} color='#000000'>
          {"Already have an account?"}
          <Button sx={{ fontFamily: 'Poppins' }} variant="text" onClick={() => {
            setLoginOpen(true);
            setOpen(false);
          }}>
           Login
          </Button>
        </Typography>
        {/* End of Signup Link */}
        {/* <PrimaryButton onClick={handleSignIn} endIcon={<LoginIcon />}>
          Sign in
        </PrimaryButton> */}
        <DividerWithText>Or</DividerWithText>
        <SocialMediaAuthSection isSignup />
      </Box>
    </AuthModal>
  );
}
