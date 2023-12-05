import {
  useMediaQuery,
  TextField,
  Collapse,
  Alert,
  Stack,
} from "@mui/material";
import { useState } from "react";
import Wizard from "@common/Wizard";
import { ReusablePageContainer, ReusablePageTitle } from "@common/Containers";
import { TextAreaOutput } from "@common/Inputs";
import useWork from "@hooks/useWork";
import { CommonGptRequest } from "@services/server-client";
import useServerClient from "@hooks/useServerClient";

export interface ParagraphGeneratorForm {
  topicToGenerateFor: string;
  generatedParagraph: string;
}
export enum ParagraphGeneratorSteps {
  TopicToGenerateParagraph = 0,
  GeneratedParagraph = 1,
}

const Paragraph = () => {
  const steps = ["Topic to Generate Paragraph", "Generated Paragraph"];
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const defaultParagraphGeneratorForm = () => ({
    topicToGenerateFor: "",
    generatedParagraph: "\n\n\n\n\n",
  });
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [paragraphGeneratorFormData, setParagraphGeneratorFormData] =
    useState<ParagraphGeneratorForm>({
      topicToGenerateFor: "",
      generatedParagraph: "",
    });

  const [error, setError] = useState("");
  const { serverClient } = useServerClient();
  const {
    workGuid,
    setWorkGuid,
    workResult,
    setWorkResult,
    updateWorkHookActiveStep,
  } = useWork(activeStep, ParagraphGeneratorSteps.GeneratedParagraph);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const generateParagraph = async () => {
    try {
      const workResponse = await serverClient.paragraphGenerator(
        new CommonGptRequest({
          inputText: paragraphGeneratorFormData.topicToGenerateFor,
        })
      );
      console.log("paragraph generator response:", workResponse);
      setWorkGuid(workResponse.workGuid);
    } catch (error: any) {
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
      } else if (error.message) {
        setError(error.message);
      }
      setTimeout(() => setError(""), 5000);
    }
  };

  const displayCurrentStep = () => {
    if (activeStep == ParagraphGeneratorSteps.TopicToGenerateParagraph)
      return (
        <Stack>
          <TextField
            label="Topic to Generate Paragraph For"
            onChange={(e) => {
              setParagraphGeneratorFormData((prevState) => ({
                ...prevState,
                topicToGenerateFor: e.target.value,
              }));
            }}
            required
            fullWidth
            value={paragraphGeneratorFormData.topicToGenerateFor}
          ></TextField>
          <Alert severity="info" sx={{ width: "100%" }}>
            Will generate a paragraph based on the topic you type
          </Alert>
        </Stack>
      );
    if (activeStep == ParagraphGeneratorSteps.GeneratedParagraph)
        return (
          <TextAreaOutput
            value={workResult}
            loading={!workResult}
            sx={{ top: 20 }}
          />
        );
  };

  return (
    <ReusablePageContainer
      title={
        <ReusablePageTitle
          title="Paragraph Generator"
          subtitle="Generate a paragraph based on a topic you type"
        />
      }
    >
      <Wizard
        onClose={() => setActiveStep(0)}
        onNext={async () => {
          const nextStep = activeStep + 1;
          setLoading(true);
          try {
            if (nextStep == ParagraphGeneratorSteps.GeneratedParagraph)
              await generateParagraph();
            setActiveStep(nextStep);
            updateWorkHookActiveStep(nextStep);
          } finally {
            setLoading(false);
          }
        }}
        onReset={() => {
          setActiveStep(0);
          updateWorkHookActiveStep(0);
          setParagraphGeneratorFormData(defaultParagraphGeneratorForm());
        }}
        hideOnFinish={true}
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        loading={loading}
        setLoading={setLoading}
        hideStepper={true}
        boxProps={{
          width: "100vw",
          zIndex: 9999
          // marginX: 'auto',
        }}
        hideTitle={true}
      >
        <>
          <Collapse in={!!error}>
            <Alert severity="error" sx={{ m: 2 }}>
              {error}
            </Alert>
          </Collapse>
          {displayCurrentStep()}
        </>
      </Wizard>
    </ReusablePageContainer>
  );
};

export default Paragraph;
