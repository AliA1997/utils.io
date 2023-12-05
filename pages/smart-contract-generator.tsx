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
  SxProps,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { AutocompleteInput, SelectInput, TextFieldInput } from "@common/Inputs";
import Wizard from "@common/Wizard";
import {
  ContractNameStep,
  WhatDoesItDoStep,
} from "@components/web3-products/smart-contract-generator/TextFieldSteps";
import {
  SelectBlockchainStep,
  SelectTokenStandardStep,
} from "@components/web3-products/smart-contract-generator/AutocompleteSteps";
import { ReusablePageContainer, ReusablePageTitle } from "@common/Containers";
import { ModalTitle } from "@common/Titles";
import { Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter";
import { GeneratedSmartContractStep } from "@components/web3-products/smart-contract-generator/CodeOutputSteps";
import useServerClient from '@hooks/useServerClient';
import useWork from '@hooks/useWork';
import { SmartContractGeneratorRequest } from "@services/server-client";

export enum BlockChains {
  Ethereum = 0,
  Polygon = 1,
  Solana = 2,
  Cardano = 3,
}
export enum EthereumTokenStandards {
  ERC20 = 0,
  ERC721 = 1,
  ERC1155 = 2,
}
export enum PolygonTokenStandards {
  ERC20 = 0,
  ERC721 = 1,
  ERC1155 = 2,
}
export enum SolanaTokenStandards {
  SPL = 0,
  SNT = 1,
}
export enum CardanoTokenStandards {
  Standard = 0,
}
enum SmartContractGeneratorSteps {
  ContractName = 0,
  SelectBlockchain = 1,
  SelectTokenStandard = 2,
  WhatDoesItDo = 3,
  GeneratedSmartContract = 4,
}
export interface BlockChainOption {
  label: string;
  value: BlockChains;
}
export interface TokenStandardOption {
  label: string;
  value:
    | EthereumTokenStandards
    | PolygonTokenStandards
    | SolanaTokenStandards
    | CardanoTokenStandards;
}
export const blockChains: BlockChainOption[] = [
  { label: "Ethereum", value: BlockChains.Ethereum },
  { label: "Polygon", value: BlockChains.Polygon },
  // { label: "Solana", value: BlockChains.Solana },
  // { label: "Cardano", value: BlockChains.Cardano },
];
export const ethereumTokenStandards: TokenStandardOption[] = [
  { label: "ERC20", value: EthereumTokenStandards.ERC20 },
  { label: "ERC721", value: EthereumTokenStandards.ERC721 },
  { label: "ERC1155", value: EthereumTokenStandards.ERC1155 },
];
export const polygonTokenStandards: TokenStandardOption[] = [
  { label: "ERC20", value: PolygonTokenStandards.ERC20 },
  { label: "ERC721", value: PolygonTokenStandards.ERC721 },
  { label: "ERC1155", value: PolygonTokenStandards.ERC1155 },
];
// export const solanaTokenStandards: TokenStandardOption[] = [
//   {
//     label: "Solana Transactional Programming Language",
//     value: SolanaTokenStandards.SPL,
//   },
//   { label: " Solana Native Token", value: SolanaTokenStandards.SNT },
// ];
// export const cardanoTokenStandards: TokenStandardOption[] = [
//   { label: "Standard", value: CardanoTokenStandards.Standard },
// ];

export interface SmartContractForm {
  blockchain: BlockChainOption | null;
  tokenStandard: TokenStandardOption | null;
  contractName: string;
  whatDoesItDo: string;
  generatedCode: string | undefined;
}

export interface CommonSmartContractGeneratorProps {
  sCFormData: SmartContractForm;
  handleInputChange?: (e: any) => void;
  setScFormData?: React.Dispatch<React.SetStateAction<SmartContractForm>>;
  workResult?: string;
}

const SmartContractGenerator = () => {
  const steps = [
    "Contract Name",
    "Select Blockchain",
    "Select Token Standard",
    "What Does it Do?",
    "Generated Smart Contract",
  ];
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const defaultScForm = () => ({
    blockchain: null,
    tokenStandard: null,
    contractName: "",
    whatDoesItDo: "",
    generatedCode: undefined,
  });
  const [sCFormData, setScFormData] = useState<SmartContractForm>({
    blockchain: null,
    tokenStandard: null,
    contractName: "",
    whatDoesItDo: "",
    generatedCode: "//Your generated code will appear here",
  });
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState("");
  const { serverClient } = useServerClient();
  const {
    workGuid,
    setWorkGuid,
    workResult,
    setWorkResult,
    updateWorkHookActiveStep,
  } = useWork(activeStep, SmartContractGeneratorSteps.GeneratedSmartContract);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const smartContractGeneratorHandler = async () => {
    try {
      const workResponse = await serverClient.smartContractGenerator(
        new SmartContractGeneratorRequest({
          blockchain: sCFormData.blockchain?.value.toString(),
          tokenStandard: sCFormData.tokenStandard?.value.toString(),
          contractName: sCFormData.contractName,
          whatDoesItDo: sCFormData.whatDoesItDo
        })
      );
      console.log("smart contract response:", workResponse);

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
    if (activeStep == SmartContractGeneratorSteps.ContractName)
      return (
        <ContractNameStep
          sCFormData={sCFormData}
          handleInputChange={handleInputChange}
        />
      );
    if (activeStep == SmartContractGeneratorSteps.SelectBlockchain)
      return (
        <SelectBlockchainStep
          sCFormData={sCFormData}
          setScFormData={setScFormData}
        />
      );
    if (activeStep == SmartContractGeneratorSteps.SelectTokenStandard)
      return (
        <SelectTokenStandardStep
          sCFormData={sCFormData}
          setScFormData={setScFormData}
        />
      );
    if (activeStep == SmartContractGeneratorSteps.WhatDoesItDo)
      return (
        <WhatDoesItDoStep
          sCFormData={sCFormData}
          handleInputChange={handleInputChange}
        />
      );
    if (activeStep == SmartContractGeneratorSteps.GeneratedSmartContract)
      return (
        <GeneratedSmartContractStep
          workResult={workResult}
          sCFormData={sCFormData}
          handleInputChange={handleInputChange}
        />
      );
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setScFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <ReusablePageContainer
      title={
        <ReusablePageTitle
          title="Generate Smart Contract"
          subtitle="Generate a smart contract using a couple of questions"
        />
      }
    >
      <Wizard
        onClose={() => setActiveStep(0)}
        onNext={async () => {
          const nextStep = activeStep + 1;
          setLoading(true);
          try {
            if (nextStep == SmartContractGeneratorSteps.GeneratedSmartContract)
              await smartContractGeneratorHandler();
            setActiveStep(nextStep);
            updateWorkHookActiveStep(nextStep);
            updateWorkHookActiveStep(nextStep);
          } finally {
            setLoading(false);
          }
        }}
        onReset={() => {
          setActiveStep(0);
          updateWorkHookActiveStep(0);
          setScFormData(defaultScForm());
        }}
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        loading={loading}
        setLoading={setLoading}
        hideStepper={true}
        boxProps={{
          width: "100vw",
        }}
        hideOnFinish={true}
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

export default SmartContractGenerator;
