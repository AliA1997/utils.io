import { AutocompleteInput } from "@common/Inputs";
import {
  BlockChainOption,
  BlockChains,
  CommonSmartContractGeneratorProps,
  TokenStandardOption,
  blockChains,
  ethereumTokenStandards,
  polygonTokenStandards,
} from "@pages/smart-contract-generator";

interface SmartContractGeneratorAutocompleteStepProps
  extends CommonSmartContractGeneratorProps {
  selectOptions?: () => TokenStandardOption[];
}

export function SelectBlockchainStep(
  props: SmartContractGeneratorAutocompleteStepProps
) {
  return (
    <AutocompleteInput<BlockChainOption>
      textFieldProps={{
        label: "Blockchain",
        value: null,
        sx: { marginTop: 2 },
      }}
      labelKey="label"
      options={blockChains}
      getOptionLabel={(option: any) => option.label}
      value={props.sCFormData.blockchain!}
      onChange={(val: BlockChainOption | null) => {
        props.setScFormData!((prevData) => ({
          ...prevData,
          blockchain: val,
        }));
      }}
      sx={{ marginTop: 0, width: '100%' }}
    />
  );
}

export function SelectTokenStandardStep(
  props: SmartContractGeneratorAutocompleteStepProps
) {
  const selectOptions = () => {
    if (props.sCFormData?.blockchain?.value == BlockChains.Ethereum) {
      return ethereumTokenStandards;
    }
    if (props.sCFormData?.blockchain?.value == BlockChains.Polygon) {
      return polygonTokenStandards;
    }
    return [] as TokenStandardOption[];
  };

  return (
    <AutocompleteInput<TokenStandardOption>
      textFieldProps={{
        label: "Token Standard",
        value: null,
        sx: {},
      }}
      labelKey="label"
      options={selectOptions()}
      getOptionLabel={(option: any) => option.label}
      value={props.sCFormData.tokenStandard!}
      onChange={(val: TokenStandardOption | null) => {
        props.setScFormData!((prevData) => ({
          ...prevData,
          tokenStandard: val,
        }));
      }}
      sx={{ marginTop: 2, width: '100%' }}
    />
  );
}
