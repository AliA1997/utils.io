import { Box, Button, Card, Collapse, Alert, Stack, Typography, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UtilsIoModals from "@common/Modals/UtilsIoModals";
import BasicProductsSection from "@common/ProductsSection/BasicProductsSection";
import Web3ProductsSection from "@common/ProductsSection/Web3ProductsSection";
import ChatbotProductsSection from "@common/ProductsSection/ChatbotProductsSection";

//Stripe Subscription App ID price_1N0IdEJlCdZ791WxVgRCEXZN
const Home = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  
useEffect(() => {
  if(router.query.subscribed) {

  }

}, [router.query])


  return (
    <>
      <Box py={10} px={20}>
        <Collapse in={!!error}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Collapse>
        <Typography fontWeight="bold" variant="h4">
          Explore our products
        </Typography>
        <Divider sx={{ my: 2 }} />
        <BasicProductsSection />
        <Divider sx={{ my: 2 }} />
        <Web3ProductsSection />
        <Divider sx={{ my: 2 }} />
        <ChatbotProductsSection />
      </Box>
      <UtilsIoModals />  
    </>
  );
};

export default Home;
