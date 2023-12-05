import { Box, useMediaQuery, Collapse, Alert, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Wizard from "@common/Wizard";
import { ReusablePageContainer, ReusablePageTitle } from "@common/Containers";
import { ModalTitle } from "@common/Titles";
import { NameOfComponentStep } from "@components/web3-products/ui-component-generator/TextFieldSteps";
import {
  SelectHowIsComponentStyledStep,
  SelectPurposeOfComponentStep,
  SelectUILibraryUsedStep,
  SelectWeb3WalletFeatureUsedStep,
  SelectWebFrameworkUsedStep,
} from "@components/web3-products/ui-component-generator/AutocompleteSteps";
import { UIComponentGeneratedStep } from "@components/web3-products/ui-component-generator/CodeOutputStep";
import useServerClient from "@hooks/useServerClient";
import useWork from "@hooks/useWork";
import { UIComponentGeneratorRequest } from "@services/server-client";

export enum WebFrameworks {
  ReactInJavascript = "react-in-javascript",
  ReactInTypescript = "react-in-typescript",
  Svelte = "svelte",
  VueJs = "vue-js",
}
export enum PurposeOfComponent {
  CallAnApi = 0,
  DoesNotCallAnApi = 1,
}
export enum HowIsComponentStyled {
  SeparateCSSFile = 0,
  FunctionalComponents = 1,
  InlineStyling = 2,
}

export enum UILibraryUsed {
  NoneSpecified = 0,
  MaterialUI = 1,
  ChakraUI = 2,
  AntDesign = 3,
}

export enum Web3WalletFeatureUsed {
  NoneSpecified = 0,
  Wagmi = 1,
  RainbowKit = 2,
}

enum UIComponentGeneratorSteps {
  NameOfComponent = 0,
  WebFrameworkUsed = 1,
  UILibraryUsed = 2,
  PurposeOfComponent = 3,
  HowIsComponentStyled = 4,
  Web3WalletFeatureUsed = 5,
  UIComponentGenerated = 6,
}
export interface WebFrameworkOption {
  label: string;
  value: WebFrameworks;
}
export interface PurposeOfComponentOption {
  label: string;
  value: PurposeOfComponent;
}
export interface HowIsComponentStyledOption {
  label: string;
  value: HowIsComponentStyled;
}
export interface UILibraryUsedOption {
  label: string;
  value: UILibraryUsed;
}
export interface Web3WalletFeatureUsedOption {
  label: string;
  value: Web3WalletFeatureUsed;
}

export const webFrameworkOptions: WebFrameworkOption[] = [
  { label: "React.js", value: WebFrameworks.ReactInJavascript },
  { label: "React in Typescript", value: WebFrameworks.ReactInTypescript },
  { label: "Svelte", value: WebFrameworks.Svelte },
  { label: "Vue.js", value: WebFrameworks.VueJs },
];
export const purposeOfComponentOptions: PurposeOfComponentOption[] = [
  { label: "Does Not Call An Api", value: PurposeOfComponent.DoesNotCallAnApi },
  { label: "Call An Api", value: PurposeOfComponent.CallAnApi },
];
export const howIsComponentStyledOptions: HowIsComponentStyledOption[] = [
  { label: "Separate CSS File", value: HowIsComponentStyled.SeparateCSSFile },
  { label: "Inline Styling", value: HowIsComponentStyled.InlineStyling },
  {
    label: "Functional Components",
    value: HowIsComponentStyled.FunctionalComponents,
  },
];

export const uiLibraryUsedOptions: UILibraryUsedOption[] = [
  {
    label: "None Specified",
    value: UILibraryUsed.NoneSpecified,
  },
  { label: "Material-UI", value: UILibraryUsed.MaterialUI },
  { label: "Chakra-UI", value: UILibraryUsed.ChakraUI },
  { label: "Ant Design", value: UILibraryUsed.AntDesign },
];
export const web3WalletFeatureUsedOptions: Web3WalletFeatureUsedOption[] = [
  { label: "None Specified", value: Web3WalletFeatureUsed.NoneSpecified },
  { label: "Wagmi", value: Web3WalletFeatureUsed.Wagmi },
  { label: "Rainbow Kit", value: Web3WalletFeatureUsed.RainbowKit },
];

export interface UIComponentGeneratorForm {
  nameOfComponent: string;
  webFrameworkUsed: WebFrameworkOption | null;
  uiLibraryUsed: UILibraryUsedOption | null;
  purposeOfComponent: PurposeOfComponentOption | null;
  howIsComponentStyled: HowIsComponentStyledOption | null;
  web3WalletFeatureUsed: Web3WalletFeatureUsedOption | null;
  uiComponentGenerated: string;
  uiComponentStyles: string;
}

export interface CommonUIComponentGeneratorProps {
  uiComponentFormData: UIComponentGeneratorForm;
  handleInputChange?: (e: any) => void;
  setUiComponentFormData?: React.Dispatch<
    React.SetStateAction<UIComponentGeneratorForm>
  >;
}

const UIComponentGenerator = () => {
  const steps = [
    "Name of Component",
    "Web Framework Used",
    "UI Library Used",
    "Purpose of Component",
    "How is Component Styled",
    "Web3 Wallet Feature Used",
    "UI Component Generated",
  ];
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const defaultUiComponentFormForm = () => ({
    nameOfComponent: "",
    webFrameworkUsed: null,
    uiLibraryUsed: null,
    purposeOfComponent: null,
    howIsComponentStyled: null,
    web3WalletFeatureUsed: null,
    uiComponentGenerated: "",
    uiComponentStyles: "",
  });
  const [uiComponentFormData, setUiComponentFormData] =
    useState<UIComponentGeneratorForm>({
      nameOfComponent: "",
      webFrameworkUsed: null,
      uiLibraryUsed: null,
      purposeOfComponent: null,
      howIsComponentStyled: null,
      web3WalletFeatureUsed: null,
      uiComponentGenerated: "//Your generated ui component",
      uiComponentStyles: "",
    });
  const [componentLanguage, setComponentLanguage] = useState("");
  const [componentStyledLanguage, setComponentStyledLanguage] = useState("");
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState("");
  const { serverClient } = useServerClient();
  const { workGuid, setWorkGuid, workResult, setWorkResult, updateWorkHookActiveStep } = useWork(activeStep, UIComponentGeneratorSteps.UIComponentGenerated);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const smartContractGeneratorHandler = async () => {
    try {
      const workResponse = await serverClient.uiComponentGenerator(
        new UIComponentGeneratorRequest({
          nameOfComponent: uiComponentFormData.nameOfComponent,
          webFrameworkUsed: uiComponentFormData.webFrameworkUsed?.label,
          uiLibraryUsed: uiComponentFormData.uiLibraryUsed?.label.toString(),
          purposeOfComponent: uiComponentFormData.purposeOfComponent?.label.toString(),
          howIsComponentIsStyled: uiComponentFormData.howIsComponentStyled?.label.toString(),
          web3WalletFeatureUsed: uiComponentFormData.web3WalletFeatureUsed?.label.toString()
        })
      );
      console.log('ui component generator work response:', workResponse);
      setWorkGuid(workResponse?.workGuid);
      // setCode(data.code.substring(2));
    } catch (error: any) {
      if (error.response.data.error) {
        setError(error.response.data.error);
      } else if (error.message) {
        setError(error.message);
      }
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUiComponentFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const displayCurrentStep = () => {
    if (activeStep == UIComponentGeneratorSteps.NameOfComponent)
      return (
        <NameOfComponentStep
          handleInputChange={handleInputChange}
          setUiComponentFormData={setUiComponentFormData}
          uiComponentFormData={uiComponentFormData}
        />
      );
    if (activeStep == UIComponentGeneratorSteps.WebFrameworkUsed)
      return (
        <SelectWebFrameworkUsedStep
          setUiComponentFormData={setUiComponentFormData}
          uiComponentFormData={uiComponentFormData}
        />
      );
    if (activeStep == UIComponentGeneratorSteps.UILibraryUsed)
      return (
        <SelectUILibraryUsedStep
          setUiComponentFormData={setUiComponentFormData}
          uiComponentFormData={uiComponentFormData}
        />
      );
    if (activeStep == UIComponentGeneratorSteps.PurposeOfComponent)
      return (
        <SelectPurposeOfComponentStep
          setUiComponentFormData={setUiComponentFormData}
          uiComponentFormData={uiComponentFormData}
        />
      );
    if (activeStep == UIComponentGeneratorSteps.HowIsComponentStyled)
      return (
        <SelectHowIsComponentStyledStep
          setUiComponentFormData={setUiComponentFormData}
          uiComponentFormData={uiComponentFormData}
        />
      );
    if (activeStep == UIComponentGeneratorSteps.Web3WalletFeatureUsed)
      return (
        <SelectWeb3WalletFeatureUsedStep
          setUiComponentFormData={setUiComponentFormData}
          uiComponentFormData={uiComponentFormData}
        />
      );

    if (activeStep == UIComponentGeneratorSteps.UIComponentGenerated)

      return (
        <UIComponentGeneratedStep
          workResult={workResult}
          uiComponentFormData={uiComponentFormData}
          setUiComponentFormData={setUiComponentFormData}
          language={componentLanguage}
          styleLanguage={componentStyledLanguage}
        />
      );
  };

  return (
    <ReusablePageContainer
      title={
        <ReusablePageTitle
          title="UI Component Generator"
          subtitle="Generate ui components based on a few questions"
        />
      }
    >
      <Wizard
        onClose={() => setActiveStep(0)}
        onNext={async () => {
          setLoading(true);
          const nextStep = activeStep + 1;
          try {
            if (nextStep == UIComponentGeneratorSteps.UIComponentGenerated)
              await smartContractGeneratorHandler();
            setActiveStep(nextStep);
            updateWorkHookActiveStep(nextStep);
          } finally {
            setLoading(false);
          }
        }}
        onReset={() => {
          setActiveStep(0);
          updateWorkHookActiveStep(0);
          setUiComponentFormData(defaultUiComponentFormForm());
        }}
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        loading={loading}
        setLoading={setLoading}
        hideOnFinish={true}
        hideStepper={true}
        boxProps={{
          width: "100vw",
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

export default UIComponentGenerator;
