import CodeOutput from "@common/Containers/CodeOutput";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CommonUIComponentGeneratorProps } from "@pages/ui-component-generator";
import Image from 'next/image';
import useMediaQuery from "@mui/material/useMediaQuery";

interface UIComponentGeneratedStepProps extends CommonUIComponentGeneratorProps {
    workResult: string | undefined;
    language: string;
    styleLanguage?: string;
}

export const UIComponentGeneratedStep = (props: UIComponentGeneratedStepProps) => {
    const isNotMobile = useMediaQuery("(min-width: 1000px)");

    if(!props.workResult)
        return (
            <Box sx={{ 
                width: isNotMobile ? 800 : 400,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                display: 'flex',
                textAlign: 'center',
          
              }} position="relative">
                <>
                  <Typography
                    color="#000000"
                    sx={{
                      fontFamily: "Poppins",
                      fontWeight: 700,
                      marginBottom: 3,
                      pt: 5,
                    }}
                  >Building something for you</Typography>
                  <Image width={400} height={400} src="/prompt-loading.gif" alt="product card img" />
                  </>
               </Box>
        );

    return (
        <Stack flexDirection='column' alignItems='center'>
            <Typography variant='h5'>Generated UI Component</Typography>
            <CodeOutput 
                code={props.workResult}
                codeTitle="Generated UI Component Code"
                fromLanguage={props.language}
            />
            {
                props.styleLanguage && props.uiComponentFormData.uiComponentStyles && (
                    <>
                        <CodeOutput 
                            code={props.uiComponentFormData.uiComponentStyles!}
                            codeTitle="Generated UI Component Styles"
                            fromLanguage={props.styleLanguage}
                        />
                    </>
                )
            }
        </Stack>
    );
}