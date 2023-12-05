import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import { ImageSizes } from "@pages/image-generator";
import { CopyButton } from "@common/Buttons";
import Image from 'next/image';
import useMediaQuery from "@mui/material/useMediaQuery";

interface ImageOutputProps {
  loading: boolean;
  src: string;
  sizeOfImage: ImageSizes;
  alt: string;
}

export const ImageOutput = (props: ImageOutputProps) => {
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  console.log('source:', props.src);
  
  const sizeOfImageOutput = () => {
    if (props.sizeOfImage === ImageSizes.TwoHundredFiftySix) {
      return { width: 256, height: 256 };
    }

    if (props.sizeOfImage === ImageSizes.ThousandTwentyFour) {
      return { width: 1024, height: 1024 };
    }

    return { width: 512, height: 512 };
  };
  
  if(props.loading) 
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
    <Box
      sx={{
        height: 400,
        width: 400,
        backgroundImage: `url('${props.src}')`,
        backgroundSize: "contain",
        position: "relative",
      }}
    >
      <CopyButton textToCopy={props.src} />
    </Box>
  );
};
