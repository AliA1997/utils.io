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
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Wizard from "@common/Wizard";
import { FromCodeStep } from "@components/basic-products/code-convert/TextFieldSteps";
import {
  SelectFromLanguageStep,
  SelectToLanguageStep,
} from "@components/basic-products/code-convert/AutocompleteSteps";
import { ReusablePageContainer, ReusablePageTitle } from "@common/Containers";
import { ModalTitle } from "@common/Titles";
import CodeOutput from "@common/Containers/CodeOutput";
import useServerClient from "@hooks/useServerClient";
import useWork from "@hooks/useWork";
import { ConvertCodeRequest } from "@services/server-client";

export interface CodeConvertForm {
  fromCode: string;
  fromLanguage: ProgrammingLanguageOption | null;
  toLanguage: ProgrammingLanguageOption | null;
  toCode: string;
}
export enum ProgrammingLanguage {
  JavaScript = "javascript",
  Python = "python",
  Java = "java",
  CSharp = "csharp",
  CPlusPlus = "cplusplus",
  Ruby = "ruby",
  Swift = "swift",
  Go = "go",
  TypeScript = "typescript",
  Kotlin = "kotlin",
  Rust = "rust",
  PHP = "php",
  Scala = "scala",
  Haskell = "haskell",
  Lua = "lua",
  R = "r",
  MATLAB = "matlab",
  Perl = "perl",
  Shell = "shell",
}

export const programmingLanguageColors = {
  javascript: ["#F7DF1E", "#000000"],
  python: ["#3776AB", "#FFD43B"],
  java: ["#007396", "#E00000"],
  csharp: ["#239120", "#9B4F96"],
  cplusplus: ["#00599C", "#EDD81C"],
  ruby: ["#CC342D", "#000000"],
  swift: ["#FA7343", "#000000"],
  go: ["#00ADD8", "#FFD700"],
  typescript: ["#007ACC", "#3178C6"],
  kotlin: ["#7F52FF", "#F18E33"],
  rust: ["#000000", "#DEA584"],
  php: ["#777BB4", "#4F5D95"],
  scala: ["#DC322F", "#7F481D"],
  haskell: ["#5E5086", "#AA976B"],
  lua: ["#000080", "#00FF00"],
  r: ["#276DC3", "#F79A19"],
  matlab: ["#0076A8", "#FFA500"],
  perl: ["#39457E", "#00FF00"],
  shell: ["#FFD500", "#000000"],
};

export enum CodeConvertSteps {
  WhatPLYouWantToConvert = 0,
  WhatCodeYouWantToConvert = 1,
  WhatPLYouWantToConvertTo = 2,
  ConvertedCode = 3,
}
export type ProgrammingLanguageOption = {
  label: string;
  value: ProgrammingLanguage;
};

export const programmingLanguageOptions: ProgrammingLanguageOption[] =
  Object.keys(ProgrammingLanguage).map((key) => ({
    label: key,
    value: ProgrammingLanguage[key as keyof typeof ProgrammingLanguage],
  }));

export interface CommonCodeConvertGeneratorProps {
  codeConvertFormData: CodeConvertForm;
  handleInputChange?: (e: any) => void;
  setCodeConvertFormData?: React.Dispatch<
    React.SetStateAction<CodeConvertForm>
  >;
}

const CodeConvert = () => {
  const steps = [
    "What programming language is your code in?",
    "What is the code you want to convert?",
    "Convert to what programming language?",
    "Converted code",
  ];
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const [error, setError] = useState("");
  const defaultCodeConvertForm = () => ({
    fromCode: "",
    fromLanguage: null,
    toLanguage: null,
    toCode: "",
  });
  const [codeConvertFormData, setCodeConvertFormData] =
    useState<CodeConvertForm>({
      fromCode: "",
      fromLanguage: null,
      toLanguage: null,
      toCode: "",
    });

  const { serverClient } = useServerClient();
  const { workGuid, setWorkGuid, workResult, setWorkResult, updateWorkHookActiveStep } = useWork(activeStep, CodeConvertSteps.ConvertedCode);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const convertCode = async () => {
    setLoading(true);
    try {
      const workResponse = await serverClient.convertCode(
        new ConvertCodeRequest({
          toProgrammingLanguage: codeConvertFormData.toLanguage!.label,
          fromProgrammingLanguage: codeConvertFormData.fromLanguage!.label,
          codeToConvert: codeConvertFormData.fromCode
        })
      );
      console.log("code convert response:", workResponse);

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
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setCodeConvertFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const displayCurrentStep = () => {
    if (activeStep == CodeConvertSteps.WhatPLYouWantToConvert)
      return (
        <SelectFromLanguageStep
          setCodeConvertFormData={setCodeConvertFormData}
          codeConvertFormData={codeConvertFormData}
          handleInputChange={handleInputChange}
        />
      );
    if (activeStep == CodeConvertSteps.WhatCodeYouWantToConvert)
      return (
        <FromCodeStep
          setCodeConvertFormData={setCodeConvertFormData}
          codeConvertFormData={codeConvertFormData}
          handleInputChange={handleInputChange}
        />
      );
    if (activeStep == CodeConvertSteps.WhatPLYouWantToConvertTo)
      return (
        <SelectToLanguageStep
          setCodeConvertFormData={setCodeConvertFormData}
          codeConvertFormData={codeConvertFormData}
          handleInputChange={handleInputChange}
        />
      );
    if (activeStep == CodeConvertSteps.ConvertedCode)
      return (
        <CodeOutput
          fromLanguage={codeConvertFormData.fromLanguage!.value}
          code={codeConvertFormData.fromCode}
          codeTitle="Original Code"
          convertedCode={workResult}
          toLanguage={codeConvertFormData.toLanguage!.value}
          convertedCodeTitle="Converted Code"
        />
      );
  };
  return (
    <ReusablePageContainer
      title={<ReusablePageTitle title="Code Convert" subtitle="Convert code from one programming language to another" />}
    >
      <Wizard
        onClose={() => setActiveStep(0)}
        onNext={async () => {
          const nextStep = activeStep + 1;
          setLoading(true);
          try {
            if (nextStep == CodeConvertSteps.ConvertedCode) await convertCode();
            setActiveStep(nextStep);
            updateWorkHookActiveStep(nextStep);
          } finally {
            setLoading(false);
          }
        }}
        onReset={() => {
          setActiveStep(0);
          updateWorkHookActiveStep(0);
          setCodeConvertFormData(defaultCodeConvertForm());
        }}
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        loading={loading}
        setLoading={setLoading}
        hideStepper={true}
        hideTitle={true}
        hideOnFinish={true}
        boxProps={{
          width: "100vw",
          // marginX: 'auto',
        }}
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

export default CodeConvert;
