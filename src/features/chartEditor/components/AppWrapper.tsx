import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";

import { store } from "../store";
import { Provider } from "react-redux";

export const AppWrapper = ({
  children,
}: {
  children?: any;
}) => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </Provider>
  );
};
