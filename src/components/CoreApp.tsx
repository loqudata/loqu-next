import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../shared/theme";

import { Box } from "@chakra-ui/react";
import Layout from "../components/Layout";
// import "../src/styles/main.css";

import { Provider, connect } from "react-redux";
import { store, RootState, Dispatch } from "../store/store";

import { usePostHog } from "hooks/usePosthog";
import NoSsr from "./NoSsr";
import dynamic from "next/dynamic";
import { getUserID } from "utils/userId";


const LocalOpenReplay = dynamic(() => import("./OpenReplay"), { ssr: false });


const AnalyticsContainer: React.FC = ({ children }) => {
  usePostHog(process.env.NEXT_PUBLIC_POSTHOG_API_KEY, {
    api_host: "https://app.posthog.com",
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.opt_out_capturing();
      posthog.identify(getUserID())
    },
  });
  return <>{children}<LocalOpenReplay/></>;
};

export const CoreApp: React.FC = ({ children }) => {
  return (
      <AnalyticsContainer>
        <ChakraProvider theme={theme}>
          <Provider store={store}>{children}</Provider>
        </ChakraProvider>
      </AnalyticsContainer>
  );
};
