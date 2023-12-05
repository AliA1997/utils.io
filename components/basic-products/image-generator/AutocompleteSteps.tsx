import { AutocompleteInput } from "@common/Inputs";
import {
  CommonTextToImageGeneratorProps,
  ImageSizeOption,
  imageSizesOptions,
} from "@pages/image-generator";

export function ImageSizeStep(props: CommonTextToImageGeneratorProps) {
  return (
    <AutocompleteInput<ImageSizeOption>
      textFieldProps={{
        label: "Image Size",
        value: null,
        sx: { marginTop: 2 },
      }}
      labelKey="label"
      options={imageSizesOptions}
      getOptionLabel={(option: ImageSizeOption) => option.label}
      value={props.textToImageGeneratorFormData.sizeOfImage!}
      onChange={(val: ImageSizeOption | null) => {
        props.setTextToImageGeneratorFormData!((prevData) => ({
          ...prevData,
          sizeOfImage: val,
        }));
      }}
      sx={{ marginTop: 0, width: "100%" }}
    />
  );
}
