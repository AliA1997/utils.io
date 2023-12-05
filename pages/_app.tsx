import { loadStripe } from "@stripe/stripe-js";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Elements } from "@stripe/react-stripe-js";
import {
  Components,
  ThemeOptions,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { themeSettings } from "../theme";
import { persistor, store } from "@redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SupabaseProvider } from "../contexts/supabaseContext";
import NavigationBar from "@common/NavigationBar";

// const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_API_KEY;

//Initialize stripe
const stripePromise = loadStripe(stripePublishableKey!);

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme(themeSettings("dark") as ThemeOptions);

  const links = [
    { text: "Home", to: "/" },
    { text: "About", to: "/about" },
    { text: "Contact", to: "/contact" },
  ];
  return (
    <Elements stripe={stripePromise}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <SupabaseProvider>
              <NavigationBar title="Utils.io" links={links} />
              <Component {...pageProps} />
            </SupabaseProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </Elements>
  );
}

export default MyApp;
