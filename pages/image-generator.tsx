import {
  Box,
  useMediaQuery,
  TextField,
  Collapse,
  Alert,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Wizard from "@common/Wizard";
import { ReusablePageContainer, ReusablePageTitle } from "@common/Containers";
import { ModalTitle } from "@common/Titles";
import {
  ImageSizeStep,
} from "@components/basic-products/image-generator/AutocompleteSteps";
import { ImageConceptStep } from "@components/basic-products/image-generator/TextFieldSteps";
import { ImageOutput } from "@common/Containers/ImageOutput";
import useServerClient from "@hooks/useServerClient";
import useWork from '@hooks/useWork';
import { TextToImageGeneratorRequest } from "@services/server-client";

export interface TextToImageGeneratorForm {
  imageConceptToGenerateImage: string;
  sizeOfImage: ImageSizeOption | null;
  generatedImage: string;
}
export enum TextToImageGeneratorSteps {
  ImageConceptToGenerateImage = 0,
  ImageSize = 1,
  GeneratedImage = 2,
}

export enum ImageSizes {
  TwoHundredFiftySix = "256x256", //"256x256"
  FixHundredTwelve = "512x512", //"512x512"
  ThousandTwentyFour = "1024x1024", //"1024x1024"
}
export enum ImageFormats {
  Url = "url", //"url"
  B64Json = "b64_json", //"b64_json"
}

export interface ImageSizeOption {
  label: string;
  value: ImageSizes;
}
export const imageSizesOptions: ImageSizeOption[] = [
  { label: "256x256", value: ImageSizes.TwoHundredFiftySix },
  { label: "512x512", value: ImageSizes.FixHundredTwelve },
  { label: "1024x1024", value: ImageSizes.ThousandTwentyFour },
];
export interface CommonTextToImageGeneratorProps {
  textToImageGeneratorFormData: TextToImageGeneratorForm;
  handleInputChange?: (e: any) => void;
  setTextToImageGeneratorFormData?: React.Dispatch<
    React.SetStateAction<TextToImageGeneratorForm>
  >;
}
const TextToImage = () => {
  const steps = [
    "Concept to Generate Image",
    "Size of Image",
    "Generated Image",
  ];
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const defaultTextToImageGeneratorForm = () => ({
    imageConceptToGenerateImage: "",
    sizeOfImage: null,
    generatedImage: "",
  });
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [textToImageGeneratorFormData, setTextToImageGeneratorFormData] =
    useState<TextToImageGeneratorForm>({
      imageConceptToGenerateImage: "",
      sizeOfImage: null,
      generatedImage: "",
    });
  const [error, setError] = useState("");
  const { serverClient } = useServerClient();
  const { workGuid, setWorkGuid, workResult, setWorkResult, updateWorkHookActiveStep } = useWork(activeStep, TextToImageGeneratorSteps.GeneratedImage);
  
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setTextToImageGeneratorFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const generateImage = async () => {
    try {
      const workResponse  = await serverClient.textToImageGenerator(
        new TextToImageGeneratorRequest({
          concept: textToImageGeneratorFormData.imageConceptToGenerateImage,
          size: textToImageGeneratorFormData.sizeOfImage?.value,
        })
      );
      console.log('textToImage response:', workResponse);
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
    if (activeStep == TextToImageGeneratorSteps.ImageConceptToGenerateImage)
      return (
        <ImageConceptStep
          textToImageGeneratorFormData={textToImageGeneratorFormData}
          setTextToImageGeneratorFormData={setTextToImageGeneratorFormData}
          handleInputChange={handleInputChange}
        />
      );

    if (activeStep == TextToImageGeneratorSteps.ImageSize)
      return (
        <ImageSizeStep
          textToImageGeneratorFormData={textToImageGeneratorFormData}
          setTextToImageGeneratorFormData={setTextToImageGeneratorFormData}
          handleInputChange={handleInputChange}
        />
      );

    if (activeStep == TextToImageGeneratorSteps.GeneratedImage)
      return (
        <ImageOutput
          loading={!workResult}
          src={workResult!}
          alt={textToImageGeneratorFormData.imageConceptToGenerateImage}
          sizeOfImage={textToImageGeneratorFormData.sizeOfImage?.value!}
        />
      );
  };

  return (
    <ReusablePageContainer
      title={
        <ReusablePageTitle
          title="Image Generator"
          subtitle="Generate an image based on the text you provide."
        />
      }
    >
      <Wizard
        onClose={() => setActiveStep(0)}
        onNext={async () => {
          const nextStep = activeStep + 1;
          setLoading(true);
          try {
            if (nextStep == TextToImageGeneratorSteps.GeneratedImage)
              await generateImage();
            setActiveStep(nextStep);
            updateWorkHookActiveStep(nextStep);
          } finally {
            setLoading(false);
          }
        }}
        onReset={() => {
          setActiveStep(0);
          updateWorkHookActiveStep(0);
          setTextToImageGeneratorFormData(defaultTextToImageGeneratorForm());
        }}
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        hideOnFinish={true}
        loading={loading}
        setLoading={setLoading}
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

export default TextToImage;
