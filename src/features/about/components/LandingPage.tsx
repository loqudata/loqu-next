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
  HeadingProps,
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

const hProps: HeadingProps = {
  fontWeight: "regular",
  letterSpacing: "tighter",
  lineHeight: "1.2",
};

const headingLargeSize = { base: "xl", md: "3xl" };
const subHeadingSize = { base: "regular", md: "xl" };

function HeadlineSection() {
  return (
    <VStack spacing={6} alignItems="start" w="lg" mr={3} mx={{base: 16, md: 0}} >
      <VStack color="gray.700" alignItems="start">
        <Heading {...hProps} fontSize={headingLargeSize}>
          Explore, search, and visualize
        </Heading>
        <Heading
          {...hProps}
          display="flex"
          flexDir="row"
          flexWrap="nowrap"
          // size="3xl"
          fontSize={{ base: "5xl", md: "6xl" }}
        >
          <DynamicTypist />
          data
        </Heading>
      </VStack>
      <Text {...hProps} fontSize={subHeadingSize} maxW={{base: "md", md: "2lg"}}>
        Discover 700 million data series and 1.2 million datasets from hundreds
        of official sources.
      </Text>
    </VStack>
  );
}

export const LandingPage = () => {
  return (
    <Box p={16} pt={0}>
      <Center pt={20} pb={{ base: 16, lg: 36 }} flexDir={{base: "column", md: "row"}}>
        <HeadlineSection></HeadlineSection>
        <Box w={16} />
        <Box mt={null}>
          <Image h="50vh" src={visualizeImage} />
        </Box>
      </Center>

      <Flex justifyContent="center">
        <Box w="md" mr={8}>
          <Heading {...hProps} fontSize={headingLargeSize}>
            Search
          </Heading>
          <Text
            mt={3}
            color="gray.700"
            fontSize={subHeadingSize}
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
