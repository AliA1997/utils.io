import { useEffect, useState } from "react";
import { Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { CopyButton } from "@common/Buttons";
import {
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UtilsIOSubtitle } from "@common/Titles";
import Image from 'next/image';

interface CodeOutputProps {
  fromLanguage: string;
  toLanguage?: string;
  code: string;
  convertedCode?: string;
  codeTitle: string;
  convertedCodeTitle?: string;
}
const CodeOutputTitle = (props: React.PropsWithChildren<any>) => (
  <Typography fontSize="0.75rem" fontFamily="mono">
    {props.children}
  </Typography>
);
export default function CodeOutput(props: CodeOutputProps) {
  const { fromLanguage, toLanguage, code, convertedCode, codeTitle, convertedCodeTitle } = props;
  const [style, setStyle] = useState({});
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  useEffect(() => {
    import(
      "react-syntax-highlighter/dist/esm/styles/prism/material-light"
    ).then((mod) => setStyle(mod.default));
  });
  console.log('toLanguage:',toLanguage)
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <UtilsIOSubtitle sx={{ marginBottom: 0 }}>
            {codeTitle}
          </UtilsIOSubtitle>
        </AccordionSummary>
        <AccordionDetails>
          <div
            style={{
              position: "relative",
              width: isNotMobile ? 800 : 350,
              height: 350,
              fontSize: "1rem",
              overflowY: "auto",
            }}
          >
            <CopyButton textToCopy={code} />
            <ReactSyntaxHighlighter
              showLineNumbers={true}
              language={fromLanguage}
              style={style}
              wrapLines={true}
              lineNumberStyle={{ minWidth: "unset", width: "1.25em" }}
            >
              {code}
            </ReactSyntaxHighlighter>
          </div>
        </AccordionDetails>
      </Accordion>
      {!convertedCode ? 
        (
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
        )
      : (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <UtilsIOSubtitle sx={{ marginBottom: 0 }}>
              {convertedCodeTitle}
            </UtilsIOSubtitle>
          </AccordionSummary>
          <AccordionDetails>
            <div
              style={{
                position: "relative",
                width: isNotMobile ? 800 : 350,
                height: 350,
                fontSize: "1rem",
                overflowY: "auto",
              }}
            >
              <CopyButton textToCopy={convertedCode} />
              <ReactSyntaxHighlighter
                showLineNumbers={true}
                language={toLanguage}
                style={style}
                wrapLines={true}
                lineNumberStyle={{ minWidth: "unset", width: "1.25em" }}
              >
                {convertedCode}
              </ReactSyntaxHighlighter>
            </div>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
}
