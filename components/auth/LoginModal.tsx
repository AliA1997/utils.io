import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Modal,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import LoginIcon from "@mui/icons-material/Login";
import GoogleIcon from "@mui/icons-material/Google";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseButton, PrimaryButton } from "@common/Buttons";
import { EmailInput, PasswordInput } from "@common/Inputs";
import { useTheme } from "@emotion/react";
import { ModalTitle } from "@common/Titles";
import AuthModal from "@common/Modals/AuthModal";
import Link from "next/link";
import { DividerWithText } from "@common/Containers";
import Image from "next/image";
import SocialMediaAuthSection from "@common/Modals/SocialMediaAuthSection";
import useDisplayPassword from "@hooks/useDisplayPassword";
import { Logo } from "@common/Containers";

interface LoginModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  setSignupOpen: (val: boolean) => void;
}

export default function LoginModal(props: LoginModalProps) {
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { displayPassword, setDisplayPassword } =  useDisplayPassword(email);
  const router = useRouter();
  const { open, setOpen, setSignupOpen } = props;
  const supabase = createClientComponentClient<any>();

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  const emailInputChange = (val: string, isValid: boolean) => {
    setEmail(val);
    if (isValid) setDisplayPassword(true);
    else setDisplayPassword(false);
  };

  return (
    <AuthModal
      open={open}
      setOpen={setOpen}
      aria-labelledby="login-title"
      aria-describedby="login-description"
    >
      <Box
        sx={{
          height: "100%",
          width: "100vw",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 2,
          padding: isNotMobile ? 0 : 15,
        }}
      >
        <Logo height={150} width={175} />
        <ModalTitle>Welcome Back</ModalTitle>
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
        {/* Signup Link */}
        <Typography sx={{ fontFamily: 'Poppins' }} color='#000000'>
          {"Don't have an account?"}
          <Button sx={{ fontFamily: 'Poppins' }} variant="text" onClick={() => {
            setSignupOpen(true);
            setOpen(false);
          }}>
            Sign up
          </Button>
        </Typography>
        {/* End of Signup Link */}
        {/* <PrimaryButton onClick={handleSignIn} endIcon={<LoginIcon />}>
          Sign in
        </PrimaryButton> */}
        <DividerWithText>Or</DividerWithText>
        <SocialMediaAuthSection />
      </Box>
    </AuthModal>
  );
}
