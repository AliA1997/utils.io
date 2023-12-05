import { TextFieldInput } from "@common/Inputs";
import { CommonSmartContractGeneratorProps } from "@pages/smart-contract-generator";

export function ContractNameStep(props: CommonSmartContractGeneratorProps) {
  return (
    <TextFieldInput
      sx={{ marginTop: 2 }}
      label="Contract Name"
      name="contractName"
      value={props.sCFormData.contractName}
      onChange={props.handleInputChange}
      color="secondary"
      fullWidth
    />
  );
}

export function WhatDoesItDoStep(props: CommonSmartContractGeneratorProps) {
  return (
    <TextFieldInput
      label="What Does it Do?"
      name="whatDoesItDo"
      value={props.sCFormData.whatDoesItDo}
      onChange={props.handleInputChange}
      color="secondary"
      fullWidth
    />
  );
}
