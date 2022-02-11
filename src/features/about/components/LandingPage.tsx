import { Box, Flex, Heading, VStack, Text, Img, Stack } from "@chakra-ui/react";

import React from "react";
import rawIcon from "assets/world_dots_grey.svg";
import { ChakraSearchBox } from "../../search/components/SearchBox";
import { DynamicTypist } from "./Typer";

const worldIcon: string | { url: string } = rawIcon;

export const LandingPage = () => {
  return (
    <Flex
      w="full"
      minH="80vh"
      h="calc(100vh - 100px)"
      alignItems="center"
      justifyContent="center"
    >
      <Box display={{ base: "none", lg: "block" }} position="absolute">
        <Img src={(worldIcon.url as any) || worldIcon}></Img>
      </Box>
      <VStack zIndex="999" position="relative" top={-16} spacing={2} w="full">
        <Heading
          w="full"
          color="gray.700"
          // fontFamily="Merriweather"
          fontSize={{ base: "48", md: "64" }}
          fontWeight="regular"
          letterSpacing="tighter"
          lineHeight="1.5"
          display="flex"
          flexDir="row"
          flexWrap="nowrap"
          justifyContent="center"
        >
          <Text as="span" mr={4}>
          Explore, search and visualize
          </Text>
          {/* Optional: */}
          <Box minW="15rem">

           <DynamicTypist />
          </Box>
           data
        </Heading>
        <Text
          color="gray.700"
          fontSize="24"
          letterSpacing="tighter"
          textAlign="center"
          maxW="2lg"
        >
          The open source platform for open data. Under construction.
        </Text>
      </VStack>
    </Flex>
  );
};
