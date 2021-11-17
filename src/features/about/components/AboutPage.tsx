import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

import { responsivePadding, theme } from "shared/theme";

// import ReactMarkdown from "react-markdown";
// import Markdown from "markdown-to-jsx";

// import { getMarkdownToJSXComponents } from "../../../components/ChakraComponents";

export const AboutPage = ({ content = "" }: { content?: string }) => {
  return (
    <Box>
      <Stack backgroundColor="gray.50" w="full" p={responsivePadding}>
        <Heading fontFamily="serif">About</Heading>
        <Text maxW="container.sm">
          Loqu is a platform and community focused on improving the open data
          ecosystem. How did we get here? We’ll describe the problem and our
          solution below.
        </Text>
      </Stack>
      <Container maxW="3xl" p={responsivePadding}>
        {content
          ? // <Markdown options={{ overrides: getMarkdownToJSXComponents() }}>
            { content }
          : // </Markdown>
            null}
      </Container>
    </Box>
  );
};
