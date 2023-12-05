import { TextFieldInput } from "@common/Inputs";
import { CommonTextToImageGeneratorProps } from "@pages/image-generator";

export function ImageConceptStep(props: CommonTextToImageGeneratorProps) {
  return (
    <TextFieldInput
      sx={{ marginTop: 2 }}
      label="Concept for Generate Image"
      name="imageConceptToGenerateImage"
      value={props.textToImageGeneratorFormData.imageConceptToGenerateImage}
      onChange={props.handleInputChange}
      color="secondary"
      fullWidth
    />
  );
}
