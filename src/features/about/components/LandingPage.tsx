import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  Img,
  Stack,
  Image,
} from "@chakra-ui/react";

import React from "react";
import { ChakraSearchBox } from "../../search/components/SearchBox";
import { DynamicTypist } from "./Typer";

// import rawIcon from "assets/world_dots_grey.svg";
const rawIcon = await import("assets/visualize.svg");

const worldIcon: string | { url: string } | { default: string } = rawIcon;
console.log(worldIcon.default);

const hProps = {
  fontWeight: "regular",
  letterSpacing: "tighter",
  lineHeight: "1.2",
};

export const LandingPage = () => {
  return (
    <Flex py={16} px={36}>
      <VStack spacing={6} alignItems="start">
        <VStack
          color="gray.700"
          // fontFamily="Merriweather"
          // justifyContent="center"
          alignItems="start"
        >
          <Heading
            as="span"
            letterSpacing="tighter"
            fontSize={{ base: "28", md: "32" }}
            {...hProps}
          >
            Explore, search, and visualize
          </Heading>
          {/* Optional: */}
          <Heading
            display="flex"
            flexDir="row"
            flexWrap="nowrap"
            fontSize={{ base: "48", md: "64" }}
            {...hProps}
          >
            <DynamicTypist />
            data
          </Heading>
        </VStack>
        <Text
          // mt={"2rem !important"}
          color="gray.700"
          fontSize="24"
          letterSpacing="tighter"
          // textAlign="center"
          maxW="2lg"
        >
          Discover 700 million data series and 1.2 million datasets.
        </Text>
        {/* <worldIcon/> */}
      </VStack>

      <Box flexGrow={1} />
      
      <Box w="50%">
        <Image src={worldIcon.default} />
      </Box>
    </Flex>
  );
};
