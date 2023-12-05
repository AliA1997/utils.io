import {
  Box,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  TextField,
  Collapse,
  Alert,
  Card,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Wizard from "@common/Wizard";
import {
  Logo,
  ReusablePageContainer,
  ReusablePageTitle,
} from "@common/Containers";
import { ModalTitle, UtilsIOSubtitle } from "@common/Titles";
import { TextAreaOutput } from "@common/Inputs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PromptRecommendations from "@components/chatbot-products/best-prompt-generator/PromptRecommendatiosn";
import { Text } from "@chakra-ui/react";

export type PromptRecommendation = {
  name: string;
  description: string;
  css_color_code: string;
};

export type BestPromptGeneratorForm = {
  originalPrompt: string;
  promptRecommendations: PromptRecommendation[];
  updatedPrompt: string;
};
export enum BestPromptGeneratorSteps {
  PromptToImprove = 0,
  PromptRecommendationsGenerated = 1,
}

const BestPromptGenerator = () => {
  const steps = ["Article to Summarize", "Summarized Article"];
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const [error, setError] = useState("");

  const defaultBestPromptGeneratorForm = (): BestPromptGeneratorForm => ({
    originalPrompt: "",
    promptRecommendations: [],
    updatedPrompt: "",
  });
  const [bestPromptGeneratorFormData, setBestPromptGeneratorFormData] =
    useState<BestPromptGeneratorForm>(defaultBestPromptGeneratorForm());

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const generateBestPrompt = async () => {
    try {
      const { data } = await axios.post(
        "/api/openai/best-prompt-generator",
        { originalPrompt: bestPromptGeneratorFormData.originalPrompt },
        config
      );
      setBestPromptGeneratorFormData((prevState) => ({
        ...prevState,
        promptRecommendations: data.promptRecommendations,
        updatedPrompt: data.updatedPrompt,
      }));
    } catch (error: any) {
      if (error.response.data.error) {
        setError(error.response.data.error);
      } else if (error.message) {
        setError(error.message);
      }
      setTimeout(() => setError(""), 5000);
    }
  };

  const displayCurrentStep = () => {
    if (activeStep == BestPromptGeneratorSteps.PromptToImprove)
      return (
        <TextAreaOutput
          label="Prompt to Improve"
          onChange={(e) => {
            setBestPromptGeneratorFormData((prevState) => ({
              ...prevState,
              originalPrompt: e.target.value,
            }));
          }}
          value={bestPromptGeneratorFormData.originalPrompt}
          hideCopyButton={true}
          required
          fullWidth
        />
      );
    if (activeStep == BestPromptGeneratorSteps.PromptRecommendationsGenerated)
      return (
        <>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <UtilsIOSubtitle sx={{ marginBottom: 0 }}>
                Prompt Recommendations
              </UtilsIOSubtitle>
            </AccordionSummary>
            <AccordionDetails>
              <PromptRecommendations
                promptRecommendations={
                  bestPromptGeneratorFormData.promptRecommendations
                }
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <UtilsIOSubtitle sx={{ marginBottom: 0 }}>
                Improved Prompt
              </UtilsIOSubtitle>
            </AccordionSummary>
            <AccordionDetails>
              <TextAreaOutput
                value={bestPromptGeneratorFormData.updatedPrompt}
                disabled={true}
              />
            </AccordionDetails>
          </Accordion>
        </>
      );
  };

  return (
    <ReusablePageContainer
      title={
        <ReusablePageTitle
          title="Improve prompts you pass into chatgpt"
          subtitle="Generate better prompts for chatgpt by using our prompt generator."
        />
      }
    >
      <Wizard
        onClose={() => setActiveStep(0)}
        onNext={async () => {
          const nextStep = activeStep + 1;
          setLoading(true);
          try {
            if (
              nextStep ==
              BestPromptGeneratorSteps.PromptRecommendationsGenerated
            )
              await generateBestPrompt();
            setActiveStep(nextStep);
          } finally {
            setLoading(false);
          }
        }}
        onReset={() => {
          setActiveStep(0);
          setBestPromptGeneratorFormData(defaultBestPromptGeneratorForm());
        }}
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        loading={loading}
        setLoading={setLoading}
        hideStepper={true}
        boxProps={{
          width: "100vw",
          zIndex: 9999,
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

export default BestPromptGenerator;
