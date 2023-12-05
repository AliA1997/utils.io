import { Card, CardContent, Stack, Typography } from "@mui/material";
import Image from "next/image";

interface ProductCardProps {
  onClick: (e: any) => Promise<any>;
  title: string;
  description: string;
  id: string;
  image: string;
}

const ProductCard = (props: ProductCardProps) => {
  const { title, onClick, image, id, description } = props;
  return (
    <Card
      onClick={onClick}
      id={id}
      sx={{
        boxShadow: 2,
        borderRadius: 5,
        height: 350,
        width: 380,
        "&:hover": {
          border: 2,
          boxShadow: 0,
          borderColor: "primary.dark",
          cursor: "pointer",
        },
        "&:hover > div": {
          p: 3,
        },
      }}
    >
      {/* <CardContent> */}
        <Image width={170} height={150} src={image} alt="product card img" />
        <Stack p={3}>
          <Typography fontWeight="bold" variant="h5">
            {title}
          </Typography>
          <Typography variant="h6">{description}</Typography>
        </Stack>
      {/* </CardContent> */}
    </Card>
  );
};

export default ProductCard;
