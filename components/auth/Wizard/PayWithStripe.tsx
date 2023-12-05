import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";
import { TextFieldInput } from "@common/Inputs";
import {
  CommonFinishAccountProps,
  FinishAccountForm,
} from "../FinishAccountModal";
import { DateOfBirthInput, AutocompleteInput } from "@common/Inputs";
import { CountryOption, countryList } from "@data/countries";
import DragAndDrop from "@common/Inputs/DragAndDrop";
import Box from "@mui/material/Box";
import { PrimaryButton } from "@common/Buttons";
import { useStripe } from "@stripe/react-stripe-js";
import { BasicPlanStripePrices, usesEuro } from "@utils/index";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { UtilsIoStore } from "@redux/reducers";

export default function PayWithStripe(props: CommonFinishAccountProps) {
  const { formData, setFormData } = props;
  // const { currentSubscriptionData } = useSelector((state: UtilsIoStore) => state.auth);

  // function getStripePriceId() {
  //   const countryName = currentSubscriptionData?.countryOfResidence;
  //   if (usesEuro(countryName!)) return BasicPlanStripePrices.Euro;
  //   if (countryName === "China") return BasicPlanStripePrices.China;
  //   if (countryName === "Lebanon") return BasicPlanStripePrices.Lebanon;
  //   if (countryName === "Malaysia") return BasicPlanStripePrices.Malaysia;
  //   if (countryName === "Saudi Arabia")
  //     return BasicPlanStripePrices.SaudiArabia;
  //   if (countryName === "United Arab Emirates")
  //     return BasicPlanStripePrices.UAE;
  //   return BasicPlanStripePrices.USA;
  // }

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between">
      <PrimaryButton
        sx={{
          marginTop: 2,
          background: "#4379FF",
          width: 400,
          ":hover": {
            color: "#4379FF",
            background: "transparent",
          },
        }}
        id="stripe"
        onClick={() => {}}
      >
        Pay with Stripe
      </PrimaryButton>
      <PrimaryButton
        sx={{
          marginTop: 2,
          background: "#4379FF",
          width: 400,
          ":hover": {
            color: "#4379FF",
            background: "transparent",
          },
        }}
        id="pay-with-coinbase-commerce"
        onClick={() => {}}
      >
        Pay with Coinbase commerce
      </PrimaryButton>

      <PrimaryButton
        sx={{
          marginTop: 2,
          background: "#4379FF",
          width: 400,
          ":hover": {
            color: "#4379FF",
            background: "transparent",
          },
        }}
        id="pay-with-ethereum"
        onClick={() => {}}
      >
        Pay with Ethereum
      </PrimaryButton>
    </Box>
  );
}
