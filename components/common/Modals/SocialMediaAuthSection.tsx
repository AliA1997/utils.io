import { Provider } from "@supabase/supabase-js";
import useSupabase from "@hooks/useSupabase";
import { SocialMediaButton } from "../Buttons";
import Image from "next/image";
import {  } from "@supabase/auth-helpers-nextjs"

export interface SocialMediaAuthSectionProps {
  isSignup?: boolean;
}

// export enum SocialMediaProvider

export default function SocialMediaAuthSection(
  props: SocialMediaAuthSectionProps
) {
  
  const supabase = useSupabase();
  const authText = props.isSignup ? "Sign up" : "Log in";


  const handleOAuthLogin = async (provider: Provider) => {
    const response = await supabase?.auth.signInWithOAuth({
      provider,
    });

    if (response?.error) {
      console.error("Error signing in with Google:", response.error.message);
    } else {
      // Handle successful login logic here
    }
  };

  return (
    <>
      <SocialMediaButton
        onClick={() => handleOAuthLogin("google")}
        endIcon={
          <Image
            width={25}
            height={25}
            src="/social-media/google.svg"
            alt="Google Icon"
          />
        }
      >
        Continue with Google
      </SocialMediaButton>
      <SocialMediaButton
        onClick={() => handleOAuthLogin("discord")}
        endIcon={
          <Image
            width={25}
            height={25}
            src="/social-media/discord.svg"
            alt="Discord Icon"
          />
        }
      >
        Continue with Discord
      </SocialMediaButton>
      {/* <SocialMediaButton onClick={() => handleOAuthLogin('')} endIcon={<Image width={25} height={25} src="/social-media/telegram.svg" alt="Telegram Icon" />}>
          Sign in with Telegram
        </SocialMediaButton>
        <SocialMediaButton onClick={handleGoogleLogin} endIcon={<Image width={25} height={25} src="/social-media/whatsapp.svg" alt="Whatsapp Icon" />}>
          Sign in with Whatsapp
        </SocialMediaButton> */}
    </>
  );
}
