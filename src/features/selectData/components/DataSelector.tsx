import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { DataSource, DATA_SOURCES } from "./DataSource";

export const DataSelector = () => {
  return (
    <VStack h="full" p={2} alignItems="start">
      <Text fontWeight="bold">Choose a data source</Text>
      <Box
        spacing={4}
        p={4}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="md"
        w="full"
      >
        <Text fontWeight="semibold">Local sources</Text>
        <Text>CSV, XLS, JSON, or GeoJSON files.</Text>
      </Box>
      {DATA_SOURCES.map((d) => (
        <DataSource source={d} />
      ))}
    </VStack>
  );
};
