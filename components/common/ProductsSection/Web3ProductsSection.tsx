import Typography from "@mui/material/Typography";
import { CommonProductsSectionProps } from ".";
import ProductCard from "../Containers/ProductCard";
import Stack from "@mui/material/Stack";
import { ProductSectionContainer } from "@common/Containers";
import { useRouter } from "next/router";

export default function Web3ProductsSection(props: CommonProductsSectionProps) {
  const router = useRouter();
  return (
    <>
      <Typography fontWeight="bold" variant="h5">
        Web3 products
      </Typography>
      <ProductSectionContainer>
        <ProductCard
          id="smart-contract-generator"
          onClick={() => router.push("/smart-contract-generator")}
          title="Smart Contract Generator"
          description="Generate smart contracts from your key points"
          image={"/home/smart-contract.gif"}
        />
        <ProductCard
          id="ui-component-generator"
          onClick={() => router.push("/ui-component-generator")}
          title="UI Component Generator"
          description="Generate a ui components from your key points"
          image={"/home/ui-component.gif"}
        />
      </ProductSectionContainer>
    </>
  );
}
