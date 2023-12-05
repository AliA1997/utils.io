import { TextFieldInput } from "@common/Inputs";
import { CommonUIComponentGeneratorProps } from "@pages/ui-component-generator";

export function NameOfComponentStep(props: CommonUIComponentGeneratorProps) {
  return (
    <TextFieldInput
      sx={{ marginTop: 2 }}
      label="Name of Component"
      name="nameOfComponent"
      value={props.uiComponentFormData.nameOfComponent}
      onChange={props.handleInputChange}
      color="secondary"
      fullWidth
    />
  );
}
