import Stack from "@mui/material/Stack";
import { CommonProductsSectionProps } from ".";
import ProductCard from "../Containers/ProductCard";
import Typography from "@mui/material/Typography";
import { ProductSectionContainer } from "@common/Containers";
import { useRouter } from "next/router";

export default function ChatbotProductsSection(
  props: CommonProductsSectionProps
) {
  const router = useRouter();
  return (
    <>
      <Typography fontWeight="bold" variant="h5">
        Chatbot products
      </Typography>
      <ProductSectionContainer>
        <ProductCard
          id="chatbot"
          onClick={() => router.push("/chatbot")}
          title="Chatbot"
          description="Use a virtual assistant to help you with your daily tasks!"
          image={"/home/chatbot.gif"}
        />
      </ProductSectionContainer>
    </>
  );
}
