export function usesEuro(country: string): boolean {
  const euroCountries = [
    "Andorra",
    "Austria",
    "Belgium",
    "Cyprus",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Ireland",
    "Italy",
    "Kosovo",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Monaco",
    "Montenegro",
    "Netherlands",
    "Portugal",
    "San Marino",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Vatican City",
  ];

  return euroCountries.includes(country);
}

interface CommonStripePricesType {
  China: string | undefined;
  Euro: string | undefined;
  Lebanon: string | undefined;
  Malaysia: string | undefined;
  SaudiArabia: string | undefined;
  UAE: string | undefined;
  USA: string | undefined;
}
export const BasicPlanStripePrices: CommonStripePricesType = {
  China: process.env.NEXT_PUBLIC_STRIPE_BASIC_CHINA_PRICE,
  Euro: process.env.NEXT_PUBLIC_STRIPE_BASIC_EURO_PRICE,
  Lebanon: process.env.NEXT_PUBLIC_STRIPE_BASIC_LEBANON_PRICE,
  Malaysia: process.env.NEXT_PUBLIC_STRIPE_BASIC_MALAYSIA_PRICE,
  SaudiArabia: process.env.NEXT_PUBLIC_STRIPE_BASIC_SAUDI_ARABIA_PRICE,
  UAE: process.env.NEXT_PUBLIC_STRIPE_BASIC_UAE_PRICE,
  USA: process.env.NEXT_PUBLIC_STRIPE_BASIC_USA_PRICE,
};
export const Web3PlanStripePrices: CommonStripePricesType = {
  China: process.env.NEXT_PUBLIC_STRIPE_WEB3_CHINA_PRICE,
  Euro: process.env.NEXT_PUBLIC_STRIPE_WEB3_EURO_PRICE,
  Lebanon: process.env.NEXT_PUBLIC_STRIPE_WEB3_LEBANON_PRICE,
  Malaysia: process.env.NEXT_PUBLIC_STRIPE_WEB3_MALAYSIA_PRICE,
  SaudiArabia: process.env.NEXT_PUBLIC_STRIPE_WEB3_SAUDI_ARABIA_PRICE,
  UAE: process.env.NEXT_PUBLIC_STRIPE_WEB3_UAE_PRICE,
  USA: process.env.NEXT_PUBLIC_STRIPE_WEB3_USA_PRICE,
};
export const ChatbotPlanStripePrices: CommonStripePricesType = {
  China: process.env.NEXT_PUBLIC_STRIPE_CHATBOT_CHINA_PRICE,
  Euro: process.env.NEXT_PUBLIC_STRIPE_CHATBOT_EURO_PRICE,
  Lebanon: process.env.NEXT_PUBLIC_STRIPE_CHATBOT_LEBANON_PRICE,
  Malaysia: process.env.NEXT_PUBLIC_STRIPE_CHATBOT_MALAYSIA_PRICE,
  SaudiArabia: process.env.NEXT_PUBLIC_STRIPE_CHATBOT_SAUDI_ARABIA_PRICE,
  UAE: process.env.NEXT_PUBLIC_STRIPE_CHATBOT_UAE_PRICE,
  USA: process.env.NEXT_PUBLIC_STRIPE_CHATBOT_USA_PRICE,
};

export const ServerBasicPlanStripePrices: CommonStripePricesType = {
  China: process.env.STRIPE_BASIC_CHINA_PRICE,
  Euro: process.env.STRIPE_BASIC_EURO_PRICE,
  Lebanon: process.env.STRIPE_BASIC_LEBANON_PRICE,
  Malaysia: process.env.STRIPE_BASIC_MALAYSIA_PRICE,
  SaudiArabia: process.env.STRIPE_BASIC_SAUDI_ARABIA_PRICE,
  UAE: process.env.STRIPE_BASIC_UAE_PRICE,
  USA: process.env.STRIPE_BASIC_USA_PRICE,
};
export const ServerWeb3PlanStripePrices: CommonStripePricesType = {
  China: process.env.STRIPE_WEB3_CHINA_PRICE,
  Euro: process.env.STRIPE_WEB3_EURO_PRICE,
  Lebanon: process.env.STRIPE_WEB3_LEBANON_PRICE,
  Malaysia: process.env.STRIPE_WEB3_MALAYSIA_PRICE,
  SaudiArabia: process.env.STRIPE_WEB3_SAUDI_ARABIA_PRICE,
  UAE: process.env.STRIPE_WEB3_UAE_PRICE,
  USA: process.env.STRIPE_WEB3_USA_PRICE,
};
export const ServerChatbotPlanStripePrices: CommonStripePricesType = {
  China: process.env.STRIPE_CHATBOT_CHINA_PRICE,
  Euro: process.env.STRIPE_CHATBOT_EURO_PRICE,
  Lebanon: process.env.STRIPE_CHATBOT_LEBANON_PRICE,
  Malaysia: process.env.STRIPE_CHATBOT_MALAYSIA_PRICE,
  SaudiArabia: process.env.STRIPE_CHATBOT_SAUDI_ARABIA_PRICE,
  UAE: process.env.STRIPE_CHATBOT_UAE_PRICE,
  USA: process.env.STRIPE_CHATBOT_USA_PRICE,
};

export const copyToClipboard = async (text: string) => {
  if ("clipboard" in navigator) {
    await navigator.clipboard.writeText(text);
  } else {
    document.execCommand("copy", true, text);
  }
}