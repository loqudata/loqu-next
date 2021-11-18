import { Box, Flex, Heading, VStack, Text, Img, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import World from "../../../assets/world_dots_grey.svg";
import { ChakraSearchBox } from "../../search/components/SearchBox";

export const LandingPage = () => {
  const props = {} as any;
  const router = useRouter();
  return (
    <Flex
      w="full"
      minH="80vh"
      h="calc(100vh - 100px)"
      alignItems="center"
      justifyContent="center"
    >
      <Box display={{ base: "none", lg: "block" }} position="absolute">
        <Img src={World.src}></Img>
      </Box>
      <VStack zIndex="999" position="relative" top={-16} spacing={6}>
        <VStack spacing={2}>
          <Heading
            color="gray.700"
            fontFamily="Merriweather"
            fontSize={{ base: "48", md: "64" }}
            fontWeight="regular"
            letterSpacing="tighter"
            lineHeight="1"
          >
            A world of data
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
        <Box minW="xs" w={{ base: "95%", lg: "120%" }}>
          <ChakraSearchBox
            {...props}
            styleProps={{
              backgroundColor: "white",
              boxShadow: "sm",
            }}
            refine={(v) => router.push("/search?q=" + encodeURIComponent(v))}
          ></ChakraSearchBox>
        </Box>
      </VStack>
    </Flex>
  );
};
