import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../shared/theme";

import { Box } from "@chakra-ui/react";
import Layout from "../components/Layout";
// import "../src/styles/main.css";

import { Provider, connect } from "react-redux";
import { store, RootState, Dispatch } from "../store/store";

export const CoreApp: React.FC = ({ children }) => {
  return (
    <Layout>
      <ChakraProvider theme={theme}>
        <Provider store={store}>{children}</Provider>
      </ChakraProvider>
    </Layout>
  );
};
