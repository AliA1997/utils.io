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
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Wizard from "@common/Wizard";
import {
  Logo,
  ReusablePageContainer,
  ReusablePageTitle,
} from "@common/Containers";
import { ModalTitle } from "@common/Titles";
import { TextAreaOutput } from "@common/Inputs";
import { Client, CommonGptRequest } from "@services/server-client";
import useServerClient from "@hooks/useServerClient";
import polling, { getGptResult } from "@utils/polling";
import { GptStatuses } from "@utils/prompt_mutations";
import useWork from "@hooks/useWork";

export interface ArticleSummarizerForm {
  articleToSummarize: string;
  summarizedArticle: string;
}
export enum ArticleSummarizerSteps {
  ArticleToSummarize = 0,
  ArticleSummarized = 1,
}

const ArticleSummarizer = () => {
  const steps = ["Article to Summarize", "Summarized Article"];
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const { serverClient } = useServerClient();
  const { workGuid, setWorkGuid, workResult, setWorkResult, updateWorkHookActiveStep } = useWork(activeStep, ArticleSummarizerSteps.ArticleSummarized);

  const defaultArticleSummarizerForm = () => ({
    articleToSummarize: "",
    summarizedArticle: "",
  });
  const [articleSummarizerForm, setArticleSummarizerFormData] =
    useState<ArticleSummarizerForm>({
      articleToSummarize: "",
      summarizedArticle: "",
    });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const summarizeArticle = async () => {
    try {
      //debugger;

      const workResponse = await serverClient.articleSummarizer(
        new CommonGptRequest({
          inputText: articleSummarizerForm.articleToSummarize,
        })
      );
      console.log("article summarizer response:", workResponse);
      setWorkGuid(workResponse.workGuid);
      // const { data } = await axios.post(
      //   "/api/openai/article-summarizer",
      //   { articleToSummarize: articleSummarizerForm.articleToSummarize },
      //   config
      // );
      // setArticleSummarizerFormData((prevState) => ({
      //   ...prevState,
      //   summarizedArticle: data.summary,
      // }));
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
    if (activeStep == ArticleSummarizerSteps.ArticleToSummarize)
      return (
        <TextAreaOutput
          label="Text to summarize"
          onChange={(e) => {
            setArticleSummarizerFormData((prevState) => ({
              ...prevState,
              articleToSummarize: e.target.value,
            }));
          }}
          value={articleSummarizerForm.articleToSummarize}
          hideCopyButton={true}
          required
          fullWidth
        />
      );
    if (activeStep == ArticleSummarizerSteps.ArticleSummarized)
      return (
        <TextAreaOutput
          value={workResult}
          loading={!workResult}
          fullWidth
        />
      );
    
  };

  return (
    <ReusablePageContainer
      title={
        <ReusablePageTitle
          title="Article Summarizer"
          subtitle="Summarize any article with a few clicks"
        />
      }
    >
      <Wizard
        onClose={() => setActiveStep(0)}
        onNext={async () => {
          const nextStep = activeStep + 1;
          setLoading(true);
          try {
            if (nextStep == ArticleSummarizerSteps.ArticleSummarized)
              await summarizeArticle();
            setActiveStep(nextStep);
            updateWorkHookActiveStep(nextStep);
          } finally {
            setLoading(false);
          }
        }}
        onReset={() => {
          updateWorkHookActiveStep(0);
          setActiveStep(0);
          setArticleSummarizerFormData(defaultArticleSummarizerForm());
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

export default ArticleSummarizer;
