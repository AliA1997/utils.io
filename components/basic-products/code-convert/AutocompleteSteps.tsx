import { AutocompleteInput } from "@common/Inputs";
import {
  CommonCodeConvertGeneratorProps,
  ProgrammingLanguage,
  ProgrammingLanguageOption,
  programmingLanguageColors,
  programmingLanguageOptions,
} from "@pages/code-convert";

// interface CodeConvertGeneratorAutocompleteStepProps
//   extends CommonCodeConvertGeneratorProps {
//   selectOptions?: () => TokenStandardOption[];
// }

export function SelectFromLanguageStep(props: CommonCodeConvertGeneratorProps) {
  return (
    <AutocompleteInput<ProgrammingLanguageOption>
      textFieldProps={{
        label: "Programming Language to convert from",
        value: null,
        sx: { marginTop: 2 },
      }}
      optionsSx={{ width: 400 }}
      labelKey="label"
      options={programmingLanguageOptions}
      getOptionLabel={(option: any) => option.label}
      value={props.codeConvertFormData.fromLanguage!}
      onChange={(val: ProgrammingLanguageOption | null) => {
        props.setCodeConvertFormData!((prevData) => ({
          ...prevData,
          fromLanguage: val,
        }));
      }}
      sx={{ marginTop: 0, width: "100%" }}
    />
  );
}

export function SelectToLanguageStep(props: CommonCodeConvertGeneratorProps) {
  return (
    <AutocompleteInput<ProgrammingLanguageOption>
      textFieldProps={{
        label: "To Language",
        value: null,
        sx: {},
      }}
      labelKey="label"
      options={programmingLanguageOptions}
      getOptionLabel={(option: any) => option.label}
      value={props.codeConvertFormData.toLanguage!}
      onChange={(val: ProgrammingLanguageOption | null) => {
        props.setCodeConvertFormData!((prevData) => ({
          ...prevData,
          toLanguage: val,
        }));
      }}
      sx={{ marginTop: 0, width: "100%" }}
    />
  );
}
