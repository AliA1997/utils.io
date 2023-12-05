import { AutocompleteInput } from "@common/Inputs";
import {
  CommonUIComponentGeneratorProps,
  HowIsComponentStyledOption,
  PurposeOfComponentOption,
  UILibraryUsedOption,
  Web3WalletFeatureUsedOption,
  WebFrameworkOption,
  howIsComponentStyledOptions,
  purposeOfComponentOptions,
  uiLibraryUsedOptions,
  web3WalletFeatureUsedOptions,
  webFrameworkOptions,
} from "@pages/ui-component-generator";

export function SelectWebFrameworkUsedStep(
  props: CommonUIComponentGeneratorProps
) {
  return (
    <AutocompleteInput<WebFrameworkOption>
      textFieldProps={{
        label: "Web Framework Used",
        value: null,
        sx: { marginTop: 2 },
      }}
      optionsSx={{ width: 400 }}
      options={webFrameworkOptions}
      labelKey="label"
      getOptionLabel={(option: any) => option.label}
      value={props.uiComponentFormData.webFrameworkUsed!}
      onChange={(val: WebFrameworkOption | null) => {
        props.setUiComponentFormData!((prevData) => ({
          ...prevData,
          webFrameworkUsed: val,
        }));
      }}
      sx={{ marginTop: 0, width: "100%" }}
    />
  );
}

export function SelectUILibraryUsedStep(
  props: CommonUIComponentGeneratorProps
) {
  return (
    <AutocompleteInput<UILibraryUsedOption>
      textFieldProps={{
        label: "UI Library Used",
        value: null,
        sx: { marginTop: 2 },
      }}
      labelKey="label"
      options={uiLibraryUsedOptions}
      getOptionLabel={(option: any) => option.label}
      value={props.uiComponentFormData.uiLibraryUsed!}
      onChange={(val: UILibraryUsedOption | null) => {
        props.setUiComponentFormData!((prevData) => ({
          ...prevData,
          uiLibraryUsed: val,
        }));
      }}
      sx={{ marginTop: 0, width: "100%" }}
    />
  );
}

export function SelectPurposeOfComponentStep(
  props: CommonUIComponentGeneratorProps
) {
  return (
    <AutocompleteInput<PurposeOfComponentOption>
      textFieldProps={{
        label: "Purpose Of Component",
        value: null,
        sx: { marginTop: 2 },
      }}
      labelKey="label"
      options={purposeOfComponentOptions}
      getOptionLabel={(option: any) => option.label}
      value={props.uiComponentFormData.purposeOfComponent!}
      onChange={(val: PurposeOfComponentOption | null) => {
        props.setUiComponentFormData!((prevData) => ({
          ...prevData,
          purposeOfComponent: val,
        }));
      }}
      sx={{ marginTop: 0, width: "100%" }}
    />
  );
}

export function SelectHowIsComponentStyledStep(
  props: CommonUIComponentGeneratorProps
) {
  return (
    <AutocompleteInput<HowIsComponentStyledOption>
      textFieldProps={{
        label: "How Component Is Styled",
        value: null,
        sx: { marginTop: 2 },
      }}
      labelKey="label"
      options={howIsComponentStyledOptions}
      getOptionLabel={(option: any) => option.label}
      value={props.uiComponentFormData.howIsComponentStyled!}
      onChange={(val: HowIsComponentStyledOption | null) => {
        props.setUiComponentFormData!((prevData) => ({
          ...prevData,
          howIsComponentStyled: val,
        }));
      }}
      sx={{ marginTop: 0, width: "100%" }}
    />
  );
}

export function SelectWeb3WalletFeatureUsedStep(
  props: CommonUIComponentGeneratorProps
) {
  return (
    <AutocompleteInput<Web3WalletFeatureUsedOption>
      textFieldProps={{
        label: "Web3 Wallet Feature Used?",
        value: null,
        sx: { marginTop: 2 },
      }}
      labelKey="label"
      options={web3WalletFeatureUsedOptions}
      getOptionLabel={(option: any) => option.label}
      value={props.uiComponentFormData.web3WalletFeatureUsed!}
      onChange={(val: Web3WalletFeatureUsedOption | null) => {
        props.setUiComponentFormData!((prevData) => ({
          ...prevData,
          web3WalletFeatureUsed: val,
        }));
      }}
      sx={{ marginTop: 0, width: "100%" }}
    />
  );
}
