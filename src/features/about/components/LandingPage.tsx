import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  Img,
  Stack,
  Image,
  Center,
} from "@chakra-ui/react";

import React from "react";
import { ChakraSearchBox } from "../../search/components/SearchBox";
import { DynamicTypist } from "./Typer";

import { processImportedFile } from "utils/processImportedFile";

import rawSearch from "assets/loqu_search.png";
const searchImage = processImportedFile(rawSearch);

import rawIcon from "assets/world_dots_grey.svg";
const worldIcon = processImportedFile(rawIcon);

import visualizeRaw from "assets/visualize.svg";
const visualizeImage = processImportedFile(visualizeRaw);

const hProps = {
  fontWeight: "regular",
  letterSpacing: "tighter",
  lineHeight: "1.2",
};

function HeadlineSection() {
  return (
    <VStack spacing={6} alignItems="start" w="lg" mr={3}>
      <VStack
        color="gray.700" // fontFamily="Merriweather"
        // justifyContent="center"
        alignItems="start"
      >
        <Heading // as="span"
          letterSpacing="tighter"
          fontSize={{
            base: "28",
            md: "32",
          }}
          {...hProps}
        >
          Explore, search, and visualize
        </Heading>
        {/* Optional: */}
        <Heading
          display="flex"
          flexDir="row"
          flexWrap="nowrap"
          fontSize={{
            base: "48",
            md: "64",
          }}
          {...hProps}
        >
          <DynamicTypist />
          data
        </Heading>
      </VStack>
      <Text // mt={"2rem !important"}
        color="gray.700"
        fontSize="24"
        letterSpacing="tighter" // textAlign="center"
        maxW="2lg"
      >
        Discover 700 million data series and 1.2 million datasets from hundreds
        of official sources.
      </Text>
      {/* <worldIcon/> */}
    </VStack>
  );
}

export const LandingPage = () => {
  return (
    <Box p={16} pt={0}>
      <Center pt={20} pb={36}>
        <HeadlineSection></HeadlineSection>
        <Box w={16} />
        <Box maxH="50vh" mt={-24}>
          <Image boxSize="500px" src={visualizeImage} />
        </Box>
      </Center>

      <Flex justifyContent="center">
        <Box w="md" mr={8}>
          <Heading
            letterSpacing="tighter"
            fontSize={{ base: "28", md: "32" }}
            {...hProps}
          >
            Search
          </Heading>
          <Text
            mt={3}
            color="gray.700"
            fontSize={24}
            letterSpacing="tighter"
            maxW="2lg"
          >
            Filter and facet datasets by format, update frequency, data created,
            or license.
          </Text>
        </Box>

        <Box
          w="60%"
          borderRadius="md"
          border="1px solid"
          borderColor="gray.300"
          p={2}
        >
          <Image src={searchImage}></Image>
        </Box>
      </Flex>
    </Box>
  );
};
