import { TextAreaOutput, TextFieldInput } from "@common/Inputs";
import { CommonCodeConvertGeneratorProps } from "@pages/code-convert";

export function FromCodeStep(props: CommonCodeConvertGeneratorProps) {
  return (
    <TextAreaOutput
      label="Code to Convert"
      value={props.codeConvertFormData.fromCode}
      onChange={(e) => {
        props.setCodeConvertFormData!((prevState) => ({
          ...prevState,
          fromCode: e.target.value,
        }));
      }}
      hideCopyButton={true}
      required
      fullWidth
    />
  );
}

export function ToCodeStep(props: CommonCodeConvertGeneratorProps) {
  return (
    <TextFieldInput
      sx={{ marginTop: 2 }}
      label="Convert"
      name="fromCode"
      value={props.codeConvertFormData.fromCode}
      onChange={props.handleInputChange}
      color="secondary"
    />
  );
}
