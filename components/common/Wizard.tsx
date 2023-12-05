import { PrimaryButton, TransparentButton } from "./Buttons";
import { ModalTitle } from "./Titles";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepIcon, { StepIconProps } from "@mui/material/StepIcon";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";

import { CSSProperties, useState } from "react";
import { SxProps } from "@mui/material";
import { Logo } from "@common/Containers";

interface WizardProps {
  title?: string;
  subtitle?: string;
  steps: string[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  onBackOverride?: Function;
  onNext?: Function;
  onReset?: Function;
  onClose?: Function;
  onFinish?: Function;
  hideOnFinish?: boolean;
  canFinish?: boolean;
  finishText?: string;
  hideStepper?: boolean;
  hideTitle?: boolean;
  boxProps?: SxProps;
}

export default function Wizard(props: React.PropsWithChildren<WizardProps>) {
  const {
    title,
    children,
    loading,
    setLoading,
    activeStep,
    setActiveStep,
    steps,
    onBackOverride,
    onNext,
    onReset,
    onClose,
    onFinish,
    finishText,
    canFinish,
    hideOnFinish,
    hideStepper,
    hideTitle,
    subtitle,
  } = props;

  const handleNext = async () => {
    if (onNext) return onNext();
    // setActiveStep((prevStep) => prevStep + 1);
  };

  const handleFinish = async () => {
    if (onFinish) return onFinish();
  };

  const handleBack = () => {
    if (onBackOverride) onBackOverride();
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    if (onReset) onReset();
  };
  const handleClose = () => {
    if (onClose) onClose();
  };

  console.log(
    "activeStep === steps.length - 1",
    activeStep === steps.length - 1
  );
  return (
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
        ...props.boxProps,
      }}
      paddingY={5}
    >
      {!hideTitle && (
        <ModalTitle>
          {title && title}
          {subtitle && (
            <Typography textAlign="center" color="textSecondary">
              {subtitle}
            </Typography>
          )}
        </ModalTitle>
      )}
      {!hideStepper && (
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
      {activeStep === steps.length ? (
        <div>
          <Typography variant="body1">
            {`All steps completed - you're finished!`}
          </Typography>
          <DialogActions>
            <PrimaryButton onClick={handleReset} color="primary">
              Reset
            </PrimaryButton>
            <PrimaryButton onClick={handleClose} color="primary">
              Close
            </PrimaryButton>
          </DialogActions>
        </div>
      ) : (
        <Box
          flexDirection={"column"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ marginY: 2 }}
        >
          {children}
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: 400,
              padding: 0,
            }}
          >
            <TransparentButton
              sx={{
                width: 'full',
                "& .Mui-disabled": {
                  backgroundColor: "red",
                },
              }}
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </TransparentButton>
            {activeStep === steps.length - 1 ?  !hideOnFinish ? (
              <TransparentButton
                sx={{ width: 'full', }}
                onClick={handleFinish}
                loading={loading}
                disabled={canFinish ? false : true}
                endIcon={<CheckIcon />}
              >
                {finishText ? finishText : `Finish And Pay`}
              </TransparentButton>
            ) : null : (
              <TransparentButton
                sx={{ width: 'full', }}
                onClick={handleNext}
                loading={loading}
                endIcon={<ArrowForwardIcon />}
              >
                Next
              </TransparentButton>
            )}
          </DialogActions>
        </Box>
      )}
    </Box>
  );
}

const CustomStepIcon = (props: StepIconProps) => {
  const { active, completed } = props;

  if (completed)
    return (
      <StepIcon
        {...props}
        style={{
          color: completed ? "green" : undefined,
        }}
      />
    );
  else
    return (
      <StepIcon
        {...props}
        style={{
          color: active ? "#7248EE" : undefined,
        }}
      />
    );
};
