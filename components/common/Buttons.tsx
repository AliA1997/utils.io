import Button, { ButtonProps } from "@mui/material/Button";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import { SxProps, Theme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { copyToClipboard } from "@utils/index";
import { theme } from "@chakra-ui/react";
import { CSSProperties, useState } from "react";

interface PrimaryButtonProps extends ButtonProps {
  onClick: () => void;
  sx?: SxProps<Theme>;
  loading?: boolean;
}

export const PrimaryButton = (
  props: React.PropsWithChildren<PrimaryButtonProps>
) => (
  <Button
    sx={{
      padding: 2,
      marginTop: 3,
      backgroundColor: "#7248EE",
      width: 400,
      borderRadius: 2,
      ":hover": { color: "#7248EE", backgroundColor: "white" },
      fontFamily: "Poppins",
      ...props.sx,
    }}
    variant="contained"
    fullWidth={true}
    onClick={props.onClick}
    endIcon={props.endIcon}
    startIcon={props.startIcon}
    id={props.id}
  >
    {props.children}
  </Button>
);

export const TransparentButton = (
  props: React.PropsWithChildren<PrimaryButtonProps>
) => (
  <Button
    sx={{
      padding: 2,
      marginTop: 3,
      color: "#7248EE",
      backgroundColor: "transparent",
      border: "solid 1px #7248EE",
      width: 400,
      borderRadius: 2,
      ":hover": { color: "white", backgroundColor: "#7248EE" },
      fontFamily: "Poppins",
      ...props.sx,
    }}
    variant="contained"
    fullWidth={true}
    onClick={props.onClick}
    endIcon={
      props.loading ? (
        <CircularProgress size={16} sx={{ color: "#7248EE" }} />
      ) : (
        props.endIcon
      )
    }
    startIcon={props.startIcon}
    disabled={props.disabled || props.loading}
  >
    {props.children}
  </Button>
);

interface SocialMediaButtonProps extends ButtonProps {}
export const SocialMediaButton = (
  props: React.PropsWithChildren<SocialMediaButtonProps>
) => (
  <Button
    sx={{
      marginTop: 3,
      padding: 2,
      color: "#000000",
      backgroundColor: "transparent",
      border: "solid 1px #000000",
      width: 400,
      borderRadius: 2,
      fontFamily: "Poppins",
      ":hover": {
        color: "#000000",
        backgroundColor: "transparent",
      },
    }}
    variant="contained"
    fullWidth={true}
    onClick={props.onClick}
    endIcon={props.endIcon}
  >
    {props.children}
  </Button>
);

interface CloseButtonProps extends IconButtonProps {
  iconStyleProps: SxProps<Theme>;
}
export const CloseButton = (
  props: React.PropsWithChildren<CloseButtonProps>
) => {
  return (
    <IconButton
      {...props}
      sx={{ padding: 2, position: "absolute", top: 0, right: 0, ...props.sx }}
    >
      <CloseIcon sx={props.iconStyleProps ? props.iconStyleProps : {}} />
    </IconButton>
  );
};

interface CopyButtonProps {
  textToCopy: string;
  sx?: SxProps;
}

export const CopyButton = (props: CopyButtonProps) => {
  const [hasCopied, setHasCopied] = useState<boolean | undefined>(false);
  return (
    <Button
      endIcon={
        hasCopied ? <CheckIcon sx={{ color: "green" }} /> : <ContentCopyIcon />
      }
      onClick={async () => {
        setHasCopied(true);
        await copyToClipboard(props.textToCopy);
        setTimeout(() => setHasCopied(false), 5000);
      }}
      sx={{
        position: "absolute",
        top: 33,
        right: 1,
        zIndex: "100",
        padding: 0,
        ...props.sx
      }}
      variant="text"
    />
  );
};
