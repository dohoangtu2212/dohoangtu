import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { Provider as ReduxProvider } from "react-redux";
import { wrapper } from "@/store";
import Layout from "@/components/Layout";
import { theme } from "@/constants/theme";
import "@fontsource/quicksand";

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <ChakraProvider theme={theme}>
      <ReduxProvider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ReduxProvider>
    </ChakraProvider>
  );
}
