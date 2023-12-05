import { useMediaQuery, useTheme } from "@mui/material";
import Modal, { ModalProps } from "@mui/material/Modal";

interface AuthModalProps extends ModalProps {
  setOpen: (val: boolean) => void;
}
export default function AuthModal(
  props: React.PropsWithChildren<AuthModalProps>
) {
  const theme = useTheme();
  const { setOpen, open } = props;
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  //open prop is already provided by material-ui
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: 24,
        backgroundColor: (theme as any).palette.background.paper,
      }}
      aria-labelledby={props['aria-labelledby']}
      aria-describedby={props['aria-labelledby']}
    >
    {props.children}
    </Modal>
  );
}
