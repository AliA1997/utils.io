import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CommonProductsSectionProps } from ".";
import ProductCard from "../Containers/ProductCard";
import { useMediaQuery } from "@mui/material";
import { ProductSectionContainer } from "@common/Containers";
import { useRouter } from "next/router";

export default function BasicProductsSection(
  props: CommonProductsSectionProps
) {
  const router = useRouter();
  return (
    <>
      <Typography fontWeight="bold" variant="h5">
        Basic products
      </Typography>
      <ProductSectionContainer>
        <ProductCard
          id="article-summarizer"
          onClick={() => router.push("/article-summarizer")}
          title="Article Summarizer"
          description="Summarize any article you want!"
          image={"/home/article-summerizer.gif"}
        />
        <ProductCard
          id="paragraph-generator"
          onClick={() => router.push("/paragraph-generator")}
          title="Paragraph Generator"
          description="Generate a paragraph based on any topic you want!"
          image={"/home/paragraph-generator.gif"}
        />
        <ProductCard
          id="code-convert"
          onClick={() => router.push("/code-convert")}
          title="Code Converter"
          description="Convert a snippet of code from one programming language to another"
          image={"/home/code-convert.gif"}
        />
        <ProductCard
          id="image-generator"
          onClick={() => router.push("/image-generator")}
          title="Image Generator"
          description="Generate an image based on any topic you want!"
          image={"/home/text-to-image.gif"}
        />
      </ProductSectionContainer>
    </>
  );
}
