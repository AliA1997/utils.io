import { TransparentButton } from "@common/Buttons";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { ModalTitle } from "@common/Titles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSupabase } from "@contexts/supabaseContext";
import { SxProps, useMediaQuery } from "@mui/material";

export const DividerWithText = (props: React.PropsWithChildren<any>) => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "24px" }}>
      <Divider
        sx={{ width: 175 }}
        style={{ flexGrow: 1, backgroundColor: "#000000" }}
      />
      <Typography
        fontFamily="Poppins"
        textTransform={"uppercase"}
        variant="body2"
        color="textSecondary"
        style={{ margin: "0 16px" }}
      >
        {props.children}
      </Typography>
      <Divider
        sx={{ width: 175 }}
        style={{ flexGrow: 1, backgroundColor: "#000000" }}
      />
    </div>
  );
};

interface InputInfoOverPopoverProps {
  title: string;
  hasValue: boolean;
}
export default function InputInfoOverPopover(
  props: React.PropsWithChildren<InputInfoOverPopoverProps>
) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = props.hasValue ? Boolean(anchorEl) : false;

  return (
    <div>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {props.children}
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{props.title}</Typography>
      </Popover>
    </div>
  );
}

export const ProductSectionContainer = (
  props: React.PropsWithChildren<any>
) => {
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  return (
    <Stack direction={isNotMobile ? "row" : "column"} spacing={2} mt={2}>
      {props.children}
    </Stack>
  );
};

interface ReusablePageTitleProps {
  title: string;
  subtitle?: string;
}

export const ReusablePageTitle = (props: React.PropsWithChildren<any>) => {
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  return (
    <Stack pt={isNotMobile ? 0 : 10} alignItems="center">
      <Logo height={150} width={160} />
      <ModalTitle sx={{ textAlign: 'center' }}>
        {props.title}
      </ModalTitle>
      {props.subtitle && (
        <Typography textAlign="center" color="textSecondary">
          Summarize any article with a few clicks
        </Typography>
      )}
    </Stack>
  );
};

interface ReusablePageContainerProps {
  title: JSX.Element;
  sx?: SxProps;
}

export const ReusablePageContainer = (
  props: React.PropsWithChildren<ReusablePageContainerProps>
) => {
  const router = useRouter();
  const { signOut } = useSupabase();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        padding: 2,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 2,
        position: "absolute",
        top: 0,
        left: 0,
        ...props.sx,
      }}
      paddingY={5}
    >
      <TransparentButton
        sx={{
          width: 150,
          position: "absolute",
          left: 20,
          top: -20,
          "& .Mui-disabled": {
            backgroundColor: "red",
          },
        }}
        startIcon={<ArrowBackIcon />}
        onClick={() => {
          router.back();
        }}
      >
        Go Back
      </TransparentButton>
      {props.title}
      <TransparentButton
        sx={{
          width: 150,
          position: "absolute",
          right: 20,
          top: -20,
          "& .Mui-disabled": {
            backgroundColor: "red",
          },
        }}
        onClick={async () => {
          await signOut();
          router.push("/");
        }}
      >
        Sign Out
      </TransparentButton>
      {props.children}
    </Box>
  );
};

interface LogoProps {
  height?: number;
  width?: number;
}
export const Logo = (props: React.PropsWithChildren<LogoProps>) => {
  return (
    <Image src="/logo.png" alt="logo" width={100} height={80} {...props} />
  );
};
