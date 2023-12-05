import { useMediaQuery } from "@mui/material";
import Typography, { TypographyProps } from "@mui/material/Typography";

export const ModalTitle = (props: React.PropsWithChildren<TypographyProps>) => {
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  return (
    <Typography
      color="#000000"
      variant="h4"
      sx={{
        fontFamily: "Poppins",
        fontWeight: 700,
        marginBottom: 3,
        pt: isNotMobile ? 0 : 5,
        ...props.sx,
      }}
    >
      {props.children}
    </Typography>
  );
};

export const UtilsIOSubtitle = (props: React.PropsWithChildren<any>) => {
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  return (
    <Typography
      color="#000000"
      variant="h6"
      sx={{
        fontFamily: "Poppins",
        fontWeight: 700,
        marginBottom: 3,
        pt: isNotMobile ? 0 : 5,
        ...props.sx,
      }}
    >
      {props.children}
    </Typography>
  );
}