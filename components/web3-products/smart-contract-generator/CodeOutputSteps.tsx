import CodeOutput from "@common/Containers/CodeOutput";
import { CommonSmartContractGeneratorProps } from "@pages/smart-contract-generator";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from 'next/image';

export const GeneratedSmartContractStep = (props: CommonSmartContractGeneratorProps) => {
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
        <CodeOutput 
            codeTitle="Generated Smart Contract Code"
            code={props.workResult}
            fromLanguage="solidity"
        />
    );
}